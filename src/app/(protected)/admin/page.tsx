"use client";
import React, {useEffect} from "react";
import {usePageTitle} from "@/components/PageTitleContext";
import {Page} from '@/components/PageLayout';
import {Button} from "@worldcoin/mini-apps-ui-kit-react";
import {useRouter} from "next/navigation";
import SetMessageDrawer from "@/components/SetMessageDrawer";

export default function Admin() {
    const {setTitle} = usePageTitle();
    const router = useRouter();

    useEffect(() => {
        setTitle("Admin");
    }, [setTitle]);

    function navigate(path: string) {
        router.push(`/admin/${path}`);
        return undefined;
    }

    return (
        <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
                <SetMessageDrawer />
                <Button variant="secondary" onClick={() => navigate("tokens")}>Tokens</Button>
            </div>
        </Page.Main>
    );
}
