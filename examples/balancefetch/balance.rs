pub async fn get_token_balance<C, U, V, I>(
    sdk: &NamadaImpl<C, U, V, I>,
) -> Result<token::Amount, Box<dyn Error>>
where
    C: Client + MaybeSync + MaybeSend,
    U: WalletIo + WalletStorage + MaybeSync + MaybeSend,
    V: ShieldedUtils + MaybeSync + MaybeSend,
    I: Io + MaybeSync + MaybeSend,
{
    // Hardcoded addresses
    let token_address = Address::from_str("tnam1qy440ynh9fwrx8aewjvvmu38zxqgukgc259fzp6h")?;
    let owner_address = Address::from_str("tnam1qqteapc3ycthpehxtqadv6nx2grr5gptzs2ptyvy")?;

    // Fetch balance using the SDK
    let balance = sdk.rpc_client().await.get_token_balance(&token_address, &owner_address, None)
        .await
        .map_err(|e| Box::new(e) as Box<dyn Error>)?;

    Ok(balance)
}
