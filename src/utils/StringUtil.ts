export function capitaliseFirstLetter(stringToCapitalise: string): string {
    var firstLetter = stringToCapitalise[0] || stringToCapitalise.charAt(0);
    return firstLetter ? firstLetter.toUpperCase() + stringToCapitalise.slice(1) : '';
}