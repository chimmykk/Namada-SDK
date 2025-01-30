import fetchData from "../utils/fetchData";
import { useState, useEffect } from "react";

const fetchWallet = () => {
  const [walletList, setWalletList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const data = fetchData("/ap/wallets.json");

      if (!data) {
        setError(data);
      }

      setWalletList(data);
    }

    load();
  }, []);

  return { walletList, loading, error };
};

export default fetchWallet;
