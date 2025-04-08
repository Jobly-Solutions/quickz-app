import { FirebaseUser } from '@/types';
import { FirebaseAuthTypes, FirebaseFirestoreTypes, auth, firestore } from './setup';

export const watchUserChanges = (
    callback: (user: null | FirebaseUser) => void
) => {
    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) =>
        callback(user as FirebaseUser | null)
    );
};

export const watchMatchDocument = (
    matchId: string,
    callback: (snap: FirebaseFirestoreTypes.DocumentSnapshot) => void
) => {
    const docRef = firestore().collection('matchings').doc(matchId);
    return docRef.onSnapshot(callback);
};

export const watchUserDocument = (
    uid: string,
    callback: (snap: FirebaseFirestoreTypes.DocumentSnapshot) => void
) => {
    const docRef = firestore().collection('users').doc(uid);
    return docRef.onSnapshot(callback);
};

type ClearWatch = () => void;
export const watchDocOf = (
    role: 'interesed' | 'park_owner',
    uid: string,
    callback: (snap: FirebaseFirestoreTypes.DocumentSnapshot) => void
): ClearWatch => {
    const collection_name =
        role === 'interesed' ? 'parkings_finders' : 'parkings';
    const docRef = firestore().collection(collection_name).doc(uid);
    return docRef.onSnapshot(callback);
};