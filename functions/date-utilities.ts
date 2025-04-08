import { DateTime } from 'luxon';

export const currentTimeAdded = (toSum: { minutes: number }) =>
    DateTime.now().plus(toSum).toSeconds();
export const currentTimeAddedMonth = (toSum: { day: number }) =>
    DateTime.now().plus(toSum).toSeconds();

export const hasTime = (lastPaymentDate?: number) => {
    if (!lastPaymentDate) return false;
    const today = DateTime.now().toSeconds();
    const expiredDay = DateTime.fromSeconds(lastPaymentDate)
        .plus({ days: 30 })
        .toSeconds();
    return today <= expiredDay;
};
export const isExpired = (expiredDate: number): boolean =>
    DateTime.now().toSeconds() < expiredDate;

type areCompatible = boolean;

/**
 *
 * @param a timestamp 1 a comparar
 * @param b timestamp 2 a comparar
 * @returns retorna true si los timestamp estan son inguales (con margen de dos minutos) y false si no.
 */
export const compareTemporarily = (a: number) => (b: number) => {
    const diferenceInSeconds = a > b ? a - b : b - a;
    const margin = 4 * 60; //two minutes

    return diferenceInSeconds <= margin;
};
export const comparar1Dias = (a: number) => (b: number) => {
    const diferenceInSeconds = a > b ? a - b : b - a;
    const margin = 1.440 * 60; //un-Dia

    return diferenceInSeconds <= margin;
};
/**
 *
 * @param a timestamp 1 a comparar
 * @param b timestamp 2 a comparar
 * @returns retorna si el match termino o no (boolean)
 */
export const getMatchEnd = (matchEndDate: number): boolean => {
    const now = DateTime.now().toSeconds();
    return matchEndDate < now;
};
// export const compareTemporarily =
//     (a: number) =>
//     (b: number): areCompatible =>
//         a - b <= 2 * 60 || a - b >= 2 * 60;
export const handleMatchEnd = (
    onEnd: () => void,
    matchEndDate: number
) => {
    const nowInSeconds = DateTime.now().toSeconds();
    const countdown = matchEndDate - nowInSeconds;
    const matchEnd = matchEndDate < nowInSeconds;
    if (matchEnd) onEnd();
    else {
        return setTimeout(onEnd, countdown * 1000);
    }
};
