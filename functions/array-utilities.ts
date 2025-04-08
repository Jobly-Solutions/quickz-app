import { InteresedObjectFSIS, InteresedToPair, InteresedToParkObject, NearParkObject, SPSNearParkObject } from '@/types';

const hasIdIn = (uids: string[], uidToFind: string) => {
    let result = false;
    uids.forEach((uid) => {
        if (uid === uidToFind) result = true;
    });
    return result;
};

// proccess NearPark Array
export const nearParkToSPSNearPark = (
    near_parks: Array<NearParkObject>
): Array<SPSNearParkObject> => {
    return near_parks.map((park, index) =>
        Object.assign({}, park, {
            id: index,
            checked: false,
        })
    );
};

export const getCheckNearPark = (
    near_parks: Array<SPSNearParkObject>
): Array<SPSNearParkObject> => {
    return near_parks.filter((park) => park.checked);
};
export const getCheckedsUid = (
    nearParks: SPSNearParkObject[]
): Array<string> => {
    const result: Array<string> = [];
    for (let { parkOwnerUid } of nearParks) {
        result.push(parkOwnerUid);
    }
    return result;
};
// export const updateInteresedToPairTo = (
//     uids: string[],
//     previusState: InteresedToPair[]
// ): InteresedToPair[] => {
//     return previusState.map<InteresedToPair>((interesed) => {
//         const needChange = hasIdIn(uids, interesed.uid);
//         if (interesed.uid && needChange)
//             return Object.assign<{}, InteresedToPair>({}, interesed, );
//         else return interesed;
//     });
// };
export const makeContactToParks = (
    previusState: SPSNearParkObject[],
    uids: string[]
): SPSNearParkObject[] => {
    return previusState.map((nearPark) => {
        const needChange = hasIdIn(uids, nearPark.parkOwnerUid);
        if (needChange) {
            const changedObj: SPSNearParkObject = Object.assign(
                {},
                nearPark,
                { contacted: true }
            );
            return changedObj;
        }
        return nearPark;
    });
};
export const removeParksWithUids = (
    previusState: SPSNearParkObject[],
    uids: string[]
): SPSNearParkObject[] => {
    return previusState.filter((nearPark) => {
        return !hasIdIn(uids, nearPark.parkOwnerUid);
    });
};
//FSIS mean for select interesed screen
export const convertToFSIS = (
    intereseds: Array<InteresedToParkObject>
): Array<InteresedObjectFSIS> => {
    return intereseds.map((interesed, index) => {
        return Object.assign({}, interesed, {
            id: index,
            checked: false,
        });
    });
};
export const getIsContacted = (
    uid: string,
    ParkOwnerIntereseds: Array<InteresedToParkObject>
): boolean => {
    let result = false;
    ParkOwnerIntereseds.forEach((parkOwnerInteresed) => {
        if (parkOwnerInteresed.uid === uid) result = true;
    });
    return result;
};
export const hasChecksFSIS = (
    intereseds: [] | Array<InteresedObjectFSIS>
): boolean => {
    let result = false;
    if (intereseds.length == 0) return result;
    intereseds.forEach((interesed) => {
        if (interesed.checked) {
            result = true;
        }
    });
    return result;
};
export const getCheckedsUidFSIS = (
    intereseds: [] | Array<InteresedObjectFSIS>
) => {
    const result: Array<string> = [];
    for (let { uid } of intereseds) {
        result.push(uid);
    }
    return result;
};
export const hasContactOf = (
    uid: string,
    array: undefined | Array<InteresedToPair>
): boolean => {
    let result = false;
    if (array)
        array.forEach((interesed) => {
            if (interesed.uid === uid) {
                result = true;
            }
        });
    return result;
};
export const toggleParkCheck = (
    parkId: number,
    near_parks: Array<SPSNearParkObject>
) =>
    near_parks.map((park) => {
        if (park.id === parkId)
            return Object.assign({}, park, {
                checked: !park.checked,
            });
        else return park;
    });
export const rejectPark = (
    park_owner_uid: string,
    near_parks: Array<InteresedToPair>
) =>
    near_parks.map((park): InteresedToPair => {
        if (park.uid === park_owner_uid)
            return Object.assign({}, park, {
                status: 'REJECTED',
            });
        else return park;
    });
export const removePark = (
    parkId: number,
    near_parks: Array<SPSNearParkObject>
) =>
    near_parks.filter((park) => (park.id === parkId ? false : true));

export const arrayWithContactedUser = (
    interesedId: string,
    intereseds: Array<InteresedToParkObject>
) =>
    intereseds.map((interesed) => {
        if (interesed.uid === interesedId)
            return Object.assign({}, interesed, {
                status: 'CONTACTED',
            });
        else return interesed;
    });
