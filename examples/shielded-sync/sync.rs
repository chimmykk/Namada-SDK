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
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; // Chain ID
const OWNER_ADDRESS: &str = "tnam1qze5x6au3egfnq7qp963c793cev5z5jvkcufnfhj"; // Just a placeholder to check if address is reveal pk or not

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

    // Directly call shielded_sync without the menu
    shielded_sync(&sdk).await.expect("Failed to sync shielded context");

    // Exit the application after sync
    println!("Shielded sync completed. Exiting...");
}

// Shielded sync function remains unchanged
// shielded synnc
async fn shielded_sync<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>) -> Result<(), Box<dyn Error>>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let spend_key = ExtendedSpendingKey::from_str("zsknam1q0medj45qqqqpq9wh90qd9c7d9f7n5xxn89h6dl54k0jfmucwn4yk7nykxwcrjmk4ylkdnlnn3wkkd9f3ul3nyw8hv5wlsfgklzr5ghzk2spzzwm05csvl2s3rn0aq7f9w4z7guul682yrw4hsmren2k2lgdp003uuj00lsd8nlevc8n32sz6j350up209980c04qdqcu97vh5476xv423k6jp58qn7hqjf9nvsvk8p8g5yfmqguu039q34c2euzhcpnca7vpp4pelqu6y87k")
        .expect("Invalid spending key");

    let dated_key = DatedSpendingKey::try_from(spend_key).expect("Error reading spend key");

    // create a thread pool for the shielded sync
    let env = MaspLocalTaskEnv::new(500).expect("could not create masp env");

    // progress bars for displaying sync progress
    let fetched = kdam::tqdm!(
        total = 0,
        desc = "fetched ",
        animation = "fillup",
        position = 0,
        force_refresh = true,
        dynamic_ncols = true,
        miniters = 0,
        mininterval = 0.05
    );

    let scanned = kdam::tqdm!(
        total = 0,
        desc = "scanned ",
        animation = "fillup",
        position = 1,
        force_refresh = true,
        dynamic_ncols = true,
        miniters = 0,
        mininterval = 0.05
    );

    let applied = kdam::tqdm!(
        total = 0,
        desc = "applied ",
        animation = "fillup",
        position = 2,
        force_refresh = true,
        dynamic_ncols = true,
        miniters = 0,
        mininterval = 0.05
    );

    // create a masp client to sync from the masp-indexer
    let client = reqwest::Client::builder()
        .connect_timeout(Duration::from_secs(60))
        .build()
        .expect("Failed to build HTTP client"); 

    let endpoint = "https://masp.knowable.run/api/v1".to_string();
 
    let url = endpoint.as_str().try_into().map_err(|err| {
        format!("Failed to parse API endpoint {endpoint:?}: {err}")
      
    })?;

    let shielded_client = IndexerMaspClient::new
    (client,
         url, true, 
         100);

    let config = ShieldedSyncConfig::builder()
        .client(shielded_client)
        .fetched_tracker(fetched)
        .scanned_tracker(scanned)
        .applied_tracker(applied)
        .shutdown_signal(install_shutdown_signal(false))
        .build();

    println!("Syncing shielded context");
    sdk.shielded_mut().await.sync(env, config, None, &[dated_key], &[]).await.expect("Could not sync shielded context");
     
    println!("Shielded context synced");

    Ok(())
}

