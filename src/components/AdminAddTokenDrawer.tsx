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
  LiveFeedback,
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
    const [loadFeedbackState, setLoadFeedbackState] = useState<'pending' | 'success' | 'failed' | undefined>();

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
            setLoadFeedbackState(undefined);
        }
    };

    const fetchTokenInfo = async () => {
        setError(null);
        setSuccess(null);
        setToken(null);
        setLoading(true);
        setLoadFeedbackState('pending');
        try {
            const data = await getTokenInfoForAddress(address);
            setToken(data);
            setVerified(false);
            setLoadFeedbackState('success');
        } catch (e: any) {
            setError(e.message);
            setLoadFeedbackState('failed');
        } finally {
            setLoading(false);
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
            <DrawerContent className="p-6 grow flex flex-col justify-between">
                <div>
                    <DrawerHeader>
                        <DrawerTitle>Add token</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 pt-4">
                        <Input label="Token address" value={address} onChange={e => {
                            setAddress(e.target.value);
                            setLoadFeedbackState(undefined);
                        }}/>
                        <LiveFeedback
                            className="w-full"
                            label={{
                                failed: 'Failed',
                                pending: 'Pending',
                                success: 'Success'
                            }}
                            state={loadFeedbackState}
                        >
                            <Button onClick={fetchTokenInfo} disabled={!address || loading} variant="primary">
                                Load token info
                            </Button>
                        </LiveFeedback>
                        {error && <div className="text-red-600 mb-2">{error}</div>}
                        {token && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between">
                                    <div><b>Name:</b> {token.name}</div>
                                    <div className="flex items-center gap-2">
                                        <Switch checked={verified} onChange={setVerified}/>
                                        <span>Verified</span>
                                    </div>
                                </div>
                                <div><b>Symbol:</b> {token.symbol}</div>
                                <div><b>Decimals:</b> {token.decimals}</div>
                            </div>
                        )}
                        {success && <div className="text-green-600">{error}</div>}
                    </div>
                </div>
                <BottomBar direction="horizontal">
                    <React.Fragment key=".0">
                        <LiveFeedback
                            className="w-full"
                            state={feedbackState}
                        >
                            <Button fullWidth variant="secondary" onClick={() => handleDrawerOpen(false)}
                                    disabled={loading}>
                                Cancel
                            </Button>

                            <Button onClick={addToken} className="mt-3 w-full" variant="primary" fullWidth>
                                Add token
                            </Button>
                        </LiveFeedback>
                    </React.Fragment>
                </BottomBar>
            </DrawerContent>
        </Drawer>
    );
}

