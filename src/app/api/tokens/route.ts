import { NextRequest, NextResponse } from 'next/server';
import * as blob from '@vercel/blob';
import { getTokenInfoForAddress } from "@/utils/tokenHelpers";

const BLOB_PATH = 'tokens/info.json';

export async function GET(request: NextRequest) {
  try {
    const tokens = await GetFromBlob(BLOB_PATH);
    console.log(tokens);
    return NextResponse.json(tokens);
  } catch (e) {
    console.log(e);
    return NextResponse.json([], { status: 500 });
  }
}

async function GetFromBlob(path: string) {
  try {
    let url = await blob.head(path);
    const res = await fetch(url.url);

    return res.json();
  } catch (e) {
    console.log(e);
    return NextResponse.json([], { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    if (!address) return NextResponse.json({ error: 'Address missing' }, { status: 400 });

    const token = await getTokenInfoForAddress(address);
    let tokens = await GetFromBlob(BLOB_PATH);

    if (!tokens.find((t: any) => t.contract.toLowerCase() === address.toLowerCase())) {
      console.log("Adding token:", token);
      tokens.push(token);
      await blob.put(BLOB_PATH, JSON.stringify(tokens), { contentType: 'application/json', access: 'public', allowOverwrite: true });
    }

    console.log("Token already exists or added:", token);
    return NextResponse.json(token, { status: 500 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Error adding token' }, { status: 500 });
  }
}
