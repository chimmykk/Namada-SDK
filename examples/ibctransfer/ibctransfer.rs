use tokio;
use std::str::FromStr;
use std::io::{self, Write};
use std::error::Error;
use namada_sdk::{
    MaybeSend, 
    MaybeSync,
    args::{InputAmount, TxTransparentTransferData, TxBuilder}, 
    io::{StdIo, Io, Client}, 
    masp::{ShieldedUtils, fs::FsShieldedUtils}, 
    wallet::{WalletIo, DerivationPath, WalletStorage, fs::FsWalletUtils}, 
    Namada, 
    NamadaImpl, 
    chain::ChainId,
    zeroize::Zeroizing,
    bip39::Mnemonic,
    key::SchemeType,
    rpc, // Importing RPC for account info
};
use namada_core::address::Address;
use namada_sdk::masp::IndexerMaspClient;
use namada_sdk::args;
use namada_sdk::signing::default_sign;
use namada_sdk::ExtendedViewingKey;
use namada_sdk::PaymentAddress;
use rand_core::OsRng;
use namada_sdk::masp::find_valid_diversifier;
use namada_core::key::common::CommonPublicKey;
use tendermint_rpc::{HttpClient, Url};
use toml::Value;
use tokio::fs;
use std::time::Duration;
use namada_sdk::ExtendedSpendingKey;
use namada_sdk::control_flow::install_shutdown_signal;
use namada_sdk::wallet::DatedSpendingKey;
use namada_sdk::masp::{MaspLocalTaskEnv, ShieldedSyncConfig};
use namada_ibc::core::host::types::identifiers::ChannelId;
use namada_sdk::TransferSource;
use anyhow::Result;
use anyhow::Context;

const RPC_URL: &str = "https://rpc.knowable.run:443"; // RPC URL
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; // Chain ID
const OWNER_ADDRESS: &str = "tnam1qze5x6au3egfnq7qp963c793cev5z5jvkcufnfhj"; // Just a placeholder to check if address is reveal pk or not
#[tokio::main]
async fn main() -> Result<()> {
    let url = Url::from_str(RPC_URL).context("Invalid RPC address")?;
    let http_client = HttpClient::new(url).context("Failed to create HTTP client")?;

    let wallet = FsWalletUtils::new("./sdk-wallet".into());
    let shielded_mut = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    let sdk = NamadaImpl::new(http_client, wallet, shielded_mut, std_io)
        .await
        .context("Unable to initialize Namada context")?
        .chain_id(ChainId::from_str(CHAIN_ID).context("Invalid chain ID")?);

    // Load existing wallet
    if sdk.wallet_mut().await.load().is_ok() {
        println!("Existing wallet found");
    } else {
        println!("No existing wallet found.");
    }

    // Generate the IBC memo
    send_ibc_token(&sdk).await;

    Ok(())
}
async fn send_ibc_token<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let alias = "rilsso-public";
    let tendermint_addr = "https://rpc.knowable.run:443"; 

    // Retrieve the source address using the alias
    let source_address = match sdk.wallet().await.find_address(&alias) {
        Some(address) => address.into_owned(),
        None => {
            println!("No address found for alias: {}", alias);
            return;
        }
    };

    // Check if the account is already revealed
    if !findifreveal(sdk, tendermint_addr, &source_address)
        .await
        .expect("Error checking reveal status")
    {
        println!("Account is not revealed, proceeding to reveal the public key.");
        // Call your reveal function here if needed
    } else {
        println!("Account is already revealed, skipping the reveal step.");
    }

    let target_address = "cosmos1qqzg5khvcfdgnjg4wghvxcnekxwu4kg5nuwjssjt"; // Example Cosmos IBC target address


    let channel_id = ChannelId::new(0);


    let amount = InputAmount::from_str("10").expect("Invalid amount");
    let token = sdk.native_token();


    let receiver = target_address.to_string(); // IBC receiver address
    let source_transfer = TransferSource::Address(source_address.clone());

    // Build the IBC transfer transaction
    let  ibc_transfer_tx_builder = sdk.new_ibc_transfer(
        source_transfer,
        receiver.clone(),
        token.clone(),
        amount.clone(),
        channel_id,  
        false,
    );

    let (mut ibc_transfer_tx, signing_data, _epoch_option) = ibc_transfer_tx_builder
        .build(sdk)
        .await
        .expect("Unable to build IBC transfer transaction");

    // Sign the transaction
    sdk.sign(&mut ibc_transfer_tx, &ibc_transfer_tx_builder.tx, signing_data, default_sign, ())
        .await
        .expect("Unable to sign IBC transfer transaction");

    match sdk.submit(ibc_transfer_tx, &ibc_transfer_tx_builder.tx).await {
        Ok(res) => println!("IBC transfer successfully submitted: {:?}", res),
        Err(e) => println!("Failed to submit IBC transfer: {:?}", e),
    }
}

fn clean_address(address: &str) -> String {
    address.trim().to_string()
}

// Function to check if an account is revealed by querying the Tendermint node
async fn findifreveal<C, U, V, I>( // Custom function so _sdk 
    _sdk: &NamadaImpl<C, U, V, I>,
    tendermint_addr: &str,
    owner: &Address,
) -> Result<bool, Box<dyn Error>>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let client = HttpClient::new(
        Url::from_str(tendermint_addr)
            .map_err(|e| Box::new(e) as Box<dyn Error>)?,
    )?;

    let account_info: Option<namada_sdk::account::Account> = rpc::get_account_info(&client, owner).await?;
    if let Some(account) = account_info {
        println!("Account information: {:?}", account);
        Ok(!account.public_keys_map.idx_to_pk.is_empty()) 
    } else {
        println!("No account information found.");
        Ok(false)
    }
}

async fn get_viewing_keys() -> Result<Vec<String>, String> {
    let file_path = "./sdk-wallet/wallet.toml"; 

    // Await the future and use map_err on the result
    let content = fs::read_to_string(file_path).await.map_err(|e| format!("Unable to read file: {}", e))?;

    let parsed: Value = toml::de::from_str(&content).map_err(|e| format!("Unable to parse TOML: {}", e))?;

    let mut keys = Vec::new();
    if let Some(view_keys) = parsed.get("view_keys") {
        for (_key, value) in view_keys.as_table().unwrap() {
            if let Some(address) = value.get("key") {
                keys.push(clean_address(address.as_str().unwrap()));
            }
        }
    } else {
        return Err("No view_keys found.".to_string());
    }

    Ok(keys)
}