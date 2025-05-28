import { NextRequest, NextResponse } from 'next/server';
import * as blob from '@vercel/blob';

const BLOB_PATH = 'global-message.txt';

export async function GET() {
    try {
        const head = await blob.head(BLOB_PATH);
        if (!head?.url) return NextResponse.json({ message: null });
        const text = await fetch(head.url).then(r => r.text());
        return NextResponse.json({ message: text });
    } catch (e) {
        return NextResponse.json({ message: null }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();
        if (!message) {
            await blob.del(BLOB_PATH);
            return NextResponse.json({ success: true });
        }

        await blob.put(BLOB_PATH, message, {
            access: 'public',
            allowOverwrite: true
        });
        return NextResponse.json({ success: true });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

