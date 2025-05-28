import {Token} from "@/models/Token";

export class TokenStore {
    async load(): Promise<Token[]> {
        const res = await fetch('/api/tokens', { method: 'GET' });

        return await res.json();
    }

    async add(token: Token): Promise<any> {
        const url = new URL('/api/tokens', window.location.origin);
        url.searchParams.set('address', token.contract);
        const res = await fetch(url.toString(), {
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
