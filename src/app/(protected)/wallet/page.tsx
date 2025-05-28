"use client";

import { Page } from '@/components/PageLayout';
import { TokenList } from "@/components/TokenList";
import { usePageTitle } from "@/components/PageTitleContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToken } from "@/components/TokenContext";
import { Token } from "@/models/Token";
import { TokenStore } from "@/store/tokenStore";
import { useSession } from "next-auth/react";
import { ethers } from "ethers";
import { worldchain } from 'viem/chains';

export default function Wallet() {
    const { setTitle } = usePageTitle();
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(false);
    const { setToken } = useToken();
    const router = useRouter();
    const session = useSession();
    const walletAddress = session?.data?.user?.id;

    useEffect(() => {
        setTitle("Wallet");
        if (!walletAddress) return;
        setLoading(true);
        const sessionKey = `tokens_${walletAddress}`;
        const cached = sessionStorage.getItem(sessionKey);
        if (cached) {
            setTokens(JSON.parse(cached));
            setLoading(false);
            return;
        }
        const store = new TokenStore();
        const ERC20_ABI = [
            "function balanceOf(address) view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function symbol() view returns (string)",
            "function name() view returns (string)",
        ];
        const fetchTokens = async () => {
            try {
                const loadedTokens = await store.load();
                const provider = new ethers.JsonRpcProvider(worldchain.rpcUrls.default.http[0]);
                let tokensWithBalance = await Promise.all(loadedTokens.map(async (token: Token) => {
                    const contract = new ethers.Contract(token.contract, ERC20_ABI, provider);
                    const balance = await contract.balanceOf(walletAddress);
                    return {
                        ...token,
                        balance: parseFloat(balance.toString()),
                        claim: true,
                    };
                }));
                setTokens(tokensWithBalance);
                sessionStorage.setItem(sessionKey, JSON.stringify(tokensWithBalance));
            } catch (e) {
                setTokens([]);
            }
            setLoading(false);
        };
        fetchTokens();
    }, [setTitle, walletAddress]);

    function handleTokenClick(token: Token) {
        setToken(token);
        router.push("/wallet/token");
    }

    return (
    <>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
        <TokenList tokens={tokens} loading={loading} onTokenClick={handleTokenClick} />
      </Page.Main>
    </>
  );
}
