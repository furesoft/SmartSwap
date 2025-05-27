export class Token {
    balance: number;
    name: string;
    symbol: string;
    decimals: number;
    claim: boolean;

    constructor(balance: number, name: string, symbol: string, decimals: number, claim: boolean) {
        this.balance = balance;
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        this.claim = claim;
    }
}
