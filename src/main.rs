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
use namada_sdk::ExtendedSpendingKey;
use namada_sdk::ExtendedViewingKey;
use rand::rngs::OsRng;
use namada_core::masp::PaymentAddress;
use namada_sdk::masp::find_valid_diversifier;
use tendermint_rpc::{HttpClient, Url};


const RPC_URL: &str = "https://rpc.knowable.run:443"; // Change as necessary
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3"; // Change as necessary

#[tokio::main]
async fn main() {
    let url = Url::from_str(RPC_URL).expect("Invalid RPC address");
    let http_client = HttpClient::new(url).expect("Failed to create HTTP client");

    let wallet = FsWalletUtils::new("./sdk-wallet".into());
    let shielded_ctx = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    let sdk = NamadaImpl::new(http_client, wallet, shielded_ctx, std_io)
        .await
        .expect("Unable to initialize Namada context")
        .chain_id(ChainId::from_str(CHAIN_ID).expect("Invalid chain ID"));

    // Load existing wallet.toml (if any)
    if sdk.wallet_mut().await.load().is_ok() {
        println!("Existing wallet found");
    } else {
        println!("No existing wallet found.");
    }

    // Query the current epoch
    if let Err(e) = rpc::query_epoch(&sdk.clone_client()).await {
        println!("Query error: {:?}", e);
    } else {
        println!("Current epoch queried successfully.");
    }

    loop {
        // Display the menu
        display_menu();

        let choice = get_user_choice();
        match choice {
            1 => create_wallet(&sdk).await,
            2 => add_key(&sdk).await,
            3 => print_address(&sdk).await,
            4 => create_spending_key(&sdk).await,
            5 => generate_payment_address(&sdk).await,
            6 => {
                println!("Exiting...");
                break;
            }
            _ => println!("Invalid choice, please enter a valid option."),
        }
    }
}

fn display_menu() {
    println!("\nNamada wallet example:");
    println!("1. Create a new wallet");
    println!("2. Add a new key from a mnemonic");
    println!("3. Print an address from the wallet");
    println!("4. Create a spending key");
    println!("5. Generate a payment address");
    println!("6. Exit");
}

fn get_user_choice() -> usize {
    print!("Enter your choice: ");
    io::stdout().flush().expect("Failed to flush stdout");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");

    input.trim().parse::<usize>().unwrap_or(0) // Default to 0 if parsing fails
}

async fn create_wallet<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let mnemonic = Mnemonic::new(namada_sdk::bip39::MnemonicType::Words24, namada_sdk::bip39::Language::English);
    let phrase = mnemonic.phrase();

    println!("Generated mnemonic: {}", phrase);
    let alias = prompt_user("Enter an alias for the new wallet: ");

    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);
    let (_key_alias, _sk) = sdk.wallet_mut().await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519,
            Some(alias),
            true,
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        ).expect("Unable to derive key from mnemonic code");

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
    let phrase = prompt_user("Enter the mnemonic: ");
    let alias = prompt_user("Enter an alias: ");
    let mnemonic = Mnemonic::from_phrase(&phrase, namada_sdk::bip39::Language::English).expect("Invalid mnemonic");

    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);
    let (_key_alias, _sk) = sdk.wallet_mut().await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519,
            Some(alias),
            true,
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        ).expect("Unable to derive key from mnemonic code");

    sdk.wallet().await.save().expect("Could not save wallet!");
    println!("Key added successfully!");
}

async fn print_address<C, U, V, I>(sdk: &NamadaImpl<C, U, V, I>)
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let alias = prompt_user("Which alias do you want to look up? ");
    match sdk.wallet().await.find_address(&alias) {
        Some(address) => println!("Address for {}: {:?}", alias, address),
        None => println!("No address found for alias: {}", alias),
    }
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

    let alias = prompt_user("Enter the alias to generate a payment address: ");
    let alias_force = prompt_user("Do you want to force alias generation if it already exists? (yes/no): ").to_lowercase() == "yes";

    // Check if an address exists for the alias
    if let Some(address) = sdk.wallet().await.find_address(&alias) {
        println!("Address already exists for {}: {:?}", alias, address);
    } else {
        println!("No address found for alias: {}, generating new payment address...", alias);

        // Generate the shielded payment address using the viewing key directly
        let (div, _g_d) = find_valid_diversifier(&mut OsRng);
        let masp_payment_addr = viewing_key
            .to_payment_address(div) // Call directly on viewing_key
            .expect("Unable to generate a PaymentAddress");
        let payment_addr = PaymentAddress::from(masp_payment_addr);

        // Store the payment address in the wallet
        sdk.wallet_mut().await
            .insert_payment_addr(alias.clone(), payment_addr, alias_force)
            .expect("Payment address could not be inserted");

        // Save the wallet with the new address
        sdk.wallet().await.save().expect("Could not save wallet!");

        println!("New payment address generated and saved for {}: {:?}", alias, payment_addr);
    }
}



// Helper function to prompt the user for input
fn prompt_user(prompt: &str) -> String {
    print!("{}", prompt);
    io::stdout().flush().expect("Failed to flush stdout");

    let mut input = String::new();
    io::stdin().read_line(&mut input).expect("Failed to read line");
    input.trim().to_string()
}