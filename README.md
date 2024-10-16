
# Namada Wallet in Rust

A Rust implementation of a Namada wallet featuring functionalities to create, derive, and import wallets.


Load an existing wallet.toml and allow the entry of a new keypair from a mnemonic code.

The wallet will be saved to/loaded from `./sdk-wallet/wallet.toml`
## Features

1. **Wallet Creation**
   - Generate a new wallet with a secure mnemonic phrase and seed.

2. **Key Derivation**
   - Derive keys using specified paths for hierarchical deterministic wallets (HD wallets).

3. **Wallet Import**
   - Import existing wallets using mnemonic phrases.

4. **Spending Key Generation**
   - Generate a spending key for transactions.

5. **Reveal PK Check & Revealing Support**
   - Check if the private key (PK) has been revealed; if not, reveal it when necessary.

6. **Transparent Transfer Support**
   - Facilitate sending funds transparently between wallets.

7. **Generate Payment**
   - Generate a payment address from a viewing key.

8. **Shielded Sync**
   - Perform shielded sync and save the context from transparent to shielded addresses.

9. **Transparent to Shielded Transfer**
   - Send funds from a transparent address to a shielded address.

10. **Generate Memo for IBC**
    - Generate a memo for Inter-Blockchain Communication (IBC) transfers.

11. **IBC Token Transfer**
    - Support IBC token transfers between different blockchain networks.

 

## Getting Started

### Prerequisites

Make sure you have Rust installed. You can download it from [rust-lang.org](https://www.rust-lang.org/).

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/namada-wallet.git
cd namada-wallet
cargo build
cargo run dev
```



## Acknowledgements

Thanks to [Ian (Spork)](https://github.com/iskay) for helping me out with the process!
