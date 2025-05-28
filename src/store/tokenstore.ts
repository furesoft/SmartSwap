import * as blob from '@vercel/blob';
import {Token} from "@/models/Token";

export class TokenStore {
    tokens: Token[] = [];
    async init() {
        const list = await blob.list();
        const exists = list.blobs.some(b => b.pathname === 'tokens.json');
        if (exists) return;

        const data = JSON.stringify(this.tokens);
        await blob.put('tokens/info.json', data, {contentType: "application/json", access: "public"});
    }
}