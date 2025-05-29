'use client';
import {MiniKitProvider} from '@worldcoin/minikit-js/minikit-provider';
import {Session} from 'next-auth';
import {SessionProvider} from 'next-auth/react';
import dynamic from 'next/dynamic';
import type {ReactNode} from 'react';
import { GlobalsProvider, useGlobals } from '@/components/GlobalsContext';
import { usePathname } from 'next/navigation';

const ErudaProvider = dynamic(
    () => import('@/providers/Eruda').then((c) => c.ErudaProvider),
    {ssr: false},
);

interface ClientProvidersProps {
    children: ReactNode;
    session: Session | null; // Use the appropriate type for session from next-auth
}

function MaintenanceGate({ children, session }: { children: ReactNode, session: Session | null }) {
    const { globals } = useGlobals();
    const pathname = usePathname();
    const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS?.toLowerCase();
    const userAddress = session?.user?.id?.toLowerCase();
    const isAdmin = !!adminAddress && adminAddress === userAddress;
    const isAdminRoute = pathname.startsWith('/admin');

    if (globals.maintenanceMode) {
        if (isAdmin) {
            if (isAdminRoute) return <>{children}</>;

            return (
                <div style={{ textAlign: 'center', marginTop: '20vh', fontSize: 24 }}>
                    <b>Maintenance</b>
                    <div>SmartSwap is currently under maintenance and not available.</div>
                    <a href="/admin" style={{ display: 'inline-block', marginTop: 32, padding: '12px 24px', background: '#222', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
                        Go to Admin Area
                    </a>
                </div>
            );
        }

        return (
            <div style={{ textAlign: 'center', marginTop: '20vh', fontSize: 24 }}>
                <b>Maintenance</b>
                <div>SmartSwap is currently under maintenance and not available.</div>
            </div>
        );
    }

    return <>{children}</>;
}

/**
 * ClientProvider wraps the app with essential context providers.
 *
 * - ErudaProvider:
 *     - Should be used only in development.
 *     - Enables an in-browser console for logging and debugging.
 *
 * - MiniKitProvider:
 *     - Required for MiniKit functionality.
 *
 * - GlobalsProvider:
 *     - Provides global state for messaging functionality.
 *
 * - MaintenanceGate:
 *     - Displays a maintenance message when maintenance mode is active.
 *     - Admin can access the admin area during maintenance.
 *
 * This component ensures all providers are available to all child components.
 */
export default function ClientProviders({
                                            children,
                                            session,
                                        }: ClientProvidersProps) {
    return (
        <ErudaProvider>
            <MiniKitProvider>
                <SessionProvider session={session}>
                    <GlobalsProvider>
                        <MaintenanceGate session={session}>{children}</MaintenanceGate>
                    </GlobalsProvider>
                </SessionProvider>
            </MiniKitProvider>
        </ErudaProvider>
    );
}
