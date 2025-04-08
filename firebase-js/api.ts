// firebase-js/api.ts
import {
    getDoc,
    setDoc,
    doc,
    updateDoc,
    collection,
    getDocs,
    query,
    orderBy,
    addDoc,
    deleteDoc,
    writeBatch,
    arrayUnion,
  } from 'firebase/firestore';
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword,
    updateProfile,
    signInWithCredential,
  } from 'firebase/auth';
  import { Alert } from 'react-native';
  import { app, auth, firestore } from './setup';
  import { STANDARD_ERROR_MESSAGE } from '../constants/Configurations';
  
  export const SignOut = () => auth.signOut();
  
  export const signUpWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    apellido: string,
    telef: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (!result.user) return onError('No se pudo crear el usuario.');
  
      await updateProfile(result.user, { displayName });
      await setDoc(doc(firestore, 'usuarios', result.user.uid), {
        user_email: email,
        user_firstname: displayName,
        user_lastname: apellido,
        user_phone: telef,
      });
      onSuccess();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          onError('El correo electrónico ya está en uso.'); break;
        case 'auth/invalid-email':
          onError('El correo electrónico no es válido.'); break;
        case 'auth/weak-password':
          onError('La contraseña es demasiado débil.'); break;
        default:
          onError(error.message || JSON.stringify(error));
      }
    }
  };
  
  export const LoginWithEmail = async (
    email: string,
    password: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
  ) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (error: any) {
      const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'El correo es invalido.',
        'auth/user-not-found': 'El usuario no fue encontrado.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Esperá un momento para reintentar.',
      };
      onError(errorMessages[error.code] || error.message);
    }
  };
  
  export const obtenerDatosUser = async (
    uid: string,
    onDocGetted: (result: any | undefined | string) => void
  ) => {
    try {
      const refDoc = doc(firestore, 'usuarios', uid);
      const docSnap = await getDoc(refDoc);
      if (docSnap.exists()) {
        onDocGetted(docSnap.data());
      } else {
        onDocGetted(undefined);
      }
    } catch (error: any) {
      onDocGetted(error.message || 'Error al obtener datos');
    }
  };
  
  export const guardarUbicacion = async (
    uid: string,
    user_lat: number,
    user_long: number,
    user_address: string,
    onSuccess: () => void,
  ) => {
    try {
      const ref = doc(firestore, 'usuarios', uid);
      await setDoc(ref, { user_lat, user_long, user_address }, { merge: true });
      onSuccess();
    } catch (error) {
      const { title, body } = STANDARD_ERROR_MESSAGE;
      Alert.alert(title, body);
    }
  };
  
  export const cambiarPassword = async (
    newPassword: string,
    onSuccess: () => void,
    onError: (error: string) => void
  ) => {
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        onSuccess();
      } else {
        onError('No hay un usuario autenticado');
      }
    } catch (error: any) {
      onError(error.message || 'Error desconocido');
    }
  };
  