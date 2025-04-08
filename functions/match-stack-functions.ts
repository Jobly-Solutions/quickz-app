import { DateTime } from 'luxon';
import { watchDocOf } from '@/firebase-js/watchers';
import {
    ArrivalStates,
    InteresedDocOfDB,
    InteresedMatchData,
    MatchRoles,
    ParkOwnerMatchData,
    ParkOwnerPairedStatus,
    ParkingOfDB
} from '@/types';

export const getMatchEnd = (
    interesedPostEnd: number,
    parkOnwerPostEnd: number
): boolean => {
    const now = DateTime.now().toSeconds();
    const postEnd =
        interesedPostEnd < parkOnwerPostEnd
            ? interesedPostEnd
            : parkOnwerPostEnd;

    if (postEnd - now <= 0) return true;
    else return false;
};

export const getParkOwnerStatus = (
    park_doc: ParkingOfDB
): ParkOwnerPairedStatus => {
    if (!park_doc.interesedData)
        throw new Error('no hay informacion del interesed');
    const matchEnd = getMatchEnd(
        park_doc.interesedData.postEnd,
        park_doc.postEnd
    );
    if (matchEnd) {
        if (park_doc.interesedHasArrived) {
            return 'PARK_OWNER_NC';
        } else {
            return 'INTERESED_NC';
        }
    }
    if (park_doc.interesedHasArrived) {
        if (park_doc.arrivalAccepted) {
            return 'TIMER';
        } else {
            return 'ACCEPT_PARKING';
        }
    }
    return 'MARCH_INIT';
};

export const getMatchDataForParkOwner = (
    park_doc: ParkingOfDB
): ParkOwnerMatchData => {
    if (!park_doc.interesedData)
        throw new Error('no hay informacion del paired');

    return {
        location: {
            latitude: park_doc.lat,
            longitude: park_doc.lng,
        },
        pair_data: {
            postEnd: park_doc.postEnd,
            compliance: park_doc.interesedData.compliance,
            location: park_doc.interesedData.location,
            uid: park_doc.interesedData.uid
        },
        pairUid: park_doc.interesedData.uid,
        status: getParkOwnerStatus(park_doc),
        postEnd: park_doc.postEnd,
        intereseds: park_doc.intereseds,
    };
};
export const getMatchDataForInteresed = (
    interesed_doc: InteresedDocOfDB
): InteresedMatchData => {
    const {
        pairCancelMatch,
        area,
        parkings_available,
        lat,
        lng,
        postEnd,
    } = interesed_doc;
    return {
        parkings_available,
        location: {
            latitude: lat,
            longitude: lng,
        },
        searching_area: area,
        postEnd,
        timeEnd: false,
        arrival_state: 'INITIAL',
        hasArrived: false,
        pairCancelMatch,
    };
};
export const getMatchDataForInteresedPaired = (
    interesed_doc: InteresedDocOfDB
): InteresedMatchData => {
    const {
        area,
        parkings_available,
        lat,
        lng,
        postEnd,
        parkOwnerData,
        hasArrived,
        pairCancelMatch,
    } = interesed_doc;

    if (!parkOwnerData)
        throw new Error('no hay informacion sobre el parkOwner');

    const timeEnd = getMatchEnd(postEnd, parkOwnerData.postEnd);
    return {
        parkings_available,
        location: {
            latitude: lat,
            longitude: lng,
        },
        searching_area: area,
        parkOwnerData,
        arrival_state: getArrivalState(timeEnd, interesed_doc),
        postEnd,
        timeEnd,
        hasArrived,
        pairCancelMatch,
    };
};
export const getArrivalState = (
    timeEnd: boolean,
    {
        hasArrived,
        arrivalAccepted,
        pairCancelMatch,
    }: InteresedDocOfDB
): ArrivalStates => {
    if (pairCancelMatch) return 'PARK_OWNER_NC';
    if (timeEnd && hasArrived) return 'PARK_OWNER_NC';
    if (!timeEnd && hasArrived && arrivalAccepted)
        return 'ARRIVAL_ACCEPTED';
    if (!timeEnd && !arrivalAccepted) {
        return 'INITIAL';
    }
    throw new Error(
        'No se ha detectado el estado del (interesed-paired)  usuario'
    );
};
// export const getMatchDocs = async (uids: {
//     interesed: string;
//     park_owner: string;
// }): Promise<DatabaseMatchDocs> => {
//     const result = await Promise.all([
//         getMatchDocOf('interesed', uids.interesed),
//         getMatchDocOf('park_owner', uids.park_owner),
//     ]);
//     return {
//         interesed_doc: result[0],
//         park_doc: result[1],
//     };
// };

type ClearWatchers = () => void;

export const watchMatchDocsChange = (
    callback: (role: MatchRoles) => (doc: any) => void
): ClearWatchers => {
    const unsubscribe = watchDocOf(
        'interesed',
        '',
        callback('interesed')
    );
    const unsubscribeTwo = watchDocOf(
        'park_owner',
        '',
        callback('park_owner')
    );
    return () => {
        unsubscribe();
        unsubscribeTwo();
    };
};
