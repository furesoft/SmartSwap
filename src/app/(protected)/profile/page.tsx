import { auth } from '@/auth';
import { Page } from '@/components/PageLayout';

export default async function Profile() {
    const session = await auth();

    return (
        <>
            <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16 bg-white">
                {session.user.username}
            </Page.Main>
        </>
    );
}