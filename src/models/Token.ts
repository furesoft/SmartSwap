export class Token {
    balance: number;
    name: string;
    symbol: string;
    decimals: number;

    constructor(balance: number, name: string, symbol: string, decimals: number) {
        this.balance = balance;
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
    }
}