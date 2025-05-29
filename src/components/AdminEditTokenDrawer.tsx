"use client";
import React, { useState, useEffect } from "react";
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
import { Token } from "@/models/Token";

export default function AdminEditTokenDrawer({ token, onTokenUpdated, open, onOpenChange }: { token: Token, onTokenUpdated?: () => void, open: boolean, onOpenChange: (open: boolean) => void }) {
    const [form, setForm] = useState<Token>(token);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [feedbackState, setFeedbackState] = useState<'pending' | 'success' | 'failed' | undefined>();

    useEffect(() => {
        setForm(token);
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitch = (checked: boolean) => {
        setForm(prev => ({ ...prev, verified: checked }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        setFeedbackState('pending');

        try {
            const res = await fetch(`/api/tokens`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error('Error');
            setSuccess('Token changed!');
            setFeedbackState('success');
            onTokenUpdated?.();
            onOpenChange(false);
        } catch (e: any) {
            setError(e.message);
            setFeedbackState('failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange} height="fit">
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Edit Token</DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-4 p-4">
                    <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                    <Input label="Symbol" name="symbol" value={form.symbol} onChange={handleChange} />
                    <Input label="Icon URL" name="iconUrl" value={form.iconUrl || ''} onChange={handleChange} />
                    <div className="flex items-center justify-between gap-2">
                        <label htmlFor="verified-switch" className="text-sm">Verified</label>
                        <Switch checked={!!form.verified} onChange={handleSwitch} id="verified-switch" />
                    </div>
                    {error && <LiveFeedback state="failed">{error}</LiveFeedback>}
                    {success && <LiveFeedback state="success">{success}</LiveFeedback>}
                </div>

                <BottomBar>
                    <Button onClick={handleSubmit} fullWidth>Save</Button>
                    <Button onClick={() => onOpenChange(false)} variant="secondary" fullWidth>Cancel</Button>
                </BottomBar>
            </DrawerContent>
        </Drawer>
    );
}