use std::str::FromStr;
use std::fs;
use namada_sdk::{
    MaybeSend,
    MaybeSync,
    args::TxBuilder,
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
use toml::{self, Value};
use tendermint_rpc::{HttpClient, Url};
use namada_sdk::ExtendedViewingKey;
use toml::from_str;
use namada_sdk::PaymentAddress;
use rand_core::OsRng;
use namada_sdk::masp::find_valid_diversifier;
use std::io::Read;
use std::path::Path;
const RPC_URL: &str = "https://namada-campfire-rpc.zenode.app";
const CHAIN_ID: &str = "housefire-reduce.e51ecf4264fc3";

#[tauri::command]
async fn create_wallet<C, U, V, I>(
    sdk: &NamadaImpl<C, U, V, I>
) -> Result<(String, String), String> // Return a tuple with both message and mnemonic
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    let mnemonic_type = namada_sdk::bip39::MnemonicType::Words24; 
    let mnemonic = Mnemonic::new(mnemonic_type, namada_sdk::bip39::Language::English);
    let phrase = mnemonic.phrase().to_string(); // Convert to string for easier handling

    println!("Generated mnemonic: {}", phrase);

    let base_alias = "rilsso"; // Base alias
    let public_alias = format!("{}-public", base_alias); // Alias for the public key
    let spending_alias = format!("{}-spending", base_alias); // Alias for the spending key

    // Create transparent (public) key
    let derivation_path = DerivationPath::default_for_transparent_scheme(SchemeType::Ed25519);

    let key_result = sdk
        .wallet_mut()
        .await
        .derive_store_key_from_mnemonic_code(
            SchemeType::Ed25519,
            Some(public_alias.clone()),
            true,
            derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        );

    let (_key_alias, _sk) = match key_result {
        Some(result) => result,
        None => return Err("Unable to derive key from mnemonic code.".to_string()),
    };
    println!("Public key derived and stored under alias: {}", public_alias);

    sdk.wallet().await.save().map_err(|e| format!("Could not save wallet: {}", e))?;

    // Create spending (shielded) key with the differentiated alias
    create_spending_key(sdk, spending_alias, phrase.clone()).await?;
    // generate_payment_address().await?;

    Ok((format!("Wallet created and saved with alias: {}", base_alias), phrase)) // Return message and phrase
}


#[tauri::command]
async fn generate_payment_address() -> Result<(), String> {
    // Initialize SDK here instead of receiving it as an argument
    let url = Url::from_str(RPC_URL).map_err(|e| format!("Invalid RPC address: {}", e))?;
    let http_client = HttpClient::new(url).map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let wallet = FsWalletUtils::new("./masp-wallets".into());
    let shielded_ctx = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    let sdk = NamadaImpl::new(http_client, wallet, shielded_ctx, std_io)
        .await
        .map_err(|e| format!("Unable to initialize Namada context: {}", e))?
        .chain_id(ChainId::from_str(CHAIN_ID).map_err(|e| format!("Invalid chain ID: {}", e))?);
    let viewing_keys = get_viewing_keys().await?;


    if viewing_keys.is_empty() {
        return Err("No viewing keys found in the wallet.".to_string());
    }

    let viewing_key_str = &viewing_keys[0]; // Use the first viewing key
    let viewing_key = ExtendedViewingKey::from_str(viewing_key_str)
        .map_err(|_| "Invalid viewing key".to_string())?;

    let alias = "rilsso-public";
    let alias_force = true;

    if let Some(address) = sdk.wallet().await.find_address(&alias) {
        println!("Address already exists for {}: {:?}", alias, address);

        if !alias_force {
            println!("Skipping address generation for {}, as alias exists and force option is not enabled.", alias);
            return Ok(());
        } else {
            println!("Forcing address generation for {}...", alias);
        }
    } else {
        println!("No address found for alias: {}, generating new payment address...", alias);
    }

    let viewing_key_ref = &viewing_key.as_viewing_key();
    let (div, _g_d) = find_valid_diversifier(&mut OsRng);

    let masp_payment_addr = viewing_key_ref
        .to_payment_address(div)
        .ok_or_else(|| "Unable to generate a PaymentAddress".to_string())?;
    let payment_addr = PaymentAddress::from(masp_payment_addr);

    sdk.wallet_mut().await
        .insert_payment_addr(alias.to_string(), payment_addr.clone(), alias_force)
        .ok_or_else(|| "Payment address could not be inserted".to_string())?;

    sdk.wallet().await.save().map_err(|_| "Could not save wallet".to_string())?;

    println!("New payment address generated and saved for {}: {:?}", alias, payment_addr);

    Ok(())
}



#[tauri::command]
async fn create_spending_key<C, U, V, I>(
    sdk: &NamadaImpl<C, U, V, I>,
    spending_alias: String, // Differentiated alias for the spending key
    phrase: String
) -> Result<(), String>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Check that it's a valid mnemonic
    let mnemonic = Mnemonic::from_phrase(phrase.as_str(), namada_sdk::bip39::Language::English)
        .expect("Invalid mnemonic");

    // Derive the spending key using the same mnemonic
    let spending_derivation_path = DerivationPath::default_for_shielded();
    let (_spending_key_alias, _sk_spending) = sdk
        .wallet_mut()
        .await
        .derive_store_spending_key_from_mnemonic_code(
            spending_alias, // Differentiated alias
            true,
            None,
            spending_derivation_path,
            Some((mnemonic.clone(), Zeroizing::new("".to_owned()))),
            true,
            None,
        )
        .expect("Unable to derive spending key from mnemonic");

    // Print the spending key
    println!("Derived spending key");

    // Save the wallet to disk
    sdk.wallet().await.save().expect("Could not save wallet!");

    println!("Spending key created and saved!");
    Ok(())
}

#[tauri::command]
async fn initialize_namada_sdk() -> Result<(String, String), String> {
    let url = Url::from_str(RPC_URL).map_err(|e| format!("Invalid RPC address: {}", e))?;
    let http_client = HttpClient::new(url).map_err(|e| format!("Failed to create HTTP client: {}", e))?;

    let wallet = FsWalletUtils::new("./sdk-wallet".into());
    let shielded_ctx = FsShieldedUtils::new("./masp".into());
    let std_io = StdIo;

    let sdk = NamadaImpl::new(http_client, wallet, shielded_ctx, std_io)
        .await
        .map_err(|e| format!("Unable to initialize Namada context: {}", e))?
        .chain_id(ChainId::from_str(CHAIN_ID).map_err(|e| format!("Invalid chain ID: {}", e))?);

    println!("Namada SDK initialized successfully.");

    match sdk.wallet_mut().await.load() {
        Ok(_) => println!("Existing wallet found"),
        Err(e) => println!("Could not load wallet: {}", e),
    }

    create_wallet(&sdk).await
}

#[tauri::command]
async fn get_viewing_keys() -> Result<Vec<String>, String> {
    let file_path = "./sdk-wallet/wallet.toml"; // Update with your actual file path
    let content = fs::read_to_string(file_path).map_err(|e| format!("Unable to read file: {}", e))?;

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

fn clean_address(address: &str) -> String {
    address.trim().to_string() 
}


#[tauri::command]
async fn print_payment_addresses() -> Result<Vec<String>, String> {
    let file_path = "./masp-wallets/wallet.toml"; // Path to the wallet file
    let content = fs::read_to_string(file_path).map_err(|e| format!("Unable to read file: {}", e))?;

    let parsed: Value = from_str(&content).map_err(|e| format!("Unable to parse TOML: {}", e))?;

    let mut keys = Vec::new();
    
    // Retrieve the payment_addrs section
    if let Some(payment_addrs) = parsed.get("payment_addrs").and_then(|v| v.as_table()) {
        for (key, value) in payment_addrs {
            // Check if the value is a string
            if let Some(address) = value.as_str() {
                // Include both key and address in the output format
                keys.push(format!("{} = \"{}\"", key, address));
                println!("Content read from file: {} = \"{}\"", key, address); // For debugging
            } else {
                return Err(format!("Expected a string for key '{}'", key));
            }
        }
    } else {
        return Err("No payment_addrs found.".to_string());
    }

    Ok(keys)
}
#[tauri::command]
fn merge_addresses() -> Result<(), String> {
    let test1_file_path = "./masp-wallets/wallet.toml"; 
    let test_file_path = "./sdk-wallet/wallet.toml"; 

    let test1_content = fs::read_to_string(test1_file_path)
        .map_err(|e| format!("Failed to read {}: {}", test1_file_path, e))?;
    let test1_data: Value = toml::de::from_str(&test1_content)
        .map_err(|e| format!("Failed to parse {}: {}", test1_file_path, e))?;

    let test_content = fs::read_to_string(test_file_path)
        .map_err(|e| format!("Failed to read {}: {}", test_file_path, e))?;
    let mut test_data: Value = toml::de::from_str(&test_content)
        .map_err(|e| format!("Failed to parse {}: {}", test_file_path, e))?;

    if let Some(payment_addrs) = test1_data.get("payment_addrs") {
        test_data["payment_addrs"] = payment_addrs.clone();
    }

    let ordered_sections = vec![
        "view_keys",
        "spend_keys",
        "payment_addrs",
        "secret_keys",
        "public_keys",
        "derivation_paths",
        "addresses",
        "pkhs",
        "address_vp_types",
    ];

    let mut ordered_data = toml::map::Map::new();

    for section in ordered_sections {
        if let Some(value) = test_data.get(section) {
            ordered_data.insert(section.to_string(), value.clone());
        }
    }

    let updated_test_content = toml::to_string(&ordered_data)
        .map_err(|e| format!("Failed to convert data back to TOML: {}", e))?;

    fs::write(test_file_path, updated_test_content)
        .map_err(|e| format!("Failed to write updated {}: {}", test_file_path, e))?;

    println!("Updated payment_addrs in {}.", test_file_path);

    // Call the function to reverse the order of the TOML content
    update_toml_file("./sdk-wallet/wallet.toml") // Use the correct path here
        .map_err(|e| format!("Failed to update TOML file: {}", e))?;

    Ok(())
}

fn update_toml_file(toml_path: &str) -> Result<(), String> {
    // Read the TOML file
    let mut toml_file = fs::File::open(toml_path)
        .map_err(|e| format!("Failed to open TOML file: {}", e))?;
    let mut toml_content = String::new();
    
    toml_file.read_to_string(&mut toml_content)
        .map_err(|e| format!("Failed to read TOML file: {}", e))?;

    // Process and reverse the TOML content
    let reversed_toml = reverse_toml_order(&toml_content);
    
    // Write the reversed TOML back to the file
    fs::write(toml_path, reversed_toml)
        .map_err(|e| format!("Failed to write reversed TOML back to file: {}", e))?;

    println!("Successfully reversed and updated {}", toml_path);

    Ok(())
}

fn reverse_toml_order(toml_str: &str) -> String {
    let mut sections = std::collections::BTreeMap::new();
    let mut current_section = String::new();

    for line in toml_str.lines() {
        let trimmed = line.trim();

        if trimmed.is_empty() {
            continue;
        }

        if trimmed.starts_with('[') && trimmed.ends_with(']') {
            current_section = trimmed.to_string();
            sections.insert(current_section.clone(), Vec::new());
        } else if !current_section.is_empty() {
            sections.entry(current_section.clone())
                .or_insert_with(Vec::new)
                .push(trimmed.to_string());
        }
    }

    let mut result = String::new();
    for (section, values) in sections.into_iter().rev() {
        result.push_str(&format!("\n{}\n", section));
        for value in values.into_iter().rev() {
            result.push_str(&format!("{}\n", value));
        }
    }

    result
}
#[tauri::command]
fn check_dir() -> Result<(bool, String), String> {
    let dir_path = "./sdk-wallet"; // Path to check
    if Path::new(dir_path).exists() {
        let message = format!("Directory '{}' exists.", dir_path);
        println!("{}", message); // Print message to console
        Ok((true, message)) // Return Ok with true and the message
    } else {
        let message = format!("Directory '{}' does not exist.", dir_path);
        println!("{}", message); // Print message to console
        Ok((false, message)) // Return Ok with false and the message //testcommit
    }
}
// Main function
#[tauri::command]
fn process_input(input: String) -> String {
    // Define the directory and file names
    let dir_name = "accountsection";
    let file_name = "credentails.txt";

    // Create the directory if it doesn't exist
    if !Path::new(dir_name).exists() {
        match fs::create_dir(dir_name) {
            Ok(_) => println!("Directory created: {}", dir_name),
            Err(e) => return format!("Failed to create directory: {}", e),
        }
    }

    // Define the file path
    let file_path = Path::new(dir_name).join(file_name);

    // Write the input to the file
    match fs::write(&file_path, &input) {
        Ok(_) => format!("Received input: {} and stored in {}", input, file_path.display()),
        Err(e) => format!("Failed to write to file: {}", e),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            initialize_namada_sdk,
            get_viewing_keys,
            generate_payment_address, 
            print_payment_addresses,
            merge_addresses, 
            check_dir,
            process_input, 
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}