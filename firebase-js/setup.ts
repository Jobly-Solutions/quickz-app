import { FIREBASE_CONFIG } from '@/constants/Configurations';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

firebase.setReactNativeAsyncStorage(AsyncStorage);

const app = firebase;

export { app, auth, FirebaseAuthTypes, FirebaseFirestoreTypes, storage, firestore }