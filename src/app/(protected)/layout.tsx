'use client';
import { Navigation } from '@/components/Navigation';
import { Page } from '@/components/PageLayout';
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import ProfileButton from '@/components/ProfileButton';
import { PageTitleProvider, usePageTitle } from '@/components/PageTitleContext';
import {useSession} from "next-auth/react";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTitleProvider>
      <InnerTabsLayout>{children}</InnerTabsLayout>
    </PageTitleProvider>
  );
}

function InnerTabsLayout({ children }: { children: React.ReactNode }) {
  const { title } = usePageTitle();
  const { data } = useSession();

  return (
    <Page>
      <Page.Header className="p-0">
        <TopBar
          title={title}
          endAdornment={
            <ProfileButton username={data?.user?.username} profilePictureUrl={data?.user?.profilePictureUrl} />
          }
        />
      </Page.Header>

      {children}

      <Page.Footer className="px-0 fixed bottom-0 w-full bg-white">
        <Navigation />
      </Page.Footer>
    </Page>
  );
}
