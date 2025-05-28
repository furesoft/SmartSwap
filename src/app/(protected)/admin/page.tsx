"use client";
import React, {useEffect, useState} from "react";
import {usePageTitle} from "@/components/PageTitleContext";
import { Page } from '@/components/PageLayout';
import AddTokenDrawer from '@/components/AdminAddTokenDrawer';
import { TokenList } from '@/components/TokenList';
import { Token } from '@/models/Token';
import { TokenStore } from '@/store/tokenStore';

export default function Admin() {
  const { setTitle } = usePageTitle();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle("Admin");
    setLoading(true);
    const store = new TokenStore();
    store.load().then((loadedTokens) => {
      setTokens(loadedTokens);
      setLoading(false);
    }).catch(() => {
      setTokens([]);
      setLoading(false);
    });
  }, [setTitle]);

  return (
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
          <AddTokenDrawer />
        </div>
        <div className="max-w-lg w-full">
          <TokenList tokens={tokens} loading={loading} />
        </div>
      </Page.Main>
  );
}
