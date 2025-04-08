import { ToastAndroid } from 'react-native';
import * as Location from 'expo-location';
import { saveUserLocation } from '@/firebase-js/api';

export const saveLocation = async (uid: string) => {
    ToastAndroid.showWithGravity(
        'Guardando... Por favor, espera...',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
    );
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.showWithGravity(
                'No se puede acceder a su ubicación',
                ToastAndroid.LONG,
                ToastAndroid.TOP
            );
            return;
        }
        let location = await Location.getCurrentPositionAsync();

        await saveUserLocation(uid, location).then(() => {
            ToastAndroid.showWithGravity(
                'Ubicación Guardada!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        });
    } catch (err) {
        ToastAndroid.showWithGravity(
            'Error, por favor intentalo mas tarde.',
            ToastAndroid.SHORT,
            ToastAndroid.TOP
        );
    }
};
