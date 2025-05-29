import { v4 as uuidv4 } from 'uuid';

export function getOnePayLink(paymentId: string, recipingAddress: string, amount: string) {
    return `https://worldcoin.org/mini-app?app_id=app_d9589ab005e18dcf362d2ea26aef669e&path=/pay?recipient=${recipingAddress}&amount=${amount}&paymentId=${paymentId}`;
}

export function openOnePay(amount: string) {
    const address = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;
    const paymentId = uuidv4();
    const url = getOnePayLink(
        paymentId,
        address,
        amount
    );
    console.log(url);

    window.open(url);
    return paymentId;
}

