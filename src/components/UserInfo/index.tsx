'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { worldchain } from 'viem/chains';
import KNOWN_TOKENS from '../../tokens.json';
import {Token} from "@/models/Token";
import {openUno} from "@/Uno";
import {Button} from "@worldcoin/mini-apps-ui-kit-react";

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

  useEffect(() => {
    const fetchTokens = async () => {
      if (!walletAddress) return;
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
        setTokens(balances);
      }
      catch (e) {
        console.log(e);
        setTokens([]);
      }
      setLoading(false);
    };
    fetchTokens().then(r => console.log());
  }, [walletAddress]);

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
              key={token.name}
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
      <Button onClick={swap()}>swap</Button>
    </div>
  );

  function swap() {
    const fromToken = tokens[0]?.symbol;
    const toToken = tokens[1]?.symbol;
    const amount = (tokens[0]?.balance / 10 ** tokens[0]?.decimals).toString();

    openUno(fromToken, toToken, amount);

    return undefined;
  }
};