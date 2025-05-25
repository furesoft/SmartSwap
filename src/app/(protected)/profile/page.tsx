'use client';
import { Page } from '@/components/PageLayout';
import {usePageTitle} from "@/components/PageTitleContext";
import {useEffect} from "react";
import {useSession} from "next-auth/react";

export default function Profile() {
    const session = useSession().data;

    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle("Profile");
    }, [setTitle]);

    return (
        <>
            <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
                {session.user.username}
            </Page.Main>
        </>
    );
}