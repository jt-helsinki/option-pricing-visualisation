export function formatNumberToFixedDecimals(numberToFix: number, fractionDigits: number): string {
    const tenToThePower: number = Math.pow(10, fractionDigits);
    return (Math.round(numberToFix * tenToThePower) / tenToThePower).toFixed(fractionDigits);
}