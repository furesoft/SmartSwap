"use client";

import {Page} from '@/components/PageLayout';
import React, {useEffect} from 'react';
import {usePageTitle} from "@/components/PageTitleContext";
import {useGlobals} from "@/components/GlobalsContext";
import DonateButton from "@/components/DonateDrawerButton";

export default function Home() {
    const {setTitle} = usePageTitle();
    const {globals} = useGlobals();

    useEffect(() => {
        setTitle("Home");
    }, [setTitle]);

    return (
        <>
            <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
                {globals.message && (
                    <div className="w-full max-w-lg bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 shadow text-left text-lg font-small">
                        {globals.message}
                    </div>
                )}

                hello world
            </Page.Main>
        </>
    );
}
