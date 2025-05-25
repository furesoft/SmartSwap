'use client';
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    function redirectToHome() {
        router.push('/home');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-4xl font-bold mb-4">Page not found</h1>
            <p className="text-lg mb-8">The requested page does not exist or has been moved.</p>
            <Button
                onClick={redirectToHome}
                className="text-blue-600 underline px-4 py-2 border border-blue-600 rounded hover:bg-blue-50 transition"
            >
                Back to homepage
            </Button>
        </div>
    );
}

