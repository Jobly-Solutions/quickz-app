import { COLLECTION_LIST, STORE_COLLECTION } from '@/constants/Api';
import { firestore } from '@/firebase-js/setup';

// const db = firestore();

export const getData = async (collectionName: string, id: string) => {
  try {
    const docRef = firestore().collection(collectionName).doc(id);
    const docSnapshot = await docRef.get();
    return docSnapshot.exists ? docSnapshot.data() : undefined;
  } catch (error) {
    console.error('Error getting document:', error);
  }
};

const getCollectionByID = (collectionName = STORE_COLLECTION, idCollection = '') => {
  if (!collectionName || !idCollection) return;
  return firestore().collection(collectionName).doc(idCollection).collection(COLLECTION_LIST[collectionName]);
};

const getCollection = (collectionName = STORE_COLLECTION) => {
  if (!collectionName) return;
  return firestore().collection(collectionName);
};

export interface DocumentParams {
  collection: string;
  idCollection?: string;
  idDoc?: string;
}

const getDocumentRef = ({ collection, idCollection, idDoc }: DocumentParams) => {
  if (!idDoc) return;
  const collectionRef = idCollection ? getCollectionByID(collection, idCollection) : getCollection(collection);
  return collectionRef?.doc(idDoc);
};

export const getDocument = async ({ collection, idCollection, idDoc }: DocumentParams) => {
  const docRef = getDocumentRef({ collection, idCollection, idDoc });
  if (!docRef) return;
  const docSnapshot = await docRef.get();
  const docData = docSnapshot.data();
  if (!docData) return;
  return { data: { id: docSnapshot.id, ...docData } };
};

export interface CollectionParams {
  collection: string;
  idCollection?: string;
}

export const getDocumentList = async ({ collection, idCollection }: CollectionParams) => {
  const collectionRef = idCollection ? getCollectionByID(collection, idCollection) : getCollection(collection);
  if (!collectionRef) return;
  const querySnapshot = await collectionRef.get();
  return {
    data: querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  };
};

export interface AddDocumentParams {
  collection: string;
  idCollection?: string;
  data: {};
}

export const addDocument = async ({ collection, idCollection, data }: AddDocumentParams) => {
  if (!data) return;
  const collectionRef = idCollection ? getCollectionByID(collection, idCollection) : getCollection(collection);
  if (!collectionRef) return;
  const docRef = await collectionRef.add(data);
  return { id: docRef.id, ...data };
};

export interface UpdateDocumentParams {
  collection: string;
  idCollection?: string;
  idDoc: string;
  data: {};
}

export const updateDocument = async ({ collection, idCollection, idDoc, data }: UpdateDocumentParams) => {
  if (!data) return;
  const docRef = getDocumentRef({ collection, idCollection, idDoc });
  if (!docRef) return;
  await docRef.update(data);
  return { id: docRef.id, ...data };
};

export const deleteDocument = async ({ collection, idCollection, idDoc }: DocumentParams) => {
  const docRef = getDocumentRef({ collection, idCollection, idDoc });
  if (!docRef) return;
  await docRef.delete();
  return { id: docRef.id };
};
