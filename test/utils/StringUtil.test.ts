import { capitaliseFirstLetter } from '../../src/utils';

describe('Tests the outputs returned from the NumberUtil.', () => {

    test('if formatNumberToFixedDecimals returns a correctly formatted string', () => {
        const stringToFormat: string = 'someString';
        let formattedString: string = capitaliseFirstLetter(stringToFormat);
        expect(stringToFormat).toEqual('someString');
        expect(formattedString).toEqual('SomeString');


    });

});