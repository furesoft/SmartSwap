"use client";

import {Page} from '@/components/PageLayout';
import {useEffect} from 'react';
import {usePageTitle} from "@/components/PageTitleContext";
import {useMessage} from "@/components/MessageContext";

export default function Home() {
    const {setTitle} = usePageTitle();
    const {message} = useMessage();

    useEffect(() => {
        setTitle("Home");
    }, [setTitle]);

    return (
        <>
            <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
                {message && (
                    <div className="w-full max-w-lg bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 shadow text-left text-lg font-small">
                        {message}
                    </div>
                )}
                hello world
            </Page.Main>
        </>
    );
}
