use tokio;
use std::str::FromStr;
use std::io::{self, Write};

use namada_sdk::{
    MaybeSend, 
    MaybeSync,
    args::TxBuilder, 
    io::{StdIo, Io, Client}, 
    masp::{ShieldedUtils, fs::FsShieldedUtils}, 
    rpc, 
    wallet::{WalletIo, DerivationPath, WalletStorage, fs::FsWalletUtils}, 
    Namada, 
    NamadaImpl, 
    chain::ChainId,
    zeroize::Zeroizing,
    bip39::Mnemonic,
    key::SchemeType,
};
use tendermint_rpc::{HttpClient, Url};


const RPC_URL: &str = "https://rpc.knowable.run:443"; // Change as necessary
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; // Change as necessary

#[tokio::main]
async fn main() {
    let url = Url::from_str(RPC_URL).expect("Invalid RPC address");
    let http_client = HttpClient::new(url).unwrap();

    // Directory where your wallet.toml will go
    let wallet = FsWalletUtils::new("./sdk-wallet".into());
    // Directory where the masp params will be downloaded (not used in this example)
    let shielded_ctx = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    // Initialize the SDK object (chain context)
    let sdk = NamadaImpl::new(http_client, wallet, shielded_ctx, std_io)
        .await
        .expect("unable to initialize Namada context")
        .chain_id(ChainId::from_str(CHAIN_ID).unwrap());

    // Load existing wallet.toml (if any)
    match sdk.wallet_mut().await.load() {
        Ok(_) => println!("Existing wallet found"),
        Err(e) => println!("Could not load wallet: {}", e),
    }

    // Query the epoch just to make sure everything's working
    match rpc::query_epoch(&sdk.clone_client()).await {
        Ok(current_epoch) => println!("Current epoch: {:?}", current_epoch),
        Err(e) => println!("Query error: {:?}", e),
    }

    loop {
        // Display the menu
        println!("\nNamada wallet example:");
        println!("1. Create a new wallet");
        println!("2. Add a new key from a mnemonic");
        println!("3. Print an address from the wallet");
        println!("4. Exit");

        print!("Enter your choice: ");
        io::stdout().flush().unwrap(); // Ensure prompt is printed before input

        let mut input = String::new();
        io::stdin().read_line(&mut input).unwrap();

        // Match on user input
        match input.trim().parse::<usize>() {
            Ok(1) => create_wallet(&sdk).await,
            Ok(2) => add_key(&sdk).await,
            Ok(3) => print_address(&sdk).await,
            Ok(4) => {
                println!("Exiting...");
                break;
            }
            _ => println!("Invalid choice, please enter 1, 2, 3, or 4."),
        }
    }
}

async fn create_wallet<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Generate a new mnemonic phrase with a specified type
    let mnemonic_type = namada_sdk::bip39::MnemonicType::Words12; // Change as needed
    let mnemonic = Mnemonic::new(mnemonic_type, namada_sdk::bip39::Language::English);
    let phrase = mnemonic.phrase();

    println!("Generated mnemonic: {}", phrase);

    // Prompt for an alias to store the key
    let alias = prompt_user("Enter an alias for the new wallet: ");

    // Derive the keypair from the mnemonic and add to the wallet
    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);

    let (_key_alias, _sk) = sdk
        .wallet_mut()
        .await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519,
            Some(alias),
            true, // Overwrite if alias exists
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true, // Prompt for encryption passphrase
            None, // No password
        )
        .expect("Unable to derive key from mnemonic code");

    // Save the wallet to disk
    sdk.wallet().await.save().expect("Could not save wallet!");

    println!("Wallet created and saved!");
}


async fn add_key<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Prompt user for the mnemonic phrase
    let phrase = prompt_user("Enter the mnemonic: ");

    // Prompt user for an alias
    let alias = prompt_user("Enter an alias: ");

    // Check that it's a valid mnemonic
    let mnemonic = Mnemonic::from_phrase(phrase.as_str(), namada_sdk::bip39::Language::English)
        .expect("Invalid mnemonic");

    // Namada uses Ed25519 type keys
    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);

    // Derive the keypair from the mnemonic and add to the wallet
    let (_key_alias, _sk) = sdk
        .wallet_mut()
        .await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519, // Key scheme
            Some(alias),          // Alias
            true,                 // Overwrite alias if it exists
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true, // Prompt for encryption passphrase
            None, // No password
        )
        .expect("Unable to derive key from mnemonic code");

    // Save the wallet to disk
    sdk.wallet().await.save().expect("Could not save wallet!");
}

async fn print_address<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Prompt user for an alias
    let alias = prompt_user("Which alias do you want to look up? ");
    match sdk.wallet().await.find_address(alias.clone()) {
        Some(address) => println!("Address for {}: {:?}", alias, address),
        None => println!("No address found for alias: {}", alias),
    }
}

fn prompt_user(prompt: &str) -> String {
    // Create a buffer to capture user input
    let mut input = String::new();

    // Print the prompt and flush stdout to make sure the prompt is displayed
    print!("{}", prompt);
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut input).unwrap();
    
    input.trim().to_string()
}
