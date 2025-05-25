'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { worldchain } from 'viem/chains';
import KNOWN_TOKENS from '../../tokens.json';
import {Token} from "@/models/Token";
import {useRouter} from "next/navigation";
import {useToken} from "@/components/TokenContext";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

export const UserInfo = () => {
  const session = useSession();
  const walletAddress = session?.data?.user?.id;
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const { setToken } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (!walletAddress) return;
    const sessionKey = `tokens_${walletAddress}`;
    const cached = sessionStorage.getItem(sessionKey);
    if (cached) {
      setTokens(JSON.parse(cached));
      return;
    }

    const fetchTokens = async () => {
      setLoading(true);
      try {
        const provider = new ethers.JsonRpcProvider(worldchain.rpcUrls.default.http[0]);
        const balances = await Promise.all(
          KNOWN_TOKENS.map(async (token) => {
            const contract = new ethers.Contract(
              token,
              ERC20_ABI,
              provider
            );
            const balance: BigNumberish = await contract.balanceOf(walletAddress);
            const name = await contract.name();
            const symbol = await contract.symbol();
            const decimals = await contract.decimals();

            return {
              balance: parseFloat(balance.toString()),
              name: name.toString(),
              symbol: symbol.toString(),
              decimals: Number(decimals),
            };
          })
        );
        const filtered = balances.filter(token => token.balance > 0).sort((a, b) => a.symbol.localeCompare(b.symbol));
        setTokens(filtered);
        sessionStorage.setItem(sessionKey, JSON.stringify(filtered));
      }
      catch (e) {
        console.log(e);
        setTokens([]);
      }
      setLoading(false);
    };
    fetchTokens();
  }, [walletAddress]);

  function openToken(token: Token) {
    setToken(token);
    router.push(`/wallet/token`);

    return undefined;
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl w-full border-2 border-gray-200 p-4">
      <div>
        <h3 className="font-bold mb-2">ERC20 Token:</h3>
        {loading && <span>Loading Tokens ...</span>}
        <p>Tokens: {tokens.length}</p>
        {!loading && tokens.length === 0 && <span>No Tokens found</span>}
        <ul>
          {tokens.map((token) => (
            <li
              key={token.name} onClick={()=>openToken(token)}
              className="flex items-center gap-2 mb-1"
            >
              <span>
                {token.symbol}:{" "}
                {token.balance / 10 ** token.decimals}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
