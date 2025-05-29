"use client";
import React, {useState} from "react";
import {
  BottomBar,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Switch
} from "@worldcoin/mini-apps-ui-kit-react";
import {TokenStore} from "@/store/tokenStore";
import {getTokenInfoForAddress} from "@/utils/tokenHelpers";

export default function AdminAddTokenDrawer({onTokenAdded}: { onTokenAdded?: () => void }) {
    const [address, setAddress] = useState("");
    const [token, setToken] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [verified, setVerified] = useState(false);
    const [feedbackState, setFeedbackState] = useState<'pending' | 'success' | 'failed' | undefined>();

    const handleDrawerOpen = (open: boolean) => {
        setOpen(open);
        if (open) {
            setAddress("");
            setToken(null);
            setError(null);
            setSuccess(null);
            setLoading(false);
            setVerified(false);
            setFeedbackState(undefined);
        }
    };

    const addToken = async () => {
        setError(null);
        setSuccess(null);
        setLoading(true);
        setFeedbackState('pending');
        try {
            const store = new TokenStore();
            await store.add({...token, verified});
            setSuccess("Token added successfully!");
            setFeedbackState('success');
            if (onTokenAdded) onTokenAdded();
            setTimeout(() => {
                setOpen(false);
                setFeedbackState(undefined);
            }, 500);
        } catch (e: any) {
            setError(e.message);
            setFeedbackState('failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer repositionInputs open={open} onOpenChange={handleDrawerOpen} height="fit">
            <DrawerTrigger asChild>
                <Button variant="secondary" size="sm" onClick={() => handleDrawerOpen(true)}>
                    Add token
                </Button>
            </DrawerTrigger>

            <DrawerContent className="p-6 m-5">
                <div>
                    <DrawerHeader>
                        <DrawerTitle>Add token</DrawerTitle>
                    </DrawerHeader>

                    <div className="flex flex-col gap-4 pt-4">
                        <Input label="Token address" value={address} onChange={async e => {
                            setAddress(e.target.value);
                            setError(null);
                            setSuccess(null);
                            setToken(null);
                            if (e.target.value) {
                                try {
                                    const data = await getTokenInfoForAddress(e.target.value);
                                    setToken(data);
                                    setVerified(false);
                                } catch (e: any) {
                                    setError(e.message);
                                } finally {
                                    setLoading(false);
                                }
                            }
                        }}/>
                        {error && <div className="text-red-600 mb-2">{error}</div>}
                        {(
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div><b>Name:</b> {token && token.name}</div>
                                    <div className="flex items-center gap-2">
                                        <Switch checked={verified} onChange={setVerified}/>
                                        <span>Verified</span>
                                    </div>
                                </div>
                                <div><b>Symbol:</b> {token && token.symbol}</div>
                                <div><b>Decimals:</b> {token && token.decimals}</div>
                            </div>
                        )}
                        {success && <div className="text-green-600">{error}</div>}
                    </div>
                </div>

                <BottomBar>
                    <Button onClick={() => handleDrawerOpen(false)} variant="secondary" fullWidth>Cancel</Button>
                    <Button onClick={addToken} fullWidth>Add</Button>
                </BottomBar>
            </DrawerContent>
        </Drawer>
    );
}

