
# Namada Wallet in Rust

A Rust implementation of a Namada wallet featuring functionalities to create, derive, and import wallets.


Load an existing wallet.toml and allow the entry of a new keypair from a mnemonic code.

The wallet will be saved to/loaded from `./sdk-wallet/wallet.toml`
## Features

- **Wallet Creation**: Generate a new wallet with a secure mnemonic phrase and seed.
- **Key Derivation**: Derive keys using paths for hierarchical deterministic wallets.
- **Wallet Import**: Import existing wallets using mnemonic phrases.
- **Spending Key Generationt**: Generates Spending key.
- **Reveal PK Check & Revealing Support:**: Reveal PK if not revealed.
- **Transparent Transfer Support:**: Send funds transparently.
- **Generate Payment:**: Generates payment address from viewing key.
- **Shielded Sync:**: Shielded sync and save context to transparent to shielded address.
- **Transparent>Shielded Transfer:**: Send funds from transparent to shielded address.
- **Generate Memo for IBC:**: Generates Memo for IBC transfer.
 

## Getting Started

### Prerequisites

Make sure you have Rust installed. You can download it from [rust-lang.org](https://www.rust-lang.org/).

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/namada-wallet.git
cd namada-wallet
```

## Acknowledgements

Special thanks to [Ian (Spork)](https://github.com/iskay) for helping me out with the process!
