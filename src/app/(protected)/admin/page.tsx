"use client";
import React, {useEffect, useState} from "react";
import { TokenStore } from "@/store/tokenStore";
import { getTokenInfoForAddress } from "@/utils/tokenHelpers";
import {usePageTitle} from "@/components/PageTitleContext";
import { Page } from '@/components/PageLayout';
import {Button} from "@worldcoin/mini-apps-ui-kit-react";

export default function Admin() {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Admin");
  }, [setTitle]);

  const fetchTokenInfo = async () => {
    setError(null);
    setSuccess(null);
    setToken(null);
    setLoading(true);

    try {
      const data = await getTokenInfoForAddress(address);
      setToken(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const addToken = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const store = new TokenStore();
      await store.add(token);
      setSuccess("Token added!");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Token</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Contract Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <Button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={fetchTokenInfo}
          disabled={!address || loading}
        >
          Load Token Info
        </Button>
      </div>
      {loading && <div>Lade...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {token && (
        <div className="mb-4 border p-3 rounded bg-gray-50">
          <div><b>Name:</b> {token.name}</div>
          <div><b>Symbol:</b> {token.symbol}</div>
          <div><b>Decimals:</b> {token.decimals}</div>
          <div><b>Address:</b> {token.contract}</div>
          <Button
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
            onClick={addToken}
          >
            Add Token
          </Button>
        </div>
      )}
      {success && <div className="text-green-600">{success}</div>}
    </div>
      </Page.Main>
  );
}

