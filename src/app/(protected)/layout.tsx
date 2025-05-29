'use client';
import {Navigation} from '@/components/Navigation';
import {Page} from '@/components/PageLayout';
import {TopBar} from "@worldcoin/mini-apps-ui-kit-react";
import ProfileButton from '@/components/ProfileButton';
import {PageTitleProvider, usePageTitle} from '@/components/PageTitleContext';
import {useSession} from "next-auth/react";
import {useRouter} from 'next/navigation';
import {TokenProvider} from '@/components/TokenContext';
import {ArrowLeft} from "iconoir-react";
import DonateButton from "@/components/DonateDrawerButton";
import React from "react";

export default function TabsLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <TokenProvider>
            <PageTitleProvider>
                <InnerTabsLayout>{children}</InnerTabsLayout>
            </PageTitleProvider>
        </TokenProvider>
    );
}

function InnerTabsLayout({children}: { children: React.ReactNode }) {
    const {title, showBackButton, setShowBackButton} = usePageTitle();
    const {data} = useSession();
    const router = useRouter();

    return (
        <Page>
            <Page.Header className="p-0">
                <TopBar
                    title={title}
                    startAdornment={
                        showBackButton ? (
                            <button
                                onClick={() => {
                                    setShowBackButton(false);
                                    router.back();
                                }}
                            >
                                <ArrowLeft/>
                            </button>
                        ) : null
                    }
                    endAdornment={
                        <div className="flex flex-row items-center gap-2">
                            <ProfileButton username={data?.user?.username} profilePictureUrl={data?.user?.profilePictureUrl}/>
                            <DonateButton />
                        </div>
                    }
                />
            </Page.Header>

            {children}

            <Page.Footer className="px-0 fixed bottom-0 w-full bg-white">
                <Navigation/>
            </Page.Footer>
        </Page>
    );
}
