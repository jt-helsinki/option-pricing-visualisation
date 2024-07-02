import { formatNumberToFixedDecimals } from '../../src/utils';

describe('Tests the outputs returned from the StringUtil.', () => {

    test('if formatNumberToFixedDecimals returns a correctly formatted string', () => {
        const numberToFormat: number = 101.994934234;
        let formattedNumber: string = formatNumberToFixedDecimals(numberToFormat, 3);
        expect(formattedNumber).toEqual('101.995');

        let formattedNumber2: string = formatNumberToFixedDecimals(numberToFormat, 1);
        expect(formattedNumber2).toEqual('102.0');
    });

});