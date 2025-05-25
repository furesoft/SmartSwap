import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';
import {UserInfo} from "@/components/UserInfo";

export default async function Wallet() {
  const session = await auth();

    return (
    <>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
        <UserInfo />
      </Page.Main>
    </>
  );
}
