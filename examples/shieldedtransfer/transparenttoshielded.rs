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
    rpc, 
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
use namada_core::ibc::core::host::types::identifiers::PortId;
use namada_sdk::args::TxIbcTransfer;
use std::path::PathBuf;
use namada_ibc::event::ChannelId;
use namada_sdk::TransferSource;
use namada_sdk::TransferTarget;
use anyhow::Result;
use namada_sdk::args::NamadaTypes;

const RPC_URL: &str = "https://rpc.knowable.run:443"; 
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; 
const OWNER_ADDRESS: &str = "tnam1qze5x6au3egfnq7qp963c793cev5z5jvkcufnfhj"; 

#[tokio::main]
async fn main() {
    let url = Url::from_str(RPC_URL).expect("Invalid RPC address");
    let http_client = HttpClient::new(url).expect("Failed to create HTTP client");

    let wallet = FsWalletUtils::new("./sdk-wallet".into());
    let shielded_mut = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    let sdk = NamadaImpl::new(http_client, wallet, shielded_mut, std_io)
        .await
        .expect("Unable to initialize Namada context")
        .chain_id(ChainId::from_str(CHAIN_ID).expect("Invalid chain ID"));

    // Load existing wallet
    if sdk.wallet_mut().await.load().is_ok() {
        println!("Existing wallet found");
    } else {
        println!("No existing wallet found.");
    }

    // Call send__token directly
    send_token_shielded(&sdk).await;

    println!("Operation completed. Exiting...");
}

async fn send_token_shielded<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
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

        // Create a new reveal transaction builder for the public key
        let _test = get_viewing_keys().await;

        match _test {
            Ok(keys) => {
                for key in keys {
                    println!("{}", key);
                }
            }
            Err(e) => {
                eprintln!("Error getting viewing keys: {}", e);
            }
        }

        // Fetch public keys from the wallet.toml
        let _testpk = get_public_keys().await;

        match _testpk {
            Ok(keys) => {
                for key in keys {
                    println!("{}", key);

                    // Pass the derived key to the `CommonPublicKey::from_str`
                    let public_key = CommonPublicKey::from_str(&key)
                        .expect("Invalid public key format");

                    let reveal_tx_builder = sdk
                        .new_reveal_pk(public_key.clone())
                        .signing_keys(vec![public_key.clone()]);

                    // Build the reveal transaction
                    let (mut reveal_tx, signing_data) = reveal_tx_builder
                        .build(sdk)
                        .await
                        .expect("Unable to build reveal pk tx");

                    // Sign the reveal transaction
                    sdk.sign(&mut reveal_tx, &reveal_tx_builder.tx, signing_data, default_sign, ())
                        .await
                        .expect("Unable to sign reveal pk tx");

                    // Submit the signed reveal transaction
                    match sdk.submit(reveal_tx.clone(), &reveal_tx_builder.tx).await {
                        Ok(res) => println!("Public key successfully revealed: {:?}", res),
                        Err(e) => {
                            println!("Failed to reveal public key: {:?}", e);
                            return; // Exit if revealing the public key fails
                        }
                    }
                }
            }
            Err(e) => {
                eprintln!("Error getting public keys: {}", e);
            }
        }
    } else {
        println!("Account is already revealed, skipping the reveal step.");
    }

    let target = PaymentAddress::from_str("znam1jk5dkka9gj8wqtkky5tgzy76heapcdg8r3aqn9syr9k3nmx6ms8wn3hdew79tptg9kfds960a2u")
        .expect("Invalid target address");

    let amount = InputAmount::from_str("1").expect("Invalid amount");

    // Prepare the transaction data for shielding transfer
    let shielding_data = vec![args::TxShieldingTransferData {
        source: source_address,
 
        amount,
        token: sdk.native_token(),
    }];

    // Create the shielding transfer
    let mut shielding_transfer = sdk.new_shielding_transfer(target, shielding_data);

    // Build the transaction from the shielding transfer
    let (mut transfer_tx, signing_data, _masp_epoch) = shielding_transfer
        .build(sdk)
        .await
        .expect("Unable to build shielding transfer");

    // Sign the transaction
    sdk.sign(&mut transfer_tx, &shielding_transfer.tx, signing_data, default_sign, ())
        .await
        .expect("Unable to sign shielding transfer tx");

    // Submit the signed transaction to the ledger
    match sdk.submit(transfer_tx, &shielding_transfer.tx).await {
        Ok(res) => println!("Shielded transfer successfully submitted: {:?}", res),
        Err(e) => println!("Failed to submit shielded transfer: {:?}", e),
    }
}


async fn get_public_keys() -> Result<Vec<String>, String> {
    let file_path = "./sdk-wallet/wallet.toml"; 

    let content = fs::read_to_string(file_path)
        .await
        .map_err(|e| format!("Unable to read file: {}", e))?;

    let parsed: Value = toml::de::from_str(&content)
        .map_err(|e| format!("Unable to parse TOML: {}", e))?;

    let mut keys = Vec::new();
    if let Some(public_keys) = parsed.get("public_keys") {
        for (_key, value) in public_keys.as_table().unwrap() {
            if let Some(address) = value.as_str() {
                let cleaned_address = address.replace("ED25519_PK_PREFIX", "");
                keys.push(cleaned_address);
            }
        }
    } else {
        return Err("No public_keys found.".to_string());
    }

    Ok(keys)
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
