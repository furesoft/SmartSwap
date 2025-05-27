'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { worldchain } from 'viem/chains';
import {TOKENS} from '@/tokens';
import {Token} from "@/models/Token";
import {useRouter} from "next/navigation";
import {useToken} from "@/components/TokenContext";
import {Skeleton} from "@worldcoin/mini-apps-ui-kit-react";

const ERC20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

export const TokenList = () => {
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
            TOKENS.map(async (token) => {
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
    <div className="flex flex-col gap-4 rounded-xl w-full p-4">
      <div>
        {loading &&
        <div className="cursor-pointer border rounded-lg p-3 shadow-sm hover:bg-gray-50 transition flex flex-col gap-1">
          <Skeleton />
        </div>
        }

        {!loading && tokens.length === 0 && <span>No Tokens found</span>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {tokens.filter(t => t.balance > 0).map((token) => (
            <li
              key={token.name}
              onClick={() => openToken(token)}
              className="cursor-pointer border rounded-lg p-3 shadow-sm hover:bg-gray-50 transition flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{token.name}</span>
                {token.claim ? <button>Claim</button>}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-700">Balance:</span>
                <span className="font-mono">{(token.balance / 10 ** token.decimals).toLocaleString(undefined, { maximumFractionDigits: 6 })} {token.symbol}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
