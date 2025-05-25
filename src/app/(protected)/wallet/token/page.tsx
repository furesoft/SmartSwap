"use client"

import { useSearchParams } from "next/navigation";
import {usePageTitle} from "@/components/PageTitleContext";
import {useEffect} from "react";

export default function TokenPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle(token);
    }, [setTitle]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-2xl font-bold mb-4">Token Info</h1>
            {token ? (
                <p>Token Parameter: <span className="font-mono">{token}</span></p>
            ) : (
                <p>Kein Token-Parameter übergeben.</p>
            )}
        </div>
    );
}