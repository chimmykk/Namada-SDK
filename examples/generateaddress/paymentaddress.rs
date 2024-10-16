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

    // generate payment address
    generate_payment_address(&sdk).await;

    println!("Operation completed. Exiting...");
}

async fn generate_payment_address<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Hardcoded viewing key
    let viewing_key_str = "zvknam1qddsrtp4qqqqpqr6t24a76wu3gdszc0jw8r0643mhfs3sgx49cftd8qjtetl4a5aa24fmryf29uz7xkqket0exqm8vkky8w99uqjl80cl290uqfev3yegg3ym4z84x5gwruuw4t2ln26wkadckksfkfu8ku6jdqjryvdvtlq3x8atu9p3lk7a86wals57zp7dfnydr8088pmflt6c2zgwjnzdnrsfy4v3r85gf2my2ynzqtug4euewsj0ps6upqrw524jw5g5cyecjq4c8gjy";
    let viewing_key = ExtendedViewingKey::from_str(viewing_key_str).expect("Invalid viewing key");

    // Hardcoded alias
    let alias = "default"; // No need for user input
    let alias_force = true; // Set force to true

    // Check if an address already exists for the alias
    if let Some(address) = sdk.wallet().await.find_address(&alias) {
        println!("Address already exists for {}: {:?}", alias, address);

        if !alias_force {
            println!("Skipping address generation for {}, as alias exists and force option is not enabled.", alias);
            return; // Exit if not forcing alias generation
        } else {
            println!("Forcing address generation for {}...", alias);
        }
    } else {
        println!("No address found for alias: {}, generating new payment address...", alias);
    }

    // Use the provided viewing key
    let viewing_key_ref = &viewing_key.as_viewing_key();

    // Generate the shielded payment address
    let (div, _g_d) = find_valid_diversifier(&mut OsRng);
    let masp_payment_addr = viewing_key_ref
        .to_payment_address(div)
        .expect("Unable to generate a PaymentAddress");
    let payment_addr = PaymentAddress::from(masp_payment_addr);

    // Store the payment address in the wallet
    sdk.wallet_mut().await
        .insert_payment_addr(alias.to_string(), payment_addr.clone(), alias_force) // Convert alias to String
        .expect("Payment address could not be inserted");

    // Save the wallet with the new address
    sdk.wallet().await.save().expect("Could not save wallet!");

    println!("New payment address generated and saved for {}: {:?}", alias, payment_addr);
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
