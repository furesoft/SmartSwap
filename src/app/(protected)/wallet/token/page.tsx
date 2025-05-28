"use client"

import {usePageTitle} from "@/components/PageTitleContext";
import {useEffect} from "react";
import {useToken} from '@/components/TokenContext';

export default function TokenPage() {
    const {token} = useToken();
    const {setTitle, setShowBackButton} = usePageTitle();

    useEffect(() => {
        if (token) setTitle(token.symbol);
        setShowBackButton(true);
    }, [setTitle, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-2xl font-bold mb-4">Token Info</h1>
            {token ? (
                <>
                    <p>Symbol: <span className="font-mono">{token.symbol}</span></p>
                    <p>Name: <span className="font-mono">{token.name}</span></p>
                    <p>Dezimalstellen: <span className="font-mono">{token.decimals}</span></p>
                </>
            ) : (
                <p>Kein Token-Objekt übergeben.</p>
            )}
        </div>
    );
}
