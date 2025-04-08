type RMProps = {
    uid: string;
    result: 'completed' | 'unmatch' | 'uncompleted';
    role: any;
};
const firestore = {
    FieldValue: { increment: (n: number) => n },
};
const makeParamsType = (
    result: 'unmatch' | 'completed' | 'uncompleted'
): any => ({
    uid: '',
    result,
    role: 'park_owner',
});
const removeMatch = ({ uid, result, role }: RMProps) => {
    const firestoree = {
        FieldValue: { increment: (n: number) => n },
    };
    // si compliance es false se le coloca un incumplimiento al usuario
    const compliance = result === 'completed';
    // const route =
    // role === 'park_owner' ? 'parkings' : 'parkings_finders';
    // const userRef = firestore().collection('users').doc(uid);
    // const postRef = firestore().collection(route).doc(uid);
    let profile_update: any = {
        match_status: {
            active: false,
            role: 'park_owner',
            state: 'not-paired',
        },
    };
    if (result !== 'unmatch') {
        profile_update['numberOfPairings'] =
            firestoree.FieldValue.increment(1);

        profile_update['pairingsCompleted'] = compliance
            ? firestoree.FieldValue.increment(1)
            : firestoree.FieldValue.increment(0);
    }
    return profile_update;
    // return Promise.all([
    //     postRef.delete(),
    //     userRef.update(profile_update),
    // ]);
};
describe('probando removeMatch', () => {
    test('probando resultado unmatch', () => {
        const a = removeMatch(makeParamsType('unmatch'));
        expect(a.numberOfPairings).toBeUndefined();
    });
    test('probando resultado completed', () => {
        const b = removeMatch(makeParamsType('completed'));
        expect(b.numberOfPairings + b.pairingsCompleted).toEqual(2);
    });
    test('probando resultado uncompleted', () => {
        const c = removeMatch(makeParamsType('uncompleted'));
        expect(c.numberOfPairings + c.pairingsCompleted).toEqual(1);
    });
});
