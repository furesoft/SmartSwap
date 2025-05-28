"use client";
import React, {useEffect, useState} from "react";
import {usePageTitle} from "@/components/PageTitleContext";
import { Page } from '@/components/PageLayout';
import AddTokenDrawer from '@/components/AdminAddTokenDrawer';

export default function Admin() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Admin");
  }, [setTitle]);

  return (
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
          <AddTokenDrawer />
        </div>
      </Page.Main>
  );
}

