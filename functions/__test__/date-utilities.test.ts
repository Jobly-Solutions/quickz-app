import { DateTime } from 'luxon';
import { getMatchEnd } from '../date-utilities';

describe('test getMatchEnd', () => {
    const nowPlusedPositive = DateTime.now()
        .plus({ days: 1 })
        .toSeconds();
    const nowPlusedNegative = DateTime.now()
        .plus({ days: -1 })
        .toSeconds();
    const sFalse = getMatchEnd(nowPlusedPositive);

    const sTrue = getMatchEnd(nowPlusedNegative);

    test('should return false', () => {
        expect(sFalse).toBeFalsy();
    });
    test('should return true', () => {
        expect(sTrue).toBeTruthy();
    });
});
