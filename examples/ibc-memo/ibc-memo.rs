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
use anyhow::{Result, Context}; 

const RPC_URL: &str = "https://rpc.knowable.run:443"; 
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; // Chain ID
const OWNER_ADDRESS: &str = "tnam1qze5x6au3egfnq7qp963c793cev5z5jvkcufnfhj";

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
    let ibc_memo = generate_ibc_memo(&sdk).await;
    println!("{}", ibc_memo);

    Ok(())
}

/// Generates the IBC memo for a transfer transaction.
pub async fn generate_ibc_memo<C, U, V, I>(
    sdk: &NamadaImpl<C, U, V, I>, 
) -> String
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let alias = "$useyouralias"; 

    let wallet_guard = sdk.wallet().await;

    let source_address = match wallet_guard.find_address(&alias) { 
        Some(address) => address.into_owned(),
        None => {
            println!("No address found for alias: {}", alias);
            return String::new(); 
        }
    };


    let token = sdk.native_token();


    let amount = InputAmount::from_str("1").expect("Invalid amount"); 

    let channel_id_str = "channel-0"; 
    let port_id_str = "transfer/channel-0"; 
    let receiver = "cosmos1tsf6mvwzgxakzfltdxjlxygkrm2ht8fk5tq4kp"; // Replace with your actual receiver address

    let amount_str = format!("{:?}", amount); 

    format!(
        "Transfer of {} {} from {} to {} via port {} and channel {}",
        amount_str, 
        token, 
        source_address, 
        receiver,
        port_id_str, 
        channel_id_str 
    )
}
