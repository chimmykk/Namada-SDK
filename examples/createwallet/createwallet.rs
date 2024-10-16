use tokio;
use std::str::FromStr;
use namada_sdk::{
    MaybeSend, 
    MaybeSync,
    args::{ TxBuilder}, 
    io::{StdIo, Io, Client}, 
    masp::{ShieldedUtils, fs::FsShieldedUtils}, 
    wallet::{WalletIo, DerivationPath, WalletStorage, fs::FsWalletUtils}, 
    Namada, 
    NamadaImpl, 
    chain::ChainId,
    zeroize::Zeroizing,
    bip39::Mnemonic,
    key::SchemeType,
};
use tendermint_rpc::{HttpClient, Url};
use anyhow::{Result, Context};

const RPC_URL: &str = "https://rpc.knowable.run:443"; 
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; 
const WALLET_ALIAS: &str = "default_wallet"; 

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
        println!("Existing wallet found. Continuing to create a new wallet...");
    } else {
        println!("No existing wallet found. Creating a new wallet...");
    }
    
    create_wallet(&sdk).await?;

    Ok(())
}

// Create a new wallet
async fn create_wallet<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>) -> Result<()>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let mnemonic = Mnemonic::new(namada_sdk::bip39::MnemonicType::Words24, namada_sdk::bip39::Language::English);
    let phrase = mnemonic.phrase();

    println!("Generated mnemonic: {}", phrase);

    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);
    let result = sdk.wallet_mut().await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519,
            Some(WALLET_ALIAS.to_string()),
            true,
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        );

    let (_key_alias, _sk) = result.ok_or_else(|| anyhow::anyhow!("Failed to derive key from mnemonic code"))?;

    sdk.wallet().await.save().context("Could not save wallet!")?;
    println!("Wallet created and saved!");
    Ok(())
}
