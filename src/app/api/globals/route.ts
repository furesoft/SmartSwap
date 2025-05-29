import { NextRequest, NextResponse } from 'next/server';
import * as blob from '@vercel/blob';

const BLOB_PATH = 'globals.json';

export async function GET() {
    try {
        const head = await blob.head(BLOB_PATH);
        if (!head?.url) return NextResponse.json({});
        const text = await fetch(head.url).then(r => r.json());
        return NextResponse.json(text);
    } catch (e) {
        return NextResponse.json({}, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const obj = await request.text();

        await blob.put(BLOB_PATH, obj, {
            access: 'public',
            allowOverwrite: true
        });
        return NextResponse.json({ success: true });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

