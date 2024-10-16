use tokio;
use std::str::FromStr;
use std::io::{self, Write};
use namada_sdk::{
    MaybeSend, 
    MaybeSync,
    io::{StdIo, Io, Client}, 
    masp::{ShieldedUtils, fs::FsShieldedUtils}, 
    wallet::{WalletIo, DerivationPath, WalletStorage, fs::FsWalletUtils}, 
    Namada, 
    NamadaImpl, 
    chain::ChainId,
    zeroize::Zeroizing,
    bip39::Mnemonic,
    key::SchemeType,
    args::TxBuilder,
};
use tendermint_rpc::{HttpClient, Url};
use anyhow::{Result, Context};

const RPC_URL: &str = "https://rpc.knowable.run:443"; // RPC URL
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; // Chain ID

#[tokio::main]
async fn main() -> Result<()> {
    let url = Url::from_str(RPC_URL)?;
    let http_client = HttpClient::new(url)?;

    let wallet = FsWalletUtils::new("./sdk-wallet".into());
    let shielded_mut = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    let sdk = NamadaImpl::new(http_client, wallet, shielded_mut, std_io)
        .await?
        .chain_id(ChainId::from_str(CHAIN_ID)?); 

    if sdk.wallet_mut().await.load().is_ok() {
        println!("Existing wallet found.");
    } else {
        println!("No existing wallet found. Creating a new wallet...");
    }
    add_key(&sdk).await?;

    Ok(())
}

// Add a key from a mnemonic
async fn add_key<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>) -> Result<()>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let phrase = prompt_user("Enter the mnemonic: ");
    let alias = prompt_user("Enter an alias: ");
    
    let mnemonic = Mnemonic::from_phrase(&phrase, namada_sdk::bip39::Language::English)
        .context("Invalid mnemonic")?;

    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);
    let (_key_alias, _sk) = sdk.wallet_mut().await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519,
            Some(alias.clone()),
            true,
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        ).context("Unable to derive key from mnemonic code")?;

    sdk.wallet().await.save().context("Could not save wallet!")?;
    println!("Key added successfully with alias: {}", alias);
    Ok(())
}

fn prompt_user(prompt: &str) -> String {
    print!("{}", prompt);
    io::stdout().flush().unwrap(); 

    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    input.trim().to_string()
}
