"use client";

import { Page } from '@/components/PageLayout';
import { useEffect } from 'react';
import {usePageTitle} from "@/components/PageTitleContext";

export default function Home() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

    return (
    <>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
          hello world
      </Page.Main>
    </>
  );
}
