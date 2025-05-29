import {NextRequest, NextResponse} from 'next/server';
import * as blob from '@vercel/blob';
import {getTokenInfoForAddress} from "@/utils/tokenHelpers";
import {Token} from "@/models/Token";

const BLOB_PATH = 'tokens/info.json';

export async function GET(request: NextRequest) {
    try {
        const tokens = await GetFromBlob(BLOB_PATH);
        console.log(tokens);
        return NextResponse.json(tokens);
    } catch (e) {
        console.log(e);
        return NextResponse.json([], {status: 500});
    }
}

async function GetFromBlob(path: string): Promise<Token[]> {
    try {
        let url = await blob.head(path);
        const res = await fetch(url.url);

        return res.json();
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function POST(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        const address = searchParams.get('address');
        if (!address) return NextResponse.json({error: 'Address missing'}, {status: 400});

        const token = await getTokenInfoForAddress(address);
        let tokens = await GetFromBlob(BLOB_PATH);

        if (!tokens.find((t: Token) => t.contract.toLowerCase() === token.contract.toLowerCase())) {
            tokens.push(token);

            await blob.put(BLOB_PATH, JSON.stringify(tokens), {
                contentType: 'application/json',
                access: 'public',
                allowOverwrite: true
            });

            return NextResponse.json(token, {status: 200});
        }

        console.log("Token already exists or added:", token);
        return NextResponse.json(token, {status: 500});
    } catch (e) {
        console.log(e);
        return NextResponse.json({error: 'Error adding token'}, {status: 500});
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        if (!body.contract) {
            return NextResponse.json({error: 'Contract address missing'}, {status: 400});
        }
        let tokens = await GetFromBlob(BLOB_PATH);
        const idx = tokens.findIndex((t: any) => t.contract.toLowerCase() === body.contract.toLowerCase());
        if (idx === -1) {
            return NextResponse.json({error: 'Token not found'}, {status: 404});
        }

        tokens[idx] = {
            ...tokens[idx],
            name: body.name,
            symbol: body.symbol,
            iconUrl: body.iconUrl,
            verified: body.verified
        };
        await blob.put(BLOB_PATH, JSON.stringify(tokens), {
            contentType: 'application/json',
            access: 'public',
            allowOverwrite: true
        });
        return NextResponse.json(tokens[idx]);
    } catch (e) {
        console.log(e);
        return NextResponse.json({error: 'Error updating token'}, {status: 500});
    }
}

