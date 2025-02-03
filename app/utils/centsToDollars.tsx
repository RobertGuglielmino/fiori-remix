
export default function centsToDollars(amount: number) {
    let unit: number = amount;
    const cents: number = (unit % 100);
    const dollars: number = ((unit - cents) / 100);
    const centsDisplay: string | number = cents < 10 ? "0" + cents : cents;

    return "$" + dollars + "." + centsDisplay;
};
