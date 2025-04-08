import { DateTime } from 'luxon';
import { SaveParkInformation, UserInformation } from '@/types';

type ToParse = {
    area: undefined;
    data?: {
        whenarrive?: number;
    };
    location: {
        latitude: number;
        longitude: number;
    };
    mode: 'quit';
    plan: 'discount';
    whenarride: {
        sendTo: string;
    };
    whenarrive: number;
};
export const parseQuitParkResult = (
    toParse: ToParse
): SaveParkInformation => {
    if (toParse.data && toParse.data.whenarrive) {
        return {
            location: toParse.location,
            mode: toParse.mode,
            plan: toParse.plan,
            data: {
                whenarrive: toParse.data.whenarrive,
            },
        };
    }
    return {
        location: toParse.location,
        mode: toParse.mode,
        plan: toParse.plan,
        data: {
            whenarrive: toParse.whenarrive,
        },
    };
};

export const getBalanceDATA = (info: UserInformation) => ({
    balances: {
        paid: info.balance || 0,
        promotional: info.balance_promotional,
        collaborate: info.balance_collaborate,
    },
    expired_dates: {
        paid: DateTime.fromSeconds(info.lastPaymentDate || 0)
            .plus({ days: 30 })
            .toSeconds(),
        promotional: info.balance_promotional_expired_date,
        collaborate: info.balance_collaborate_expired_date,
    },
});
 
