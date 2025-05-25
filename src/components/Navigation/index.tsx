'use client';

import { TabItem, Tabs } from '@worldcoin/mini-apps-ui-kit-react';
import { Bank, Home, User } from 'iconoir-react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * This component uses the UI Kit to navigate between pages
 * Bottom navigation is the most common navigation pattern in Mini Apps
 * We require mobile first design patterns for mini apps
 * Read More: https://docs.world.org/mini-apps/design/app-guidelines#mobile-first
 */

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Mapping von Pfad zu Tab-Wert
  const pathToTab = (path: string) => {
    if (path.startsWith('/wallet')) return 'wallet';
    if (path.startsWith('/profile')) return 'profile';
    return 'home';
  };

  const value = pathToTab(pathname);

  const handleTabChange = (val: string) => {
    router.push('/' + val);
  };

  return (
    <Tabs value={value} onValueChange={handleTabChange}>
      <TabItem value="home" icon={<Home />} label="Home" />
      <TabItem value="wallet" icon={<Bank />} label="Wallet" />
      <TabItem value="profile" icon={<User />} label="Profile" />
    </Tabs>
  );
};
