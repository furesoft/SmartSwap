"use client";

import { Page } from '@/components/PageLayout';
import {TokenList} from "@/components/TokenList";
import {usePageTitle} from "@/components/PageTitleContext";
import {useEffect} from "react";

export default function Wallet() {
    const { setTitle } = usePageTitle();

    useEffect(() => {
        setTitle("Wallet");
    }, [setTitle]);

    return (
    <>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
        <TokenList />
      </Page.Main>
    </>
  );
}
