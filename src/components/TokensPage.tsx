"use client";
import React, {useEffect, useState} from "react";
import {usePageTitle} from "@/components/PageTitleContext";
import {Page} from '@/components/PageLayout';
import AddTokenDrawer from '@/components/AdminAddTokenDrawer';
import AdminEditTokenDrawer from '@/components/AdminEditTokenDrawer';
import {TokenList} from '@/components/TokenList';
import {Token} from '@/models/Token';
import {TokenStore} from '@/store/tokenStore';
import { SearchField } from "@worldcoin/mini-apps-ui-kit-react";

export default function TokensPage() {
    const {setTitle, setShowBackButton} = usePageTitle();
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [editToken, setEditToken] = useState<Token|null>(null);
    const [editOpen, setEditOpen] = useState(false);

    const reloadTokens = () => {
        setLoading(true);
        const store = new TokenStore();
        store.load().then((loadedTokens) => {
            setTokens(loadedTokens);
            setLoading(false);
        }).catch(() => {
            setTokens([]);
            setLoading(false);
        });
    };

    useEffect(() => {
        setTitle("Tokens");
        setLoading(true);
        setShowBackButton(true);
        reloadTokens();
    }, [setTitle]);

    const filterFn = (token: Token) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
            token.name.toLowerCase().includes(q) ||
            token.symbol?.toLowerCase().includes(q)
        );
    };

    const handleEditToken = (token: Token) => {
        setEditToken(token);
        setEditOpen(true);
    };

    return (
        <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
            <AddTokenDrawer onTokenAdded={reloadTokens} />

            <div className="max-w-lg w-full">
                <SearchField
                    type="text"
                    label="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring"
                />
            </div>
            <div className="max-w-lg w-full">
                <TokenList
                    tokens={tokens}
                    loading={loading}
                    filter={filterFn}
                    onEditToken={handleEditToken}
                />
            </div>
            {editToken && (
                <AdminEditTokenDrawer
                    token={editToken}
                    open={editOpen}
                    onOpenChange={(open) => {
                        setEditOpen(open);
                        if (!open) setEditToken(null);
                    }}
                    onTokenUpdated={() => {
                        setEditOpen(false);
                        setEditToken(null);
                        reloadTokens();
                    }}
                />
            )}
        </Page.Main>
    );
}
