'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import {Bank, Home, User, UserCrown} from 'iconoir-react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useSession();

  const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS?.toLowerCase();
  const userAddress = data?.user?.id?.toLowerCase();

  const pathToTab = (path: string) => {
    if (path.startsWith('/wallet')) return 'wallet';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/admin')) return 'admin';
    return 'home';
  };

  const value = pathToTab(pathname);

  const handleTabChange = (val: string) => {
    console.log("Navigating to:", val);
    router.push('/' + val);
  };

  return (
    <Tabs value={value} onValueChange={handleTabChange}>
      <TabItem value="home" icon={<Home />} label="Home" />
      <TabItem value="wallet" icon={<Bank />} label="Wallet" />
      {(userAddress && adminAddress && adminAddress === userAddress) && (
        <TabItem value="admin" icon={<UserCrown />} label="Admin" />
      )}
    </Tabs>
  );
};
