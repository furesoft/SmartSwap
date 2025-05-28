"use client";
import React, { useState } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@worldcoin/mini-apps-ui-kit-react";
import { Button, Input } from "@worldcoin/mini-apps-ui-kit-react";
import { TokenStore } from "@/store/tokenStore";
import {getTokenInfoForAddress} from "@/utils/tokenHelpers";

export default function AdminAddTokenDrawer({ onTokenAdded }: { onTokenAdded?: () => void }) {
  const [address, setAddress] = useState("");
  const [token, setToken] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
      setSuccess("Token added successfully!");
      if (onTokenAdded) onTokenAdded();
      // Close the drawer after success
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer height="full" repositionInputs open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
          Add token
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-6 grow flex flex-col justify-between">
        <div>
          <DrawerHeader>
            <DrawerTitle>Add token</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 pt-4">
            <Input label="Token address" value={address} onChange={e => setAddress(e.target.value)} />
            <Button onClick={fetchTokenInfo} disabled={!address || loading} variant="primary">
              Load token info
            </Button>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {token && (
              <div className="mb-4">
                <div><b>Name:</b> {token.name}</div>
                <div><b>Symbol:</b> {token.symbol}</div>
                <div><b>Decimals:</b> {token.decimals}</div>
                <Button onClick={addToken} className="mt-3">
                  Add token
                </Button>
              </div>
            )}
            {success && <div className="text-green-600">{error}</div>}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

