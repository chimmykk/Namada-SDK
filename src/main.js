const { invoke } = window.__TAURI__.core;

let walletMsgEl;
let viewingKeysListEl;
let paymentAddressEl;
let viewPaymentEl; // Renamed to avoid confusion
let updateAllDetailsEl; // New element for update all details
let testButtonEl; // New element for Test button

// Function to create a wallet
async function createWallet() {
    try {
        const [message, mnemonic] = await invoke("initialize_namada_sdk");
        walletMsgEl.innerHTML = `${message}<br>Mnemonic Phrase: <strong>${mnemonic}</strong>`;
    } catch (error) {
        walletMsgEl.textContent = `Error creating wallet: ${error}`;
    }
}

// Function to get viewing keys
async function getViewingKeys() {
    try {
        const keys = await invoke("get_viewing_keys");
        viewingKeysListEl.innerHTML = ""; // Clear previous keys

        if (keys.length > 0) {
            keys.forEach(key => {
                const li = document.createElement("li");
                li.textContent = key;
                viewingKeysListEl.appendChild(li);
            });
        } else {
            viewingKeysListEl.innerHTML = "<li>No viewing keys found.</li>";
        }
    } catch (error) {
        viewingKeysListEl.innerHTML = `<li>Error fetching viewing keys: ${error}</li>`;
    }
}

// Function to get a single payment address
async function getPaymentAddress() {
    try {
        const result = await invoke("generate_payment_address");
        paymentAddressEl.textContent = `Payment Address: ${result}`;
    } catch (error) {
        paymentAddressEl.textContent = `Error getting payment address: ${error}`;
    }
}

// Function to view all payment addresses
async function viewPaymentAddresses() {
    try {
        const result = await invoke("print_payment_addresses");
        viewPaymentEl.textContent = result ? `Payment Addresses: ${result}` : "No payment addresses found.";
    } catch (error) {
        viewPaymentEl.textContent = `Error fetching payment addresses: ${error}`;
    }
}

// Function to update all details
async function updateAllDetails() {
    try {
        await invoke("merge_addresses");
        viewPaymentEl.textContent = "Payment addresses updated successfully.";
    } catch (error) {
        viewPaymentEl.textContent = `Error updating payment addresses: ${error}`;
    }
}

// Function to test directory
async function testDirectory() {
    try {
        await invoke("check_dir");
        alert("Directory check completed!"); // Notify user about the check
    } catch (error) {
        console.error("Error checking directory:", error);
        alert("Error checking directory: " + error.message);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    walletMsgEl = document.querySelector("#wallet-msg");
    viewingKeysListEl = document.querySelector("#viewing-keys-list");
    paymentAddressEl = document.querySelector("#payment-address");
    viewPaymentEl = document.querySelector("#viewpaymentaddress"); // Ensure this element exists in your HTML
    updateAllDetailsEl = document.querySelector("#update-all-details"); // New button for updating all details
    testButtonEl = document.querySelector("#test-button"); // Get reference to Test button

    document.querySelector("#create-wallet-form").addEventListener("submit", (e) => {
        e.preventDefault();
        walletMsgEl.textContent = "Creating wallet...";
        createWallet();
    });

    document.querySelector("#get-viewing-keys").addEventListener("click", () => {
        viewingKeysListEl.innerHTML = "Fetching viewing keys..."; // Show loading message
        getViewingKeys();
    });

    document.querySelector("#get-payment-address").addEventListener("click", () => {
        paymentAddressEl.textContent = "Fetching payment address..."; // Show loading message
        getPaymentAddress();
    });

    // Correctly added event listener for viewing all payment addresses
    document.querySelector("#viewpaymentaddress").addEventListener("click", () => {
        viewPaymentEl.textContent = "Fetching payment addresses..."; // Show loading message
        viewPaymentAddresses(); // Call the correct function
    });

    // New event listener for updating all details
    updateAllDetailsEl.addEventListener("click", () => {
        viewPaymentEl.textContent = "Updating payment addresses..."; // Show loading message
        updateAllDetails(); // Call the update function
    });

    // New event listener for testing directory
    testButtonEl.addEventListener("click", () => {
        testDirectory(); // Call the test directory function
    });
});
