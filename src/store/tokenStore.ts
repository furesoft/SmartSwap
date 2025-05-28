import {Token} from "@/models/Token";

export class TokenStore {
    async load(): Promise<Token[]> {
        const res = await fetch('/api/tokens', { method: 'GET' });

        return await res.json();
    }

    async add(token: any): Promise<any> {
        const res = await fetch(`/api/tokens/${token.contract}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });

        if (!res.ok) {
            throw new Error('Failed to add token');
        }

        return await res.json();
    }
}