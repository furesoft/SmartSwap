'use client';
import { Navigation } from '@/components/Navigation';
import { Page } from '@/components/PageLayout';
import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import ProfileButton from '@/components/ProfileButton';
import { PageTitleProvider, usePageTitle } from '@/components/PageTitleContext';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { TokenProvider } from '@/components/TokenContext';

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

function InnerTabsLayout({ children }: { children: React.ReactNode }) {
  const { title, showBackButton } = usePageTitle();
  const { data } = useSession();
  const router = useRouter();

  return (
    <Page>
      <Page.Header className="p-0">
        <TopBar
          title={title}
          startAdornment={
            showBackButton ? (
              <button onClick={() => router.back()} style={{ marginRight: 8 }}>
                ←
              </button>
            ) : null
          }
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
