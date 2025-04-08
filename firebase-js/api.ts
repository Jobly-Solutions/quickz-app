import firebase from '@react-native-firebase/app';
import { FirebaseFirestoreTypes, app, auth, firestore, storage } from './setup';
import * as SecureStore from 'expo-secure-store';
import {
    FriendIdValidatorReturn,
    FirestoreDoc,
    UserLocation,
    InteresedDocOfDB,
    InteresedToPair,
    UserVitalData,
    ParkingOfDB,
    MatchRoles,
    TiendasProducto,
    TiendasProductoCheck,
} from '../types';
import { Alert } from 'react-native';
//import firebase from 'firebase';
import _ from 'lodash';
import { STANDARD_ERROR_MESSAGE } from '../constants/Configurations';
import { MERMELADA_GELATINA, FIDEO_ARROZ, ALMACEN_CATEGORY_KEY, BEBIDA_CATEGORY_KEY } from '../constants/Categories';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { urlToBlob } from '@/utils/file-utils';

const { alert } = Alert;

export const SignOut = () => auth().signOut();
/* export const _authPersist = (onSuccess: () => void, onError: () => void) =>
    auth()
        .setPersistence(auth.Auth.Persistence.LOCAL)
        .then(onSuccess)
        .catch(onError); */

//test success
export const _giveFriendAward = async (
    newUserUid: string,
    friendID: string
) => {
    try {
        const rewardRef = firestore().doc('metadata/friendID');
        const ownerRef = firestore().doc(`all_friends_id/${friendID}`);
        const newUserRef = firestore().doc(`users/${newUserUid}`);

        // Obtener reward y ownerID
        const [rewardDoc, ownerFriendCodeDoc] = await Promise.all([
            rewardRef.get(),
            ownerRef.get(),
        ]);

        if (rewardDoc.exists && rewardDoc.get('reward')) {
            await newUserRef.set(
                { discount: rewardDoc.get('reward') },
                { merge: true }
            );

            if (ownerFriendCodeDoc.exists) {
                const ownerUID: string = ownerFriendCodeDoc.get('ownerUID');
                if (ownerUID) {
                    await ownerRef.update({
                        associates: firestore.FieldValue.arrayUnion(newUserUid),
                    });

                    const codeOwnerRef = firestore().doc(`users/${ownerUID}`);
                    const ownerUserDoc = await codeOwnerRef.get();

                    if (ownerUserDoc.exists) {
                        const discount = Number(ownerUserDoc.get('discount')) || 0;
                        await codeOwnerRef.set(
                            { discount: discount + Number(rewardDoc.get('reward')) },
                            { merge: true }
                        );
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error en _giveFriendAward:', error);
    }
};

type InitialUserInformation = {
    email: string;
    balance: number;
    name: string;
};

const _saveUserInitialInformation = (
    uid: string,
    info: InitialUserInformation
) => {
    const docRef = firestore().collection('users').doc(uid);
    return docRef.set(info);
};
// tested
export const validateFriendID = async (
    friendID: string
): Promise<FriendIdValidatorReturn> => {
    const docRef = firestore()
        .collection('all_friends_id')
        .doc(friendID);
    const result = await docRef.get();
    if (result.exists) {
        const associates: [] = result.get('associates');
        if (
            associates?.length < 4
        ) {
            return { isValid: true };
        } else {
            return {
                isValid: false,
                message:
                    'Este amigo a alcanzado el limite de premios',
            };
        }
    } else {
        return {
            isValid: false,
            message:
                'El codigo no coicide con ningún usuario registrado',
        };
    }
};
//tested
const _createUserFriendId = async (uid: string) => {
    try {
        const metadataRef = firestore().doc('metadata/friendID');

        // Obtener friendID counter
        const metadata = await metadataRef.get();

        if (!metadata.exists) {
            throw new Error('The counter of friendID does not exist');
        }

        const counter = Number(metadata.get('counter'));

        if (!counter) {
            throw new Error('Invalid friendID counter');
        }

        // Actualizar el contador de friendID
        await metadataRef.set({ counter: counter + 1 }, { merge: true });

        const friendId = String(counter + 1);
        const friendRef = firestore().doc(`all_friends_id/${friendId}`);
        const userRef = firestore().doc(`users/${uid}`);

        // Agregar nuevo friendID y actualizar usuario
        await friendRef.set({ ownerUID: uid, associates: [] });
        await userRef.set({ friendID: friendId }, { merge: true });

    } catch (error) {
        console.error('Error in _createUserFriendId:', error);
    }
};

//Modo telefono
/* 
export const signUpWithCredential = async (
    credential: auth.AuthCredential,
    phone: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        const result = await auth().currentUser?.linkWithCredential(credential);

        if (result?.user) {
            // Puedes agregar cualquier lógica adicional aquí si es necesario.
            onSuccess();
        } else {
            onError('No se pudo vincular la cuenta.');
        }
    } catch (error: any) {
        onError(error.message || JSON.stringify(error));
    }
};
 */

/* import auth from '@react-native-firebase/auth';

export const loginWithCredential = async (
    credential: auth.AuthCredential,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        await auth().signInWithCredential(credential);
        onSuccess();
    } catch (error: any) {
        switch (error.code) {
            case 'auth/user-not-found':
                onError('El usuario no fue encontrado.');
                break;
            case 'auth/invalid-credential':
                onError('Credenciales incorrectas.');
                break;
            case 'auth/too-many-requests':
                onError('Por favor, espera un momento para reintentar.');
                break;
            default:
                onError(error.message || JSON.stringify(error));
        }
    }
};
 */

/* import auth from '@react-native-firebase/auth';

export const linkWithCredential = async (
    credential: auth.AuthCredential,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
            onError('No hay un usuario autenticado.');
            return;
        }

        await currentUser.linkWithCredential(credential);
        onSuccess();
    } catch (error: any) {
        switch (error.code) {
            case 'auth/user-not-found':
                onError('El usuario no fue encontrado.');
                break;
            case 'auth/invalid-credential':
                onError('Credenciales incorrectas.');
                break;
            case 'auth/too-many-requests':
                onError('Por favor, espera un momento para reintentar.');
                break;
            case 'auth/provider-already-linked':
                onError('Este número de teléfono ya está vinculado a otra cuenta.');
                break;
            case 'auth/requires-recent-login':
                onError('Debes volver a iniciar sesión antes de vincular un nuevo número.');
                break;
            default:
                onError(error.message || JSON.stringify(error));
        }
    }
};
 */

/* import auth from '@react-native-firebase/auth';

export const signUpWithPhone = async (
    phone: string,
    autent: auth.ApplicationVerifier,
    displayName: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
    friendID?: string
) => {
    try {
        const confirmation = await auth().signInWithPhoneNumber(phone, autent);
        const { user } = confirmation;

        if (!user) {
            onError('Error al registrar usuario.');
            return;
        }

        await Promise.all([
            user.updateProfile({ displayName }),
            _createUserFriendId(user.uid),
            friendID ? _giveFriendAward(user.uid, friendID) : Promise.resolve(),
        ]);

        onSuccess();
    } catch (error: any) {
        switch (error.code) {
            case 'auth/invalid-phone-number':
                onError('El número de teléfono no es válido.');
                break;
            case 'auth/too-many-requests':
                onError('Demasiados intentos, intenta nuevamente más tarde.');
                break;
            case 'auth/quota-exceeded':
                onError('Se ha superado el límite de envíos de SMS.');
                break;
            default:
                onError(error.message || JSON.stringify(error));
        }
    }
};
 */

//Modo correo
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
        const result = await auth().createUserWithEmailAndPassword(email, password);

        if (!result.user) {
            onError('No se pudo crear el usuario.');
            return;
        }

        await Promise.all([
            result.user.updateProfile({ displayName }),
            firestore().collection('usuarios').doc(result.user.uid).set({
                user_email: email,
                user_firstname: displayName,
                user_lastname: apellido,
                user_phone: telef,
            }),
        ]);

        onSuccess();
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                onError('El correo electrónico ya está en uso.');
                break;
            case 'auth/invalid-email':
                onError('El correo electrónico no es válido.');
                break;
            case 'auth/weak-password':
                onError('La contraseña es demasiado débil.');
                break;
            default:
                onError(error.message || JSON.stringify(error));
        }
    }
};

export const signUpUser = async (
    email: string,
    password: string,
    displayName: string,
    apellido: string,
    telef: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void,
) => {
    try {
        const result = await auth().createUserWithEmailAndPassword(email, password);
        if (!result.user) {
            onError('No se pudo crear el usuario.');
            return;
        }

        // Obtener fecha y hora actual en formato DD/MM/YYYY HH:mm:ss
        const today = new Date();
        const time = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        // Actualizar perfil y guardar datos en Firestore
        await Promise.all([
            result.user.updateProfile({ displayName }),
            firestore().collection('usuarios').doc(result.user.uid).set({
                user_uid: result.user.uid,
                user_email: email,
                user_firstname: displayName,
                user_lastname: apellido,
                user_phone: telef,
                user_update: time,
            }),
        ]);

        onSuccess();
    } catch (error: any) {
        switch (error.code) {
            case 'auth/email-already-in-use':
                onError('El correo electrónico ya está en uso.');
                break;
            case 'auth/invalid-email':
                onError('El correo electrónico no es válido.');
                break;
            case 'auth/weak-password':
                onError('La contraseña es demasiado débil.');
                break;
            default:
                onError(error.message || JSON.stringify(error));
        }
    }
};

export const LoginWithEmail = (
    email: string,
    password: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'El correo es invalido.',
        'auth/user-not-found': 'El usuario no fue encontrado.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Por favor, espera un momento para reintentar.',
    };

    auth()
        .signInWithEmailAndPassword(email, password)
        .then(onSuccess)
        .catch((error) => {
            const errorMessage = errorMessages[error.code] || JSON.stringify(error.code);
            onError(errorMessage);
        });
};

export const obtenerDatosUser = async (
    uid: string,
    onDocGetted: (result: undefined | FirestoreDoc | string) => void
) => {
    try {
        const refDoc = firestore().collection('usuarios').doc(uid);
        const doc = await refDoc.get();

        if (doc.exists) {
            onDocGetted(doc.data());
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        const errorMessage = error.message || 'Error al obtener la información del usuario';
        onDocGetted(errorMessage);  // Pasamos el error como mensaje
    }
};

//REAUTENTICACION Y CAMBIO DE DATOS DE CUENTA 
/**  
 * 1 - Reautenticamos el usuario con su contraseña
 * 
 * 2 - En el metodo 'onSuccess: ()' por fuera del api, 
 * debemos indicar que paso a seguir.(Modificar Correo o Contraseña) 
 * */
export const reauthenticateUser = async (
    credencial: FirebaseAuthTypes.AuthCredential,
    email: string,
    newPasss: string,
    nombre: string,
    telef: string,
    apellido: string,
    onSuccess: () => void,
    onError: (error: string) => void
) => {
    try {
        const result = await auth().signInWithCredential(credencial);
        if (!result.user) {
            return onError('Error guardando datos');
        }

        const usersRef = firestore().collection('usuarios').doc(result.user.uid);
        await usersRef.set({
            user_email: email,
            user_firstname: nombre,
            user_lastname: apellido,
            user_phone: telef,
            user_password: newPasss,
        }, { merge: true });

        await auth().currentUser?.updateEmail(email);  // Cambiar el email
        onSuccess();  // Si todo fue exitoso, llamamos al éxito

    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        onError(errorMessage);  // Llamamos a onError con el mensaje de error
    }
};

export const cambiarPassword = async (
    credencial: FirebaseAuthTypes.AuthCredential,
    newPasss: string,
    onSuccess: () => void,
    onError: (error: string) => void
) => {
    try {
        const result = await auth().signInWithCredential(credencial);
        if (!result.user) {
            return onError('Error guardando datos');
        }

        const usersRef = firestore().collection('usuarios').doc(result.user.uid);
        await usersRef.set({
            user_password: newPasss,
        }, { merge: true });

        await auth().currentUser?.updatePassword(newPasss);  // Cambiar la contraseña
        onSuccess();  // Si todo fue exitoso, llamar a onSuccess

    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        onError(errorMessage);  // Llamar a onError con el mensaje de error
    }
};

export const cambiarNombre = async (
    credencial: FirebaseAuthTypes.AuthCredential,
    newName: string,
    lastName: string,
    onSuccess: () => void,
    onError: (error: string) => void
) => {
    try {
        const result = await auth().signInWithCredential(credencial);
        if (!result.user) {
            return onError('Error guardando datos');
        }

        const usersRef = firestore().collection('usuarios').doc(result.user.uid);
        await usersRef.set({
            user_firstname: newName,
            user_lastname: lastName,
        }, { merge: true });

        await auth().currentUser?.updateProfile({
            displayName: newName,
        });

        onSuccess();  // Llamar a onSuccess si todo ha ido bien

    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        onError(errorMessage);  // Llamar a onError con el mensaje de error
    }
};

export const changeUserEmail = async (
    uid: string,
    email: string,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        const usersRef = firestore().collection('usuarios').doc(uid);

        // Actualizar el email en Firestore
        await usersRef.set({ user_email: email }, { merge: true });

        // Actualizar el email en el usuario autenticado
        await auth().currentUser?.updateEmail(email);

        // Si todo ha ido bien, ejecutar la función de éxito
        onSuccess();
    } catch (error) {
        // Manejo de errores
        onError();
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);  // Mostrar un mensaje de error genérico
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
        const usersRef = firestore().collection('usuarios').doc(uid);

        // Actualizar la ubicación del usuario en Firestore
        await usersRef.set({
            user_lat,
            user_long,
            user_address,
        }, { merge: true });

        // Si la operación es exitosa, ejecutamos el callback onSuccess
        onSuccess();
    } catch (error) {
        // Si ocurre un error, mostrar un mensaje de error
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const guardarDomicilio = async (
    uid: string,
    user_depto: string,
    user_entrega: string,
    user_telef: string,
    onSuccess: () => void,
) => {
    try {
        const usersRef = firestore().collection('usuarios').doc(uid);

        // Actualizar los datos de domicilio del usuario
        await usersRef.set({
            user_depto,
            user_entrega,
            user_telef,
        }, { merge: true });

        // Si la operación es exitosa, ejecutamos el callback onSuccess
        onSuccess();
    } catch (error) {
        // En caso de error, mostramos un mensaje de error
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

//                          COSAS DE LAS TIENDAS 

//CREAR TIENDAS Y AGREGAR LISTA A BD
/**
 * obtiene datos de pantalla de registro de tienda,
 * añade los datos de la tienda y el id de tienda a los usuarios
 * la lista de la tienda es leida en la pantalla de inicio de tienda
 */
export const agregarTienda = async (
    uid: string,
    shop_id: string,
    shop_name: string,
    shop_img: string,
    shop_address: string,
    shop_provincia: string,
    shop_localidad: string,
    shop_cuit: string,
    shop_phone: string,
    shop_rated: number,
    shop_envio: boolean,
    shop_pago: boolean,
    shop_lat: number,
    shop_long: number,
    onSuccess: () => void,
) => {
    try {
        // Referencias de Firestore
        //const usersRef = firestore().collection('usuarios/' + uid + '/user_listaa').doc(shop_id);
        const usersRef = firestore()
            .collection('usuarios')
            .doc(uid)
            .collection('user_listaa')
            .doc(shop_id);

        const tiendasRef = firestore().collection('tiendas').doc(shop_id);

        // Añadir tienda a la colección de tiendas
        await tiendasRef.set({
            shop_owner: uid,
            shop_id: shop_id,
            shop_name: shop_name,
            shop_img: shop_img,
            shop_address: shop_address,
            shop_provincia: shop_provincia,
            shop_localidad: shop_localidad,
            shop_cuit: shop_cuit,
            shop_phone: shop_phone,
            shop_rated: shop_rated,
            shop_envio: shop_envio,
            shop_pago: shop_pago,
            shop_lat: shop_lat,
            shop_long: shop_long,
            shop_active: false,
        }, { merge: true });

        // Añadir tienda al usuario
        await usersRef.set({
            status: 'administrador',
            shop_name: shop_name,
            shop_address: shop_address,
            shop_provincia: shop_provincia,
            shop_img: shop_img,
            shop_id: shop_id,
        }, { merge: true });

        // Ejecuatamos el callback de éxito si todo va bien
        onSuccess();
    } catch (error) {
        // Manejo de errores en caso de fallo
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const editarTienda = async (
    shop_id: string,
    shop_name: string,
    shop_address: string,
    shop_provincia: string,
    shop_localidad: string,
    shop_cuit: string,
    shop_phone: string,
    shop_envio: boolean,
    shop_pago: boolean,
    shop_envio_precio: string,
    shop_pago_precio: string,
    shop_lat: number,
    shop_long: number,
    onSuccess: () => void,
) => {
    try {
        // Referencia a la tienda en Firestore
        const tiendasRef = firestore().collection('tiendas').doc(shop_id);

        // Actualizamos la tienda en Firestore
        await tiendasRef.set({
            shop_name: shop_name,
            shop_address: shop_address,
            shop_provincia: shop_provincia,
            shop_localidad: shop_localidad,
            shop_cuit: shop_cuit,
            shop_phone: shop_phone,
            shop_envio: shop_envio,
            shop_pago: shop_pago,
            shop_envio_precio: shop_envio_precio,
            shop_pago_precio: shop_pago_precio,
            shop_lat: shop_lat,
            shop_long: shop_long,
        }, { merge: true });

        // Llamamos al callback de éxito
        onSuccess();
    } catch (error) {
        // Manejo de errores
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

//VINCULAR TIENDA
/**
 * busca el id de la tienda en la lista,
 * añade los datos de empleado al usuario y a la tienda
 * para que el administrador los modifique.
 * la tienda se muestra en la pantalla inicial de las tiendas.
 */
export const buscarTienda = async (
    idTienda: string,
    onSuccess: () => void,
    onError: (error: string) => void,
): Promise<void> => {
    try {
        const docRef = firestore().collection('tiendas').doc(idTienda);
        const result = await docRef.get();

        if (result.exists) {
            onSuccess();
        } else {
            onError('Tienda no encontrada');
        }
    } catch (error) {
        // Manejo de errores en la consulta
        onError('Error al buscar la tienda: ' + error.message);
    }
};

export const obtenerDatosTienda = async (
    idTienda: string,
    onDocGetted: (result: undefined | FirestoreDoc) => void
): Promise<void> => {
    try {
        const refDoc = firestore().collection('tiendas').doc(idTienda);
        const doc = await refDoc.get();

        if (doc.exists) {
            onDocGetted(doc.data());
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        // Manejo de errores al intentar obtener los datos de la tienda
        alert(
            'Tenemos un error al obtener la información de la tienda',
            error.message || 'Error desconocido'
        );
    }
};

export const obtenerDocuTiendas = async (): Promise<any[]> => {
    try {
        const query = firestore().collection('tiendas').orderBy('shop_id');
        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                status,
                shop_name,
                shop_address,
                shop_provincia,
                shop_img,
                shop_id,
                shop_lat,
                shop_long,
                shop_rated,
                shop_localidad,
                shop_pre_env,
                shop_pre_pag,
                shop_envio,
                shop_pago,
                shop_active,
            } = doc.data();

            return {
                status,
                shop_name,
                shop_address,
                shop_provincia,
                shop_img,
                shop_id,
                shop_lat,
                shop_long,
                shop_rated,
                shop_localidad,
                shop_pre_env,
                shop_pre_pag,
                shop_envio,
                shop_pago,
                shop_active,
            };
        });

        return matchingDocs;
    } catch (err) {
        throw new Error(err.message || 'Error desconocido al obtener tiendas');
    }
};

export const agregarVincTest = async (
    uid: string,
    idTienda: string,
    userMail: string,
    shopName: string,
    shopAddress: string,
    shopProvincia: string,
    shopImg: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        // const tiendasRef = firestore().collection(`tiendas/${idTienda}/shop_employes`).doc(uid);
        const tiendasRef = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_employes')
            .doc(uid);
        
        // const usersRef = firestore().collection(`usuarios/${uid}/user_listab`).doc(idTienda);
        const usersRef = firestore()
            .collection('usuarios')
            .doc(uid)
            .collection('user_listab')
            .doc(idTienda);

        // Set employee in store
        await tiendasRef.set({
            status: 'request',
            user_mail: userMail,
            user_uid: uid,
        }, { merge: true });

        // Set shop details for the user
        await usersRef.set({
            status: 'empleado',
            shop_name: shopName,
            shop_address: shopAddress,
            shop_provincia: shopProvincia,
            shop_img: shopImg,
            shop_id: idTienda,
        }, { merge: true });

        // On success, call the onSuccess function
        onSuccess();
    } catch (error) {
        // If there's an error, catch it and pass the message to onError
        console.error('Error adding vinculo:', error);
        onError(`Error al vincular el usuario: ${error.message || 'desconocido'}`);
    }
};

export const aceptarUser = async (
    idTienda: string,
    uidC: string,
    userMail: string,
    shopName: string,
    shopAddress: string,
    shopProvincia: string,
    shopImg: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        // const tiendasRef = firestore().collection(`tiendas/${idTienda}/shop_employes`).doc(uidC);
        const tiendasRef = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_employes')
            .doc(uidC);

        // const usersRef = firestore().collection(`usuarios/${uidC}/user_listab`).doc(idTienda);
        const usersRef = firestore()
            .collection('usuarios')
            .doc(uidC)
            .collection('user_listab')
            .doc(idTienda);

        // Update user status in store
        await tiendasRef.set({
            status: 'empleado',
            user_mail: userMail,
            user_uid: uidC,
        }, { merge: true });

        // Update store details for the user
        await usersRef.set({
            status: 'empleado',
            shop_name: shopName,
            shop_address: shopAddress,
            shop_provincia: shopProvincia,
            shop_img: shopImg,
            shop_id: idTienda,
        }, { merge: true });

        // If everything is successful, call onSuccess
        onSuccess();
    } catch (error) {
        // If there's an error, catch it and pass the message to onError
        console.error('Error aceptando usuario:', error);
        onError(`Error al aceptar el usuario: ${error.message || 'desconocido'}`);
    }
};

export const rechazarUser = async (
    idTienda: string,
    uidC: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        // const tiendasRef = firestore().collection(`tiendas/${idTienda}/shop_employes`).doc(uidC);
        const tiendasRef = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_employes')
            .doc(uidC);

        // const usersRef = firestore().collection(`usuarios/${uidC}/user_listab`).doc(idTienda);
        const usersRef = firestore()
            .collection('usuarios')
            .doc(uidC)
            .collection('user_listab')
            .doc(idTienda);

        // Eliminar el documento de la tienda y del usuario
        await Promise.all([tiendasRef.delete(), usersRef.delete()]);

        // Si todo es exitoso, llamar a onSuccess
        onSuccess();
    } catch (error) {
        // Si hay un error, mostrar el mensaje y llamar a onError
        console.error('Error rechazando usuario:', error);
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError(`Error al rechazar el usuario: ${error.message || 'desconocido'}`);
    }
};

export const actualizarUser = async (
    idTienda: string,
    uidC: string,
    status: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    try {
        // const tiendasRef = firestore().collection(`tiendas/${idTienda}/shop_employes`).doc(uidC);
        const tiendasRef = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_employes')
            .doc(uidC);
        
        // const usersRef = firestore().collection(`usuarios/${uidC}/user_listab`).doc(idTienda);
        const usersRef = firestore()
            .collection('usuarios')
            .doc(uidC)
            .collection('user_listab')
            .doc(idTienda);

        // Realizar las actualizaciones en paralelo
        await Promise.all([
            tiendasRef.set({ status }, { merge: true }),
            usersRef.set({ status }, { merge: true })
        ]);

        // Si todo es exitoso, llamar a onSuccess
        onSuccess();
    } catch (error) {
        // Manejar el error si ocurre
        console.error('Error al actualizar el usuario:', error);
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError(`Error al actualizar el usuario: ${error.message || 'desconocido'}`);
    }
};

// LEER cosas de la tienda
export const obtenerDocuListaDetalle = async (
    uiduser: string,
    orderId: string
): Promise<any[]> => {
    try {
        // Referencia a la colección en Firestore
        const querySnapshot = await firestore()
            // .collection(`usuarios/${uiduser}/orders/${orderId}/list`)
            .collection('usuarios')
            .doc(uiduser)
            .collection('orders')
            .doc(orderId)
            .collection('list')
            .get();

        const docs = querySnapshot.docs;
        // Mapear los documentos obtenidos a un formato más estructurado
        return docs.map((doc) => {

            return ({
                product_id: doc.data().product_id,
                product_sku: doc.data().product_sku,
                product_name: doc.data().product_name,
                product_details: doc.data().product_details,
                product_unit: doc.data().product_unit,
                product_unit_value: doc.data().product_unit_value,
                product_price: doc.data().product_price,
                product_checked: doc.data().product_checked,
                product_cuant: doc.data().product_cuant,
            })
        });
    } catch (err) {
        console.error('Error al obtener los detalles del pedido:', err);
        throw new Error('Error al obtener los detalles del pedido: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuProductos = async (idTienda: string): Promise<any[]> => {
    try {
        const query = firestore()
            // .collection(`tiendas/${idTienda}/shop_products`)
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_products')
            .orderBy('product_name');

        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                product_id,
                product_code,
                product_sku,
                product_name,
                product_details,
                product_unit,
                product_unit_value,
                product_price,
                product_stock,
                product_category,
                product_rated,
                product_active,
                product_isdisc,
                product_disc,
            } = doc.data();

            return {
                product_id,
                product_code,
                product_sku,
                product_name,
                product_details,
                product_unit,
                product_unit_value,
                product_price,
                product_stock,
                product_category,
                product_rated,
                product_active,
                product_isdisc,
                product_disc,
            };
        });

        // Filtrar productos con product_id > 0 y product_unit_value > 0
        const docuProductsFilter = matchingDocs.filter(docuProduct =>
            parseInt(docuProduct.product_id) > 0 && docuProduct.product_unit_value > 0
        );

        return docuProductsFilter;

    } catch (err) {
        console.error('Error al obtener los productos:', err);
        throw new Error('Error al obtener los productos: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuMensajes = async (idTienda: string): Promise<any[]> => {
    try {
        const query = firestore()
            // .collection(`tiendas/${idTienda}/shop_mensajes`)
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_mensajes')
            .orderBy('mensaje_id');

        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                mensaje_id,
                mensaje_imagen,
                mensaje_nombre,
                mensaje_fecha,
                mensaje_ultimo,
            } = doc.data();

            return {
                mensaje_id,
                mensaje_imagen,
                mensaje_nombre,
                mensaje_fecha,
                mensaje_ultimo,
            };
        });

        return matchingDocs;

    } catch (err) {
        console.error('Error al obtener los mensajes:', err);
        throw new Error('Error al obtener los mensajes: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuMensajtos = async (
    idTienda: string,
    idMensajes: string
): Promise<any[]> => {
    try {
        const query = firestore()
            // .collection(`tiendas/${idTienda}/shop_mensajes`)
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_mensajes')
            .doc(idMensajes)  // Asegúrate de que idMensajes es un documento específico
            .collection('mensajes') // Si es una subcolección, usa .collection()
            .orderBy('mensaje_fecha');

        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                mensaje_id,
                mensaje_nombre,
                mensaje_fecha,
                mensaje_ultimo,
            } = doc.data();

            return {
                mensaje_id,
                mensaje_nombre,
                mensaje_fecha,
                mensaje_ultimo,
            };
        });

        return matchingDocs;

    } catch (err) {
        console.error('Error al obtener los mensajes:', err);
        throw new Error('Error al obtener los mensajes: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuEmpleados = async (
    idTienda: string
): Promise<any[]> => {
    try {
        const query = firestore()
            // .collection(`tiendas/${idTienda}/shop_employes`)
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_employes')
            .orderBy('user_uid');

        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                status,
                user_mail,
                user_name,
                user_uid,
                user_active,
            } = doc.data();

            return {
                status,
                user_mail,
                user_name,
                user_uid,
                user_active,
            };
        });

        return matchingDocs;
    } catch (err) {
        console.error('Error al obtener los empleados:', err);
        throw new Error('Error al obtener los empleados: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuCupones = async (
    idUser: string
): Promise<any[]> => {
    try {
        const query = firestore()
            // .collection(`usuarios/${idUser}/coupons`)
            .collection('usuarios')
            .doc(idUser)
            .collection('coupons')
            .orderBy('coupon_created_at');

        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                coupon_id,
                coupon_code,
                coupon_description,
                coupon_img,
                coupon_amount,
                coupon_quantity,
                coupon_expires_at,
                coupon_created_at,
            } = doc.data();

            return {
                coupon_id,
                coupon_code,
                coupon_description,
                coupon_img,
                coupon_amount,
                coupon_quantity,
                coupon_expires_at,
                coupon_created_at,
            };
        });

        return matchingDocs;
    } catch (err) {
        console.error('Error al obtener los cupones:', err);
        throw new Error('Error al obtener los cupones: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuBanners = async (
    idTienda: string
): Promise<any[]> => {
    try {
        const query = firestore()
            // .collection(`tiendas/${idTienda}/banners`)
            .collection('tiendas')
            .doc(idTienda)
            .collection('banners')
            .orderBy('banner_id');

        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map(doc => {
            const {
                banner_id,
                banner_name,
                banner_img,
                banner_url,
            } = doc.data();

            return {
                banner_id,
                banner_name,
                banner_img,
                banner_url,
            };
        });

        return matchingDocs;
    } catch (err) {
        console.error('Error al obtener los banners:', err);
        throw new Error('Error al obtener los banners: ' + (err.message || 'desconocido'));
    }
};

export const obtenerDocuTurnos = async (
    idTienda: string,
    onDocGetted: (result: undefined | FirestoreDoc) => void
) => {
    try {
        // const refDoc = firestore().collection(`tiendas/${idTienda}/shop_turnos`).doc('1');
        const refDoc = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_turnos')
            .doc('1');            
        const doc = await refDoc.get();

        if (doc.exists) {
            onDocGetted(doc.data());
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        console.error('Error al obtener los turnos:', error);
        alert('Tenemos un error al obtener la información de la tienda', error.message);
    }
};

export const obtenerDocuMulti = async (
    idTienda: string
): Promise<[]> => {
    try {
        // const querya = firestore().collection(`tiendas/${idTienda}/orders`).orderBy('order_created_at');
        const querya = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('orders')
            .orderBy('order_created_at');
        const snapshots = await querya.get();

        const matchingDocs = snapshots.docs.map(doc => {
            const {
                order_id,
                order_total,
                order_owner,
                order_ownerid,
                order_code,
                order_address,
                order_created_at,
                order_finished_at,
                order_status,
                order_feedback,
                order_products_json,
                order_emp_name,
                order_emp_id,
            } = doc.data();
            return {
                order_id,
                order_total,
                order_owner,
                order_ownerid,
                order_code,
                order_address,
                order_created_at,
                order_finished_at,
                order_status,
                order_feedback,
                order_products_json,
                order_emp_name,
                order_emp_id,
            };
        });

        return matchingDocs;
    } catch (err) {
        console.error("Error al obtener los documentos:", err);
        throw err;
    }
};

export const obtenerDocuPedidos = async (
    uiduser: string
): Promise<[]> => {
    try {
        // const querya = firestore().collection(`usuarios/${uiduser}/orders`).orderBy('order_created_at');
        const querya = firestore()
            .collection('usuarios')
            .doc(uiduser)
            .collection('orders')
            .orderBy('order_created_at');
        const snapshots = await querya.get();

        const matchingDocs = snapshots.docs.map(doc => {
            const {
                order_id,
                order_total,
                order_owner,
                order_ownerid,
                order_code,
                order_address,
                order_created_at,
                order_finished_at,
                order_status,
                order_feedback,
                order_products_json,
                order_emp_name,
                order_emp_id,
                order_shipping,
                order_store
            } = doc.data();
            return {
                order_id,
                order_total,
                order_owner,
                order_ownerid,
                order_code,
                order_address,
                order_created_at,
                order_finished_at,
                order_status,
                order_feedback,
                order_products_json,
                order_emp_name,
                order_emp_id,
                order_shipping,
                order_store
            };
        });

        return matchingDocs;
    } catch (err) {
        console.error("Error al obtener los pedidos:", err);
        throw err;
    }
};

export const restProductoCarro = async (
    uidUser: string,
    idProd: string,
    product_cuant: number,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        const tiendasRefA = firestore()
            .collection('usuarios')
            .doc(uidUser)
            .collection('carro')
            .doc('01')
            .collection('content')
            .doc(idProd);

        const newCuant = product_cuant - 1;
        await tiendasRefA.set({ product_cuant: newCuant }, { merge: true });

        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

export const addProductoCarro = async (
    uidUser: string,
    idProd: string,
    product_cuant: number,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        const tiendasRefA = firestore()
            .collection('usuarios')
            .doc(uidUser)
            .collection('carro')
            .doc('01')
            .collection('content')
            .doc(idProd);

        const newCuant = product_cuant + 1;
        await tiendasRefA.set({ product_cuant: newCuant }, { merge: true });

        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

export const agregarPedido = async (
    idTienda: string,
    uiduser: string,
    idOrder: string,
    order_total: number,
    order_owner: string,
    order_address: string,
    order_feedback: string,
    order_paytipe: number,
    order_shipping: boolean,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        const today = new Date();
        const time = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes().toPrecision(2)}`;

        // const tiendasRef = firestore().collection(`tiendas/${idTienda}/orders`).doc(idOrder);
        const tiendasRef = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('orders')
            .doc(idOrder);
        // const userRef = firestore().collection(`usuarios/${uiduser}/orders`).doc(idOrder);
        const userRef = firestore()
            .collection('usuarios')
            .doc(uiduser)
            .collection('orders')
            .doc(idOrder);

        const orderData = {
            order_id: idOrder,
            order_total,
            order_owner,
            order_ownerid: uiduser,
            order_code: idOrder,
            order_address,
            order_created_at: time,
            order_finished_at: '',
            order_status: 'unasigned',
            order_feedback,
            order_products_json: '',
            order_emp_name: '',
            order_emp_id: '',
            order_paytipe,
            order_shipping,
            order_store: idTienda
        };

        await Promise.all([
            tiendasRef.set(orderData, { merge: true }),
            userRef.set(orderData, { merge: true })
        ]);

        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

export const agregarProdPedido = async (
    idTienda: string,
    uiduser: string,
    idOrder: string,
    product_id: string,
    product_sku: string,
    product_name: string,
    product_details: string,
    product_unit: number,
    product_unit_value: number,
    product_price: number,
    product_checked: boolean,
    product_cuant: number,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        const today = new Date();
        const time = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes().toPrecision(2)}`;

        const productData = {
            product_id,
            product_sku,
            product_name,
            product_details,
            product_unit,
            product_unit_value,
            product_price: product_price * product_cuant,
            product_checked,
            product_cuant,
        };

        const tiendasRef = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('orders')
            .doc(idOrder)
            .collection('list')
            .doc(product_id);

        const userRef = firestore()
            .collection('usuarios')
            .doc(uiduser)
            .collection('orders')
            .doc(idOrder)
            .collection('list')
            .doc(product_id);

        await Promise.all([
            tiendasRef.set(productData, { merge: true }),
            userRef.set(productData, { merge: true }),
        ]);

        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

export const restablecerCarro = async (
    uidUser: string,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        const carroRef = firestore().collection('usuarios').doc(uidUser).collection('carro');

        // Obtener todos los documentos dentro de "carro"
        const snapshot = await carroRef.get();

        const batch = firestore().batch();

        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit(); // Ejecutar la eliminación en batch

        onSuccess();
    } catch (error) {
        console.error('Error al restablecer el carro:', error);
        Alert.alert('Error', 'No se pudo restablecer el carrito.');
        onError();
    }
};

export const agregarProductoCarro = async (
    uidUser: string,
    shop_id: string,
    product_id: string,
    product_sku: string,
    product_name: string,
    product_details: string,
    product_unit: string,
    product_unit_value: number,
    product_price: number,
    product_cuant: number,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        // Referencia al documento en la colección del carro
        const tiendasRefA = firestore()
            .collection('usuarios')
            .doc(uidUser)
            .collection('carro')
            .doc('01')
            .collection('content')
            .doc(product_id);

        // Actualización del producto en el carrito
        await tiendasRefA.set(
            {
                shop_id,
                product_id,
                product_sku,
                product_name,
                product_details,
                product_unit,
                product_unit_value,
                product_price,
                product_cuant,
            },
            { merge: true } // Para evitar sobreescribir los datos existentes
        );

        // Llamada al callback de éxito
        onSuccess();
    } catch (error) {
        // Manejo de errores con logging
        console.error('Error al agregar producto al carro:', error);

        // Mostrar mensaje de error al usuario
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);

        // Llamada al callback de error
        onError();
    }
};

export const quitarProductoCarro = async (
    uidUser: string,
    idProd: string,
    onSuccess: () => void,
    onError: () => void
) => {
    try {
        // Referencia al documento del producto a eliminar        
        const tiendasRefA = firestore()
            .collection('usuarios')
            .doc(uidUser)
            .collection('carro')
            .doc('01')
            .collection('content')
            .doc(idProd);

        // Eliminar el producto del carrito
        await tiendasRefA.delete();

        // Llamada al callback de éxito
        onSuccess();
    } catch (error) {
        // Mostrar el error en la consola para depuración
        console.error('Error al quitar producto del carrito:', error);

        // Mostrar el mensaje de error al usuario
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);

        // Llamada al callback de error
        onError();
    }
};

export const obtenerDocuCarro = async (
    uid: string,
    onDocGetted: (result: undefined | FirebaseFirestoreTypes.DocumentData) => void
) => {
    try {
        const refDoc = firestore().doc(`usuarios/${uid}/carro/01`);
        const doc = await refDoc.get();

        if (doc.exists) {
            onDocGetted(doc.data());
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        // Mostrar un error más detallado para depuración
        console.error('Error al obtener el carrito:', error);
        alert('Tenemos un error al obtener su carrito. Por favor, intente más tarde.');
    }
};

/**
 * Función que obtiene los productos del carrito
 * @param uidUser string - id de usuario
 * @returns TiendasProductoCheck[] - Lista de productos del carrito
 * @throws Error
 */
export const obtenerContentCarro = async (uidUser: string): Promise<TiendasProductoCheck[]> => {
    try {
        // const query = firestore().collection(`usuarios/${uidUser}/carro/01/content`).orderBy('product_id');
        const query = firestore()
            .collection('usuarios')
            .doc(uidUser)
            .collection('carro')
            .doc('01')
            .collection('content')
            .orderBy('product_id');
        const snapshot = await query.get();

        // Aseguramos que el tipo `TiendasProductoCheck` se aplique correctamente
        return snapshot.docs.map((doc) => doc.data() as TiendasProductoCheck);
    } catch (error) {
        // Mejor manejo de errores con un mensaje claro
        console.error('Error al obtener el contenido del carrito:', error);
        return []; // Retornamos un arreglo vacío en caso de error
    }
};

export const obtenerProductCheck = async (
    idTienda: string,
    orderId: string,
): Promise<[]> => {
    try {
        // const querya = firestore().collection(`tiendas/${idTienda}/orders/${orderId}/list`).orderBy('product_name');
        const querya = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('orders')
            .doc(orderId)
            .collection('list')
            .orderBy('product_name');
        const snapshot = await querya.get();

        const matchingDocs = snapshot.docs.map((doc) => {
            const {
                product_id,
                product_sku,
                product_name,
                product_details,
                product_unit,
                product_unit_value,
                product_price,
                product_checked,
            } = doc.data();
            return {
                product_id,
                product_sku,
                product_name,
                product_details,
                product_unit,
                product_unit_value,
                product_price,
                product_checked,
            };
        });

        return matchingDocs;
    } catch (err) {
        console.error("Error al obtener los productos del pedido:", err);
        throw err; // Retornamos el error para que pueda ser manejado por el consumidor de la función
    }
};

export const obtenerDatosCupon = async (
    idTienda: string,
    cuponId: string,
    onDocGetted: (result: undefined | FirestoreDoc) => void
) => {
    try {
        // const refDoc = firestore().collection(`tiendas/${idTienda}/coupons`).doc(cuponId);
        const refDoc = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('coupons')
            .doc(cuponId);
        const doc = await refDoc.get();

        if (doc.exists) {
            onDocGetted(doc.data());
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        console.error("Error al obtener los datos del cupón:", error);
        alert("Tenemos un error al obtener la información del cupón.");
    }
};

export const obtenerDatosProductoUser = async (
    uidUser: string,
    proId: string,
    onDocGetted: (result: undefined | FirestoreDoc) => void
) => {
    try {
        const refDoc = firestore()
            .collection('usuarios')
            .doc(uidUser)
            .collection('carro')
            .doc('01') // Si "01" es un documento, lo accedemos con .doc()
            .collection('content')
            .doc(proId);

        const doc = await refDoc.get();
        if (doc.exists) {
            const data = doc.data();
            onDocGetted(data);
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        console.error('Error en obtenerDatosProductoUser:', error);
        alert('Tenemos un error al obtener la información del producto');
    }
};

export const obtenerDatosProducto = async (
    idTienda: string,
    proId: string,
    onDocGetted: (result: undefined | FirestoreDoc) => void
) => {
    try {
        const refDoc = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('shop_products')
            .doc(proId);

        const doc = await refDoc.get();

        if (doc.exists) {
            const data = doc.data();
            onDocGetted(data);
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        console.error('obtenerDatosProducto', error);
        alert('Tenemos un error al obtener la información de la tienda');
    }
};


export const updateProductRating = async (
    shopId: string,
    userId: string,
    prodId: string,
    newRating: number
) => {
    try {
        // Actualizar puntuación de producto en la tienda
        // const shopProductRef = firestore().collection(`tiendas/${shopId}/shop_products/`).doc(prodId);
        const shopProductRef = firestore()
            .collection('tiendas')
            .doc(shopId)
            .collection('shop_products')
            .doc(prodId);
        await shopProductRef.update({ product_rating: newRating });
        console.info('Shop Product rating updated successfully');

        // Actualizar puntuación de producto en el carrito del usuario
        // const userProductRef = firestore().collection(`usuarios/${userId}/carro/01/content/`).doc(prodId);
        const userProductRef = firestore()
            .collection('usuarios')
            .doc(userId)
            .collection('carro')
            .doc('01')
            .collection('content')
            .doc(prodId);
        await userProductRef.update({ product_rating: newRating });
        console.info('User Product rating updated successfully');

    } catch (error) {
        console.error('Error updating product rating: ', error);
    }
};

//tienda cosas etc eso
export const obtenerDatosMulti = async (
    idTienda: string,
    idOrder: string,
    onDocGetted: (result: undefined | FirestoreDoc) => void
) => {
    try {
        // const refDoc = firestore().collection(`tiendas/${idTienda}/orders`).doc(idOrder);
        const refDoc = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('orders')
            .doc(idOrder);
        const doc = await refDoc.get();

        if (doc.exists) {
            onDocGetted(doc.data());
        } else {
            onDocGetted(undefined);
        }
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        alert('Tenemos un error al obtener la información de la tienda', error.message);
    }
};

export const obtenerDatos = async (idTienda: string): Promise<[]> => {
    try {
        // const query = firestore().collection(`tiendas/${idTienda}/stats`).orderBy('order_id');
        const query = firestore()
            .collection('tiendas')
            .doc(idTienda)
            .collection('stats')
            .orderBy('order_id');
        const snapshot = await query.get();

        const matchingDocs = snapshot.docs.map((doc) => {
            const {
                order_id,
                order_id_ticket,
                order_total,
                order_owner,
                order_code,
                order_address,
                order_created_at,
                order_finished_at,
                order_day,
                order_month,
                order_year,
                order_hour,
                order_complete,
                order_emp_name,
                order_emp_id,
            } = doc.data();

            return {
                order_id,
                order_id_ticket,
                order_total,
                order_owner,
                order_code,
                order_address,
                order_created_at,
                order_finished_at,
                order_day,
                order_month,
                order_year,
                order_hour,
                order_complete,
                order_emp_name,
                order_emp_id,
            };
        });

        return matchingDocs;
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
        throw error;
    }
};

export const agregarDatosMoviminto = async (
    idTienda: string,
    idOrder: string,
    ticket: {
        order_total: number,
        order_owner: string,
        order_code: string,
        order_address: string,
        order_created_at: string,
        order_finished_at: string,
        order_day: number,
        order_month: number,
        order_year: number,
        order_hour: number,
        order_complete: boolean,
        order_emp_name: string,
        order_emp_id: string,
    },
    onSuccess: () => void,
    onError: () => void
) => {
    const idTicket = `${ticket.order_day}-${ticket.order_month}-${ticket.order_year}-${idOrder}`;
    // const tiendasRef = firestore().collection(`tiendas/${idTienda}/stats/`).doc(idTicket);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('stats')
        .doc(idTicket);

    try {
        await tiendasRef.set(
            {
                order_id: idOrder,
                order_id_ticket: idTicket,
                order_total: ticket.order_total,
                order_owner: ticket.order_owner,
                order_code: ticket.order_code,
                order_address: ticket.order_address,
                order_created_at: ticket.order_created_at,
                order_finished_at: ticket.order_finished_at,
                order_day: ticket.order_day,
                order_month: ticket.order_month,
                order_year: ticket.order_year,
                order_hour: ticket.order_hour,
                order_complete: ticket.order_complete,
                order_emp_name: ticket.order_emp_name,
                order_emp_id: ticket.order_emp_id,
            },
            { merge: true }
        );

        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

// AGREGAR cosas de la tienda 
export const agregarEmpleado = async (
    uid: string,
    idTienda: string,
    mail: string,
    username: string,
    name: string,
    address: string,
    provincia: string,
    imagen: string,
    onSuccess: () => void,
    onError: () => void
) => {
    // const tiendasRef = firestore().collection(`tiendas/${idTienda}/shop_employes`).doc(uid);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_employes')
        .doc(uid);
    // const usersRef = firestore().collection(`usuarios/${uid}/user_listab`).doc(idTienda);
    const usersRef = firestore()
        .collection('usuarios')
        .doc(uid)
        .collection('user_listab')
        .doc(idTienda);

    try {
        await Promise.all([
            tiendasRef.set(
                {
                    status: 'request',
                    user_mail: mail,
                    user_name: username,
                    user_uid: uid,
                    user_active: true,
                },
                { merge: true }
            ),
            usersRef.set(
                {
                    status: 'request',
                    shop_name: name,
                    shop_address: address,
                    shop_provincia: provincia,
                    shop_img: imagen,
                    shop_id: idTienda,
                },
                { merge: true }
            ),
        ]);

        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

export const agregarProducto = async (
    idTienda: string,
    onSuccess: () => void,
    onError: () => void
) => {
    // Definir los productos en un array para evitar la repetición de código
    const productos = [
        {
            product_id: '1',
            product_code: '1233',
            product_sku: 'https://econa.com.pe/68-superlarge_default/mantequilla-almendras-330gr-nutlovers.jpg',
            product_name: 'Manteca',
            product_details: 'manteca-butter',
            product_unit: '200 gr',
            product_unit_value: 100,
            product_price: 100,
            product_stock: 5,
            product_category: MERMELADA_GELATINA,
            product_rated: 5,
            product_active: true,
            product_isdisc: false,
            product_disc: 0,
        },
        {
            product_id: '2',
            product_code: '2233',
            product_sku: 'https://econa.com.pe/588-superlarge_default/fideos-integral-espinaca-250gr-gopal.jpg',
            product_name: 'Fideos',
            product_details: 'noodles',
            product_unit: '500 gr',
            product_unit_value: 50,
            product_price: 50,
            product_stock: 5,
            product_category: FIDEO_ARROZ,
            product_rated: 4,
            product_active: true,
            product_isdisc: false,
            product_disc: 0,
        },
        {
            product_id: '3',
            product_code: '22133',
            product_sku: 'https://econa.com.pe/588-superlarge_default/fideos-integral-espinaca-250gr-gopal.jpg',
            product_name: 'Arroz',
            product_details: 'lost n mind',
            product_unit: '300 gr',
            product_unit_value: 123,
            product_price: 123,
            product_stock: 5,
            product_category: FIDEO_ARROZ,
            product_rated: 3,
            product_active: true,
            product_isdisc: false,
            product_disc: 0,
        },
        {
            product_id: '5',
            product_code: '2233',
            product_sku: 'https://econa.com.pe/490-superlarge_default/yogurt-natural-1litro-conga.jpg',
            product_name: 'prod A',
            product_details: 'prod A',
            product_unit: '200 lts',
            product_unit_value: 10,
            product_price: 10,
            product_stock: 5,
            product_category: BEBIDA_CATEGORY_KEY,
            product_rated: 2,
            product_active: true,
            product_isdisc: false,
            product_disc: 0,
        },
        {
            product_id: '6',
            product_code: '2233',
            product_sku: 'https://econa.com.pe/646-superlarge_default/huevos-de-campo-pack-12und-del-valle.jpg',
            product_name: 'prod B',
            product_details: 'prodB',
            product_unit: '123 lts',
            product_unit_value: 20,
            product_price: 20,
            product_stock: 5,
            product_category: ALMACEN_CATEGORY_KEY,
            product_rated: 1,
            product_active: true,
            product_isdisc: false,
            product_disc: 0,
        },
        {
            product_id: '7',
            product_code: '22233',
            product_sku: 'https://econa.com.pe/646-superlarge_default/huevos-de-campo-pack-12und-del-valle.jpg',
            product_name: 'prod C',
            product_details: 'prodC',
            product_unit: '520 gr',
            product_unit_value: 30,
            product_price: 30,
            product_stock: 5,
            product_category: ALMACEN_CATEGORY_KEY,
            product_rated: 0,
            product_active: true,
            product_isdisc: true,
            product_disc: 20,
        },
    ];

    // Crear promesas para todos los productos
    const promises = productos.map((producto) =>
        // firestore().collection(`tiendas/${idTienda}/shop_products`).doc(producto.product_id).set(producto, { merge: true })
        firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_products')
        .doc(producto.product_id)
        .set(producto, { merge: true })
    );

    try {
        // Ejecutar todas las promesas
        await Promise.all(promises);
        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
        onError();
    }
};

export const agregarCupon = async (
    uid: string,
    id: string,
    quantity: string,
    description: string,
    img: string,
    amount: string,
    expires_at: string,
    created_at: string,
    onSuccess: () => void,
    onError: () => void
) => {
    // Definir referencias para la tienda y el usuario
    // const tiendasRef = firestore().collection('tiendas/000001/coupons').doc(id);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc('000001')
        .collection('coupons')
        .doc(id);
    // const usersRef = firestore().collection('usuarios/' + uid + '/coupons').doc(id);
    const usersRef = firestore()
        .collection('usuarios')
        .doc(uid)
        .collection('coupons')
        .doc(id);

    try {
        // Realizar ambas operaciones de forma simultánea
        await Promise.all([
            tiendasRef.set({ coupon_quantity: quantity }, { merge: true }),  // Modificar cupon en tienda
            usersRef.set(                                                // Agregar cupon al usuario
                {
                    coupon_id: id,
                    coupon_code: id,
                    coupon_description: description,
                    coupon_img: img,
                    coupon_amount: amount,
                    coupon_quantity: 1,
                    coupon_expires_at: expires_at,
                    coupon_created_at: created_at,
                },
                { merge: true }
            ),
        ]);
        onSuccess(); // Ejecución cuando las operaciones se completan correctamente
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar mensaje de error
        onError(); // Llamar función de error
    }
};

export const removeUserCupon = async (
    uid: string,
    id: string,
    onSuccess: () => void,
    onError: () => void
) => {
    // const usersRef = firestore().collection('usuarios/' + uid + '/coupons').doc(id);
    const usersRef = firestore()
        .collection('usuarios')
        .doc(uid)
        .collection('coupons')
        .doc(id);

    try {
        // Eliminar el documento del cupón
        await usersRef.delete();
        onSuccess(); // Ejecución cuando la eliminación es exitosa
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar mensaje de error
        onError(); // Llamar función de error
    }
};

export const agregarBanner = async (
    idTienda: string,
    id: string,
    banner_name: string,
    banner_url: string,
    onSuccess: () => void,
    onError: () => void
) => {
    // const tiendasRef = firestore().collection('tiendas/' + idTienda + '/banners').doc(id);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('banners')
        .doc(id);

    try {
        // Establecer los datos del banner en Firestore
        await tiendasRef.set({
            banner_id: id,
            banner_name: banner_name,
            banner_img: banner_name, // Si 'banner_img' es una URL, ajusta esto según sea necesario.
            banner_url: banner_url,
        }, { merge: true });

        onSuccess(); // Ejecución cuando la operación es exitosa
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar mensaje de error
        onError(); // Llamar función de error
    }
};

export const agregarTurnos = async (
    idTienda: string,
    id: string,
    turno_name: string,
    turno_hora_inicio: string,
    turno_hora_final: string,
    turno_activo: boolean,
    turno_lun: boolean,
    turno_mar: boolean,
    turno_mie: boolean,
    turno_jue: boolean,
    turno_vie: boolean,
    turno_sab: boolean,
    turno_dom: boolean,
    onSuccess: () => void,
    onError: () => void
) => {
    // const tiendasRef = firestore().collection('tiendas/' + idTienda + '/shop_turnos').doc(id);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_turnos')
        .doc(id);

    try {
        // Establecer los datos del turno en Firestore
        await tiendasRef.set({
            turno_id: id,
            turno_name: turno_name,
            turno_hora_inicio: turno_hora_inicio,
            turno_hora_final: turno_hora_final,
            turno_activo: turno_activo,
            turno_lun: turno_lun,
            turno_mar: turno_mar,
            turno_mie: turno_mie,
            turno_jue: turno_jue,
            turno_vie: turno_vie,
            turno_sab: turno_sab,
            turno_dom: turno_dom,
        }, { merge: true });

        onSuccess(); // Llamar a onSuccess si la operación es exitosa
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar un mensaje de error
        onError(); // Llamar a onError si ocurre un error
    }
};

export const agregarFotoPerfil = async (
    uid: string,
    url: string,
    onSuccess: () => void,
    onError: () => void
) => {
    const tiendasRef = firestore().collection('usuarios').doc(uid);

    try {
        // Actualizar la foto de perfil del usuario en Firestore
        await tiendasRef.set({
            user_image: url,
        }, { merge: true });

        onSuccess(); // Llamar a onSuccess si la operación es exitosa
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar un mensaje de error
        onError(); // Llamar a onError si ocurre un error
    }
};

export const agregarMensaje = async (
    idTienda: string,
    onSuccess: () => void,
    onError: () => void
) => {
    const id = '01';
    // const tiendasRef = firestore().collection('tiendas/' + idTienda + '/shop_mensajes').doc(id);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_mensajes')
        .doc(id);
    // const tiendasRefb = firestore().collection('tiendas/' + idTienda + '/shop_mensajes' + id).doc('usuario121220');
    const tiendasRefb = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_mensajes'+id)
        .doc('usuario121220');

    try {
        // Agregar mensaje en tienda
        await tiendasRef.set({
            mensaje_id: '01',
            mensaje_imagen: 'https://econa.com.pe/68-superlarge_default/mantequilla-almendras-330gr-nutlovers.jpg',
            mensaje_nombre: 'usuario test',
            mensaje_fecha: '12/12/20',
            mensaje_ultimo: 'dadadadadada',
        }, { merge: true });

        // Agregar mensaje de usuario
        await tiendasRefb.set({
            mensaje_id: 'usuario12/12/20',
            mensaje_nombre: 'usuario test',
            mensaje_fecha: '12/12/20',
            mensaje_ultimo: 'dadadadadada',
        }, { merge: true });

        // Llamar onSuccess si todo es exitoso
        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar alerta de error
        onError(); // Llamar a onError si ocurre un error
    }
};

export const enviarMensajito = async (
    idTienda: string,
    idchat: string,
    chatsend: string,
    nombre: string,
    mensaje: string,
    ultimo: string,
    onSuccess: () => void,
    onError: () => void
) => {
    // const tiendasRefb = firestore().collection('tiendas/' + idTienda + '/shop_mensajes' + idchat).doc(chatsend);
    const tiendasRefb = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_mensajes' + idchat)
        .doc(chatsend);

    try {
        // Agregar mensaje al chat
        await tiendasRefb.set({
            mensaje_id: chatsend,
            mensaje_nombre: nombre,
            mensaje_fecha: ultimo,
            mensaje_ultimo: mensaje,
        }, { merge: true });

        // Llamar a onSuccess si la operación fue exitosa
        onSuccess();
    } catch (error) {
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body); // Mostrar alerta de error
        onError(); // Llamar a onError si ocurre un error
    }
};

export const cargarFotoPerfil = async (
    uid: string,
    imageUri: string,
    onSucces: (url: string) => void,
    onError: () => void
) => {
    try {
        const imageRef = imageUri.substring(imageUri.lastIndexOf('/') + 1); // Obtener solo el nombre del archivo
        const ref = storage().ref(`usuarios/${uid}/perfil/${imageRef}`); // Crear referencia en Storage

        // Subir archivo desde la URI local
        await ref.putFile(imageUri);

        // Obtener la URL de descarga
        const url = await ref.getDownloadURL();

        // Llamar a onSucces con la URL de la imagen
        onSucces(url);
    } catch (error) {
        console.error('Error al cargar la foto de perfil:', error);
        onError();
    }
};

export const cargarBanner = async (
    idTienda: string,
    imageUri: string,
    onSuccess: (url: string) => void,
    onError: (error: string) => void // Añadí un parámetro para pasar el mensaje de error
) => {
    const imageRef = imageUri.substring(imageUri.lastIndexOf("/"));
    const ref = firebase.storage().ref(`tiendas/${idTienda}/banners/${imageRef}`);

    try {
        // Convertimos la URL a un blob
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Subimos el blob al storage
        await ref.put(blob);

        // Obtenemos la URL de la imagen cargada
        const url = await ref.getDownloadURL();

        // Llamamos a onSuccess con la URL
        onSuccess(url);
    } catch (error: any) {
        // Si ocurre un error, llamamos a onError con el mensaje
        onError(error?.message || "An error has occurred while uploading the banner");
    }
};

export const guardarProducto = async (
    idTienda: string,
    idproducto: string,
    product_price: number,
    setActive: boolean,
    setdiscoun: boolean,
    product_disc: number,
    onSuccess: () => void,
    onError: (error: string) => void // Cambié a aceptar un mensaje de error
) => {

    // const tiendasRef = firestore().collection('tiendas/' + idTienda + '/shop_products').doc(idproducto);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('shop_products')
        .doc(idproducto);

    try {
        // Actualizar los datos del producto
        await tiendasRef.set(
            {
                product_price: product_price,
                product_active: setActive,
                product_isdisc: setdiscoun,
                product_disc: product_disc,
            }, { merge: true });

        // Si la actualización es exitosa, llamamos onSuccess
        onSuccess();
    } catch (error: any) {
        // En caso de error, pasamos el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while updating the product";
        onError(errorMessage);

        // También se puede mostrar el error en una alerta si lo prefieres
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

/*
*
*       ORDENES PARA LAS ORDENES...
*
*/
export const asignarYcontinuar = async (
    idTienda: string,
    idOrder: string,
    idEmpleado: string,
    nombreEmpleado: string,
    onSuccess: () => void,
    onError: (error: string) => void // Cambié a recibir el mensaje de error
) => {
    // const tiendasRef = firestore().collection('tiendas/' + idTienda + '/orders/').doc(idOrder);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('orders')
        .doc(idOrder);

    try {
        // Actualizar la orden con la información del empleado
        await tiendasRef.set(
            {
                order_status: 'assigned',
                order_emp_name: nombreEmpleado,
                order_emp_id: idEmpleado,
            }, { merge: true });

        // Si todo va bien, se ejecuta onSuccess
        onSuccess();
    } catch (error: any) {
        // En caso de error, se pasa el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while assigning the order";
        onError(errorMessage);

        // También se puede mostrar el error en una alerta si es necesario
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const checkItem = async (
    idTienda: string,
    idOrder: string,
    idObjeto: string,
    estado: boolean,
    onSuccess: () => void,
    onError: (error: string) => void // Cambié a recibir un mensaje de error
) => {
    var today = new Date();
    var time = today.getDay() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes();

    // const tiendasRef = firestore().collection('tiendas/' + idTienda + '/orders/' + idOrder + '/list').doc(idObjeto);
    const tiendasRef = firestore()
        .collection('tiendas')
        .doc(idTienda)
        .collection('orders')
        .doc(idOrder)
        .collection('list')
        .doc(idObjeto);

    try {
        // Actualiza el estado del producto en la orden
        await tiendasRef.set(
            {
                product_checked: estado,
            }, { merge: true });

        // Si todo va bien, se ejecuta onSuccess
        onSuccess();
    } catch (error: any) {
        // En caso de error, se pasa el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while updating the product status";
        onError(errorMessage);

        // Mostrar alerta si es necesario
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const tiendaActivar = async (
    idTienda: string,
    estado: boolean,
    onSuccess: () => void,
    onError: () => void
) => {
    const tiendasRef = firestore().collection('tiendas').doc(idTienda);

    try {
        // Actualiza el estado de la tienda
        await tiendasRef.set({ shop_active: estado }, { merge: true });

        // Si todo va bien, ejecuta onSuccess
        onSuccess();
    } catch (error: any) {
        // Si ocurre un error, pasa el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while updating the shop status";
        onError(errorMessage);

        // Muestra la alerta con un mensaje estándar de error
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const enviarPedido = async (
    idTienda: string,
    idOrder: string,
    onSuccess: () => void,
    onError: () => void
) => {
    const tiendasRef = firestore().collection('tiendas').doc(idTienda).collection('orders').doc(idOrder);

    try {
        // Actualiza el estado de la orden a 'move'
        await tiendasRef.set({ order_status: 'move' }, { merge: true });

        // Si todo va bien, ejecuta onSuccess
        onSuccess();
    } catch (error: any) {
        // Si ocurre un error, pasa el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while updating the order status";
        onError(errorMessage);

        // Muestra la alerta con un mensaje estándar de error
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const finalizarPedido = async (
    idTienda: string,
    idOrder: string,
    time: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void // Pass error message to onError
) => {
    const tiendasRef = firestore().collection('tiendas').doc(idTienda).collection('orders').doc(idOrder);

    try {
        // Actualiza la hora de finalización y el estado de la orden
        await tiendasRef.set(
            {
                order_finished_at: time,
                order_status: 'completed',
            },
            { merge: true }
        );

        // Si todo va bien, ejecuta onSuccess
        onSuccess();
    } catch (error: any) {
        // En caso de error, pasa el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while finalizing the order";
        onError(errorMessage);

        // Muestra la alerta con un mensaje estándar de error
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const CancelarPedido = async (
    uid: string,
    id: string,
    time: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void // Pass error message to onError
) => {
    const usuariosRef = firestore().collection('usuarios').doc(uid).collection('orders').doc(id);

    try {
        // Actualiza la hora de cancelación y el estado de la orden
        await usuariosRef.set(
            {
                order_finished_at: time,
                order_status: 'cancel',
            },
            { merge: true }
        );

        // Si todo va bien, ejecuta onSuccess
        onSuccess();
    } catch (error: any) {
        // En caso de error, pasa el mensaje de error a onError
        const errorMessage = error?.message || "An error occurred while canceling the order";
        onError(errorMessage);

        // Muestra la alerta con un mensaje estándar de error
        const { title, body } = STANDARD_ERROR_MESSAGE;
        Alert.alert(title, body);
    }
};

export const replaceWithCredential = (
    credential: FirebaseAuthTypes.AuthCredential,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    auth()
        .currentUser?.updatePhoneNumber(credential)
        .then(onSuccess)
        .catch((error: { code: string }) => {
            if (error.code === 'auth/user-not-found') {
                onError('El usuario no fue encontrado.');
                return;
            } else if (error.code === 'auth/too-many-requests') {
                onError('Por favor, espera un momento para reintentar.');
                return;
            }
            onError(JSON.stringify(error.code));
        });
};

export const saveUserPhoneInfo = (
    uid: string,
    phone: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    const userRef = firestore().collection('users').doc(uid);

    userRef
        .set(
            {
                phone: phone,
            },
            { merge: true }
        )
        .then(onSuccess)
        .catch((error) => {
            // Manejo detallado de errores
            const errorMessage = error.message || 'Ha ocurrido un error al guardar el número telefónico.';
            alert(errorMessage);  // Puedes dejar este alert o personalizarlo
            onError(errorMessage);
        });
};

export const updateUserNotify = (
    uid: string,
    notify: boolean,
    onSuccess: () => void,  // Habilitado para manejar el éxito
    onError: (errorMessage: string) => void  // Habilitado para manejar errores
) => {
    const refDoc = firestore().collection('usuarios').doc(uid);

    refDoc
        .update({ user_notify: notify })
        .then(() => {
            console.info("updateUserNotify: Success, updated user_notify to ", notify);
            onSuccess();  // Llama al callback en caso de éxito
        })
        .catch((err: any) => {
            const errorMessage = err.message || "Error al actualizar la notificación del usuario.";
            console.error("updateUserNotify: Error", err);
            onError(errorMessage);  // Llama al callback en caso de error
        });
};

export const updateUserInformation = (
    uid: string,
    currentPassword: string,
    user_firstname: string,
    user_lastname: string,
    user_email: string,
    user_phone: string,
    user_password: string,
    onSuccess: () => void,
    onError: (errorMessage: string) => void
) => {
    const refDoc = firestore().collection('usuarios').doc(uid);

    // Primero actualizamos la información del usuario en Firestore
    refDoc.update({
        user_firstname: user_firstname,
        user_lastname: user_lastname,
        user_email: user_email,
        user_phone: user_phone,
        user_password: user_password,
    })
        .then(() => {
            // Luego, intentamos actualizar el email del usuario en Firebase Authentication
            auth().currentUser?.updateEmail(user_email)
                .then(() => {
                    onSuccess(); // Llamamos a onSuccess si todo fue bien
                })
                .catch((err: any) => {
                    // Aquí manejamos el error específico de la actualización de correo
                    if (err.code === 'auth/invalid-email') {
                        onError('El correo electrónico proporcionado no es válido.');
                    } else if (err.code === 'auth/email-already-in-use') {
                        onError('Este correo electrónico ya está en uso.');
                    } else {
                        onError(`Error al actualizar el correo: ${err.message}`);
                    }
                });
        })
        .catch((err: any) => {
            // Manejo de errores en la actualización de Firestore
            if (err.code === 'auth/wrong-password') {
                onError('La contraseña actual es incorrecta.');
            } else {
                onError(`Error al actualizar la información: ${err.message}`);
            }
        });
};

export const updateUserPassword = (
    newPassword: string,
    onSuccess: () => void,
    onError: () => void
) => {
    auth()
        .currentUser?.updatePassword(newPassword)
        .then(onSuccess)
        .catch((error) => {
            onError(); // Llamar a onError para manejar el flujo de error

            if (error.code === 'auth/requires-recent-login') {
                alert(
                    'No se ha podido actualizar su contraseña.',
                    'Es necesario que vuelva a iniciar sesión para poder realizar este cambio.'
                );
            } else {
                alert(
                    'No se ha podido actualizar su contraseña.',
                    error.message || 'Ocurrió un error desconocido.'
                );
            }
        });
};

export const saveUserLocation = async (
    uid: string,
    location: UserLocation,
    onSuccess: () => void, // Callback de éxito
    onError: (errorMessage: string) => void // Callback de error con mensaje
) => {
    const docRef = firestore().collection('users').doc(uid);

    try {
        await docRef.set({ location }, { merge: true });
        onSuccess(); // Llamar al callback de éxito
    } catch (error) {
        const errorMessage = error.message || 'Ocurrió un error al guardar la ubicación';
        onError(errorMessage); // Llamar al callback de error con el mensaje
    }
};

export const updateContactedParks = async (
    uid: string,
    newState: Array<InteresedToPair>,
    onSuccess: () => void, // Callback de éxito
    onError: (errorMessage: string) => void // Callback de error con mensaje
) => {
    const docRef = firestore().collection('parkings_finders').doc(uid);

    const update = {
        parkings_available: newState,
    };

    try {
        await docRef.set(update, { merge: true });
        onSuccess(); // Llamar al callback de éxito
    } catch (error) {
        const errorMessage = error.message || 'Ocurrió un error al actualizar los parques';
        onError(errorMessage); // Llamar al callback de error con el mensaje
    }
};

export const contactParkFinder = async (
    uid: string,
    parks_finders_uid: Array<string>,
    info: UserVitalData,
    onSuccess: () => void, // Callback de éxito
    onError: (errorMessage: string) => void // Callback de error con mensaje
) => {
    const requests: Array<Promise<void>> = [];

    try {
        parks_finders_uid.forEach((park_finders_uid) => {
            const docRef = firestore().collection('parkings_finders').doc(park_finders_uid);

            // Push de solicitud a la lista de promesas
            requests.push(
                docRef.set({
                    parkings_paired: firestore.FieldValue.arrayUnion({
                        uid,
                        status: 'PENDING',
                        information: info,
                    }),
                }, { merge: true }) // Usando merge para no sobrescribir otros datos
            );
        });

        // Ejecutar todas las solicitudes en paralelo
        await Promise.all(requests);
        onSuccess(); // Llamar al callback de éxito si todo va bien
    } catch (error: any) {
        const errorMessage = error.message || 'Ocurrió un error al contactar con los parques.';
        onError(errorMessage); // Llamar al callback de error con mensaje detallado
    }
};

export async function getMatchDocOf<T extends 'park_owner' | 'interesed'>(
    of: T,
    uid: string
): Promise<T extends 'park_owner' ? ParkingOfDB : InteresedDocOfDB> {
    const route = of === 'interesed' ? 'parkings_finders' : 'parkings';

    try {
        const doc = await firestore().collection(route).doc(uid).get();
        if (doc.exists) {
            return doc.data() as T extends 'park_owner' ? ParkingOfDB : InteresedDocOfDB;
        } else {
            throw new Error('Document does not exist');
        }
    } catch (err) {
        throw new Error(`Error fetching document: ${err.message}`);
    }
}

type RMProps = {
    uid: string;
    result: 'completed' | 'unmatch' | 'uncompleted';
    role: MatchRoles;
};
type MProps = {
    uid: string;
    result: 'completed' | 'unmatch' | 'uncompleted';
};
/**
 * 1: Actualiza el compliance del usuario (numberOfPairings, pairingsCompleted)
 * 2: resetea el match_status
 * 3: elimina el match_doc de parkings/parkings_finders
 *
 * @returns Promise
 */ 