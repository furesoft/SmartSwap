"use client";
import {Marble} from "@worldcoin/mini-apps-ui-kit-react";
import {useRouter} from "next/navigation";

export default function ProfileButton({username, profilePictureUrl}: { username: string, profilePictureUrl?: string }) {
    const router = useRouter();
    return (
        <div className="flex items-center gap-2" onClick={() => router.push('/profile')}>
            <p className="text-sm font-semibold capitalize">{username}</p>
            <Marble src={profilePictureUrl} className="w-12"/>
        </div>
    );
}

