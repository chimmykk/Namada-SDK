use std::str::FromStr;
use namada_sdk::args::SdkTypes;
use std::error::Error;
use tokio;
use namada_sdk::{
    MaybeSend,
    MaybeSync,
    args::{QueryBalance, Query},
    io::{StdIo, Io, Client},
    masp::{ShieldedUtils, fs::FsShieldedUtils},
    wallet::{WalletIo, WalletStorage, fs::FsWalletUtils},
    Namada,
    NamadaImpl,
    chain::ChainId,
    rpc,
};
use masp_primitives::sapling::ViewingKey;
use namada_sdk::args::TxBuilder;
use namada_core::masp::MaspEpoch;
use tendermint_rpc::{HttpClient, Url};
use namada_core::address::Address;
use anyhow::{Result}; // Importing Result from anyhow
use namada_sdk::masp::shielded_wallet::ShieldedApi;
use std::io::Cursor;
use namada_sdk::chain::BlockHeight;

const RPC_URL: &str = "https://rpc.knowable.run:443"; // RPC URL
const CHAIN_ID: &str = "housefire-cotton.d3c912fee7462"; // Chain ID
const OWNER_ADDRESS: &str = "tnam1qze5x6au3egfnq7qp963c793cev5z5jvkcufnfhj"; // Owner address placeholder

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

    // Call the function to query shielded balance
    if let Err(e) = query_shielded_balance::<HttpClient, FsWalletUtils, FsShieldedUtils, StdIo>(&sdk).await {
        println!("Error querying balance: {:?}", e);
    }
}

// Function to query the shielded balance
pub async fn query_shielded_balance<C, U, V, I>(
    context: &impl Namada,
) -> Result<(), Box<dyn Error>>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Token address to query
    let token_address = Address::from_str("tnam1qy440ynh9fwrx8aewjvvmu38zxqgukgc259fzp6h")
        .expect("Invalid token address");

    // Create QueryBalance struct with a cloned token_address
    let args: QueryBalance<SdkTypes> = QueryBalance {
        token: token_address.clone(), // Clone the token_address here to avoid moving it
        height: Some(BlockHeight(10)), // Wrap in BlockHeight
        owner: namada_core::masp::BalanceOwner::Address(Address::from_str(OWNER_ADDRESS).expect("Invalid owner address")), // Wrap Address
        no_conversions: true,
        query: Query {
            ledger_address: Url::from_str("https://rpc.knowable.run:443").expect("Invalid ledger address"), // Change Address to Url
        },
    };

    // Hardcoded viewing key (replace this with your actual viewing key)
    let viewing_key_str = "zvknam1qdcy822pqqqqpqql7h8qaqyg55lnjy545yjs252cnn7aq0t89p6jc5aywtqqwffu9j0q25xzqnqx2x7xwkukvqv25rvqujk45qvjkgnklru7l8lw3edym8vmz5sa87k05p9uuegjedyphma2959qrru5td944atu8npjh44c3cww956qhnvltk5mt4cv706lle0e0z2d6n4sc4vhy4jq6nnfp5ulllsghsq4csvfjn6znwv6z6caadwht78al98avnepzvwsph7lgjg9h3wh3";

    // Load and precompute asset types
    {
        let mut shielded = context.shielded_mut().await;
        shielded.load().await?;
        shielded.precompute_asset_types(context.client(), vec![&token_address]).await?; // Use token_address here
        shielded.save().await?;
    }

    // Query and print the MASP epoch
    let masp_epoch = query_and_print_masp_epoch(context).await;

    let mut shielded = context.shielded_mut().await;

    let no_balance = || {
        println!("{}: 0", token_address);
    };

    // Convert the string to a ViewingKey
    let viewing_key = ViewingKey::read(Cursor::new(viewing_key_str.as_bytes()))
        .expect("Invalid viewing key");

    // Query the balance
    let balance = if args.no_conversions {
        shielded
            .compute_shielded_balance(&viewing_key)
            .await
            .unwrap_or_else(|_| {
                no_balance();
                None
            })
    } else {
        shielded
            .compute_exchanged_balance(
                context.client(),
                context.io(),
                &viewing_key,
                masp_epoch,
            )
            .await
            .unwrap_or_else(|_| {
                no_balance();
                None
            })
    };

    // Check total balance and display it
    if let Some(balance) = balance {
        let total_balance = shielded
            .decode_combine_sum_to_epoch(context.client(), balance, masp_epoch)
            .await
            .0
            .get(&args.token);

        if total_balance.is_zero() {
            no_balance();
        } else {
            println!(
                "{}: {}",
                token_address,
                context.format_amount(&token_address, total_balance.into()).await
            );
        }
    }

    Ok(())
}

// Function to query and print the MASP epoch
pub async fn query_and_print_masp_epoch(context: &impl Namada) -> MaspEpoch {
    let epoch = rpc::query_masp_epoch(context.client()).await.unwrap();
    println!("Last committed MASP epoch: {}", epoch);
    epoch
}
