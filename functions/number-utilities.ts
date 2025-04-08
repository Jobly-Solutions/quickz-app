import { DateTime } from 'luxon';
import { BalanceDATA, BalanceTypesIn } from '@/types';

export const getCompliance = ({
    numberOfPairings,
    pairingsCompleted,
}: {
    numberOfPairings?: number;
    pairingsCompleted?: number;
}) => {
    const N_O_P = numberOfPairings ? numberOfPairings : 0;
    const P_C = pairingsCompleted ? pairingsCompleted : 0;

    if (N_O_P === 0 && P_C === 0) {
        return 100;
    }
    if (!N_O_P && !P_C) {
        return 100;
    }
    return Math.trunc((P_C / N_O_P) * 100);
};

export const isExpired = (expiredDate: number) => {
    return expiredDate <= DateTime.now().toSeconds();
};

export const getIsExpireds = (
    balanceExpiredDates: BalanceTypesIn<number>
): BalanceTypesIn<boolean> => ({
    promotional: isExpired(balanceExpiredDates.promotional),
    paid: isExpired(balanceExpiredDates.paid),
    collaborate: isExpired(balanceExpiredDates.collaborate),
});

/**
 * @returns total without expired balances
 */
export const getTotalBalance = ({
    balances,
    expired_dates,
}: BalanceDATA): number => {
    let paid = balances.paid;
    let promo = balances.promotional;
    let colla = balances.collaborate;

    const isExpired = getIsExpireds(expired_dates);

    // remove expired balances
    if (isExpired.paid) paid = 0;
    if (isExpired.collaborate) colla = 0;
    if (isExpired.promotional) promo = 0;
    // apply condition to collaborate balance
    if (paid === 0) colla = 0;

    return paid + promo + colla;
};

/**
 * comprueba lo siguiente:
 *   1- quitar los saldos que ya vencieron
 *   2- quitar el saldo colaborar si no hay saldo pagar
 *   3- ver si el saldo total es suficiente
 */
export const balanceIsEnough = (
    info: BalanceDATA,
    priceToComprare: number
) => {
    const total = getTotalBalance(info);
    return total >= priceToComprare;
};

/**
 * retorna los saldos del usuario quitando los saldos caducados
 */
export const getBalancesValue = ({
    balances,
    expired_dates,
}: BalanceDATA): BalanceTypesIn<number> & { total: number } => {
    let paid = balances.paid;
    let promo = balances.promotional;
    let colla = balances.collaborate;

    const isExpired = getIsExpireds(expired_dates);

    // remove expired balances
    if (isExpired.paid) paid = 0;
    if (isExpired.collaborate) colla = 0;
    if (isExpired.promotional) promo = 0;

    return {
        promotional: promo,
        collaborate: colla,
        paid,
        total: paid + colla + promo,
    };
};
