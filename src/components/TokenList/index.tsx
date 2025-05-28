'use client';

import {useSession} from 'next-auth/react';
import {useEffect, useState} from "react";
import {BigNumberish, ethers} from "ethers";
import {worldchain} from 'viem/chains';
import {Token} from "@/models/Token";
import {useRouter} from "next/navigation";
import {useToken} from "@/components/TokenContext";
import {Skeleton} from "@worldcoin/mini-apps-ui-kit-react";
import {TokenStore} from "@/store/tokenStore";

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
    let store = new TokenStore();

    const fetchTokens = async () => {
      setLoading(true);
      try {
        const loadedTokens = await store.load();
        const provider = new ethers.JsonRpcProvider(worldchain.rpcUrls.default.http[0]);
        let tokens = await Promise.all(loadedTokens.map(async (token: Token) => {
          const contract = new ethers.Contract(
              token.contract,
              ERC20_ABI,
              provider
          );
          const balance: BigNumberish = await contract.balanceOf(walletAddress);

          return {
            ...token,
            balance: parseFloat(balance.toString()),
            claim: true,
          };
        }));

        console.log("tokens: ", tokens);
        setTokens(tokens);
        sessionStorage.setItem(sessionKey, JSON.stringify(tokens));
      }
      catch (e) {
        console.log(e);
        setTokens([]);
      }
      setLoading(false);
    };
    fetchTokens().then(r => console.log(r));
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
          <Skeleton height={50} />
        </div>
        }

        {!loading && tokens.length === 0 && <span>No Tokens found</span>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {tokens.map((token) => (
            <li
              key={token.name}
              onClick={() => openToken(token)}
              className="cursor-pointer border rounded-lg p-3 shadow-sm hover:bg-gray-50 transition flex flex-col gap-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{token.name}</span>
                {token.verified && <img src="/verified.png" alt="verified" style={{height: 20}} />}
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

