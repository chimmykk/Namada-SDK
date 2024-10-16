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

    // generate spending key
    create_spending_key(&sdk).await;

    println!("Operation completed. Exiting...");
}

async fn create_spending_key<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let phrase = prompt_user("Enter the mnemonic for the spending key: ");
    let spending_alias = prompt_user("Enter an alias for the spending key: ");
    let mnemonic = Mnemonic::from_phrase(&phrase, namada_sdk::bip39::Language::English).expect("Invalid mnemonic");

    let spending_derivation_path = DerivationPath::default_for_shielded();
    let (_spending_key_alias, sk_spending) = sdk.wallet_mut().await
        .derive_store_spending_key_from_mnemonic_code(
            spending_alias.clone(),
            true,
            None,
            spending_derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        ).expect("Unable to derive spending key from mnemonic");

    println!("Derived spending key: {:?}", sk_spending);
    sdk.wallet().await.save().expect("Could not save wallet!");
    println!("Spending key created and saved!");
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

fn prompt_user(prompt: &str) -> String {
    print!("{}", prompt);
    io::stdout().flush().expect("Failed to flush stdout");
    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    input.trim().to_string()
}