import {
    IMAGE_BACKGROUND_SPLASH_2,
    IMAGE_LOGO_2
} from '@/assets/images';
import { obtenerDatosUser } from '@/firebase-js/api';
import { Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    StyleSheet,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const StartingSplashScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const uid = useSelector((state: Store) =>
        state.auth.user ? state.auth.user.uid : null
    );
    const storeUserData = useSelector(
        (state: Store) => state.user_data
    );
    const userDataIsReady = useRef<boolean>(false);

    if (!uid) throw new Error('no hay informacion del usuario');

    useEffect(() => {
        const fetchData = async () => {
            if (uid && !userDataIsReady.current) {
                obtenerDatosUser(uid, (userData) => {
                    if (userData) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        });
                    } else {
                        if (!userData.user_address) {
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'Home',
                                        state: {
                                            routes: [
                                                { name: 'MapaIntro' },
                                            ],
                                        },
                                    },
                                ],
                            });
                        }
                    }
                });
                await AsyncStorage.setItem('@useruid', uid);
            }
        }
        fetchData();
    }, [uid, storeUserData]);
    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={IMAGE_BACKGROUND_SPLASH_2}
                    style={styles.backgroundimage}
                >
                    <Image style={{}} source={IMAGE_LOGO_2} />
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        color='white'
                    />
                </ImageBackground>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    backgroundimage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIndicator: {
        marginTop: 20,
    },
});
