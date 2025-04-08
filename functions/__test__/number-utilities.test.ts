import {
    getCompliance,
    isExpired,
    getIsExpireds,
    getTotalBalance,
    balanceIsEnough,
    getBalancesValue,
} from '../number-utilities';

import { DateTime } from 'luxon';

describe('test getCompliance', () => {
    test('cuando los dos datos son indefinidos retorna 100?', () => {
        expect(getCompliance({})).toEqual(100);
    });
    test('si uno de los numeros es indefinido igual funciona?', () => {
        expect(getCompliance({ numberOfPairings: 10 })).toEqual(0);
    });
    test('retorna correctamente los porcentajes?', () => {
        expect(
            getCompliance({
                numberOfPairings: 10,
                pairingsCompleted: 1,
            })
        ).toEqual(10);
        expect(
            getCompliance({
                numberOfPairings: 10,
                pairingsCompleted: 5,
            })
        ).toEqual(50);
        expect(
            getCompliance({
                numberOfPairings: 50,
                pairingsCompleted: 25,
            })
        ).toEqual(50);
    });
});

describe('testing isExprired function', () => {
    test('al enviar una fecha que ya paso (retorna false?)', () => {
        expect(
            isExpired(
                DateTime.now().plus({ seconds: -5 }).toSeconds()
            )
        ).toBeTruthy();
        expect(
            isExpired(
                DateTime.now().plus({ minutes: -5 }).toSeconds()
            )
        ).toBeTruthy();
        expect(
            isExpired(DateTime.now().plus({ hours: -1 }).toSeconds())
        ).toBeTruthy();
        expect(
            isExpired(DateTime.now().plus({ day: -3 }).toSeconds())
        ).toBeTruthy();
        expect(
            isExpired(
                DateTime.now().plus({ years: -10 }).toSeconds()
            )
        ).toBeTruthy();
    });
    test('al enviar una fecha que aun no paso (retorna true?)', () => {
        expect(
            isExpired(
                DateTime.now().plus({ seconds: 5 }).toSeconds()
            )
        ).toBeFalsy();
        expect(
            isExpired(
                DateTime.now().plus({ minutes: 5 }).toSeconds()
            )
        ).toBeFalsy();
        expect(
            isExpired(DateTime.now().plus({ hours: 1 }).toSeconds())
        ).toBeFalsy();
        expect(
            isExpired(DateTime.now().plus({ day: 3 }).toSeconds())
        ).toBeFalsy();
        expect(
            isExpired(DateTime.now().plus({ years: 10 }).toSeconds())
        ).toBeFalsy();
    });
});

describe('testing getIsExpireds function', () => {
    test('al enviar una fecha que ya paso (retorna false?)', () => {
        const a = getIsExpireds({
            paid: DateTime.now().plus({ days: -1 }).toSeconds(),
            collaborate: DateTime.now()
                .plus({ years: -1 })
                .toSeconds(),
            promotional: DateTime.now()
                .plus({ seconds: -5 })
                .toSeconds(),
        });
        expect(a.paid).toBeTruthy();
        expect(a.collaborate).toBeTruthy();
        expect(a.promotional).toBeTruthy();
    });
    test('al enviar una fecha que no paso (retorna true?)', () => {
        const b = getIsExpireds({
            paid: DateTime.now().plus({ days: 1 }).toSeconds(),
            collaborate: DateTime.now()
                .plus({ years: 1 })
                .toSeconds(),
            promotional: DateTime.now()
                .plus({ seconds: 5 })
                .toSeconds(),
        });
        expect(b.paid).toBeFalsy();
        expect(b.collaborate).toBeFalsy();
        expect(b.promotional).toBeFalsy();
    });
});

describe('testing function getTotalBalance', () => {
    const a = getTotalBalance({
        balances: {
            paid: 100,
            collaborate: 100,
            promotional: 100,
        },
        expired_dates: {
            paid: DateTime.now().plus({ days: 5 }).toSeconds(),
            collaborate: DateTime.now()
                .plus({ days: -5 })
                .toSeconds(),
            promotional: DateTime.now()
                .plus({ days: -5 })
                .toSeconds(),
        },
    });
    const b = getTotalBalance({
        balances: {
            paid: 100,
            collaborate: 100,
            promotional: 100,
        },
        expired_dates: {
            paid: DateTime.now().plus({ days: -5 }).toSeconds(),
            collaborate: DateTime.now()
                .plus({ days: 5 })
                .toSeconds(),
            promotional: DateTime.now()
                .plus({ days: 5 })
                .toSeconds(),
        },
    });
    test('verificar si quita los saldos caducados', () => {
        expect(a).toEqual(100);
    });
    test('verificar que cuando el saldo paid este caducado valga 0 y tambien el saldo promocional', () => {
        expect(b).toEqual(100);
    });
});
describe('testing function balanceIsEnough', () => {
    const a = {
        balances: {
            paid: 100,
            collaborate: 100,
            promotional: 100,
        },
        expired_dates: {
            paid: DateTime.now().plus({ days: 5 }).toSeconds(),
            collaborate: DateTime.now()
                .plus({ days: -5 })
                .toSeconds(),
            promotional: DateTime.now()
                .plus({ days: -5 })
                .toSeconds(),
        },
    };

    test('es suficiente ', () => {
        expect(balanceIsEnough(a, 100)).toBeTruthy();
    });
    test('no es suficiente ', () => {
        expect(balanceIsEnough(a, 1000)).toBeFalsy();
    });
});
describe('testing function getBalanceValue', () => {
    const a = {
        balances: {
            paid: 100,
            collaborate: 100,
            promotional: 100,
        },
        expired_dates: {
            paid: DateTime.now().plus({ days: 5 }).toSeconds(),
            collaborate: DateTime.now()
                .plus({ days: -5 })
                .toSeconds(),
            promotional: DateTime.now()
                .plus({ days: -5 })
                .toSeconds(),
        },
    };

    test('es suficiente ', () => {
        const result = getBalancesValue(a);
        expect(result.paid).toEqual(100);
        expect(result.collaborate).toEqual(0);
        expect(result.promotional).toEqual(0);
    });
});
