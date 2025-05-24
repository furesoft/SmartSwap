'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { worldchain } from 'viem/chains';

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

const KNOWN_TOKENS = [
  {
    address: "0x2cFc85d8E48F8EAB294be644d9E25C3030863003",
    symbol: "WLD",
    name: "Worldcoin",
    decimals: 18,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
  },
  {
    address: "0xB9763b34FF32CDb80dA94ae93941b00990237337",
    symbol: "ADRS",
    name: "Anders",
    decimals: 18,
  },
];

export const UserInfo = () => {
  const session = useSession();
  const walletAddress = session?.data?.user?.walletAddress;
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!walletAddress) return;
      setLoading(true);
      try {
        const provider = new ethers.JsonRpcProvider(worldchain.rpcUrls.default.http[0]);
        const balances = await Promise.all(
          KNOWN_TOKENS.map(async (token) => {
            const contract = new ethers.Contract(
              token.address,
              ERC20_ABI,
              provider
            );
            const balance = await contract.balanceOf(walletAddress);
            return {
              ...token,
              balance: ethers.formatUnits(balance, token.decimals),
            };
          })
        );
        setTokens(balances.filter((t) => Number(t.balance) > 0));
      } catch (e) {
        setTokens([]);
      }
      setLoading(false);
    };
    fetchTokens();
  }, [walletAddress]);

  return (
    <div className="flex flex-col gap-4 rounded-xl w-full border-2 border-gray-200 p-4">
      <div className="flex flex-row items-center justify-center">
        <span className="text-lg font-semibold capitalize">
          {walletAddress}
        </span>
      </div>
      <div>
        <h3 className="font-bold mb-2">ERC20 Token:</h3>
        {loading && <span>Lade Token...</span>}
        {!loading && tokens.length === 0 && <span>Keine Token gefunden.</span>}
        <ul>
          {tokens.map((token) => (
            <li
              key={token.contract_address}
              className="flex items-center gap-2 mb-1"
            >
              {token.logo_url && (
                <img
                  src={token.logo_url}
                  alt={token.contract_ticker_symbol}
                  width={24}
                  height={24}
                />
              )}
              <span>
                {token.contract_ticker_symbol}:{" "}
                {Number(token.balance) / 10 ** token.contract_decimals}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};