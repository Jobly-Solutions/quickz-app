import { ICONO_MAP_CUSTOM, ICONO_SUPPORT } from '@/assets/iconos';
import { guardarDomicilio } from '@/firebase-js/api';
import { RootState } from '@/redux/store';
import { GRIS_CLARO, NEGRO, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { F1_18_600_24, F1_20_600_24 } from '@/styles/typography';
import { Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

const GREEN = '#5ED69C';

export const ConfirmDataAddressScreen = () => {
    const uid = useSelector((state: Store) => state.auth.user?.uid);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const navigation = useNavigation();
    const ADDRESS = useSelector((state: RootState) => state.address?.value);
    const { depto, entrega, telef, map } = ADDRESS;
    const { lat, long, dir } = map || { lat: 37.78825, long: -122.4324, };
    const location: LatLng = { latitude: lat, longitude: long };

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const guardarDomiciliox = async (
        user_depto: string,
        user_entrega: string,
        user_telef: string
    ) => {
        await AsyncStorage.setItem('@useruid', uid);
        guardarDomicilio(
            uid,
            user_depto,
            user_entrega,
            user_telef,
            () => { cambiarPantalla() },
        );
        cambiarPantalla();
    };

    const cambiarPantalla = () => {
        // navigation.navigate('Home',{delivery: false});
        navigation.navigate('Home');
    };

    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title='Error'
                titleStyle={styles.titleStyle}
                message={messageAlert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                onDismiss={() => _cleanAlert()}
                showConfirmButton={false}
            />
            {/* <Spinner visible={visible} /> */}
            <View style={styles.container}>
                <View style={estilos.backgroundimage}>
                    <View style={estilos.barra_superiod}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SoporteGeneral')}>
                            <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                        </TouchableOpacity>
                    </View>
                    <View style={estilos.contenedorPantalla}>
                        <View style={styles.aligncenter}>

                            <View style={{ marginTop: 20 }}>
                                <Text style={estilos.textTitulo}>
                                    {'Datos de tu dirección'}
                                </Text>
                            </View>

                            <Text 
                                style={styles.subTitleText}>
                                {'Confirmar datos'}
                            </Text>

                            <View>

                                <Text style={styles.topInputText}>{"Dirección:"}</Text>
                                <Text style={styles.input}>{dir}</Text>

                                <Text style={styles.topInputText}>{"Country:"}</Text>
                                <Text style={styles.input}>{depto}</Text>

                                <Text style={styles.topInputText}>{"Contacto:"}</Text>
                                <Text style={styles.input}>{telef}</Text>

                            </View>

                            <Text style={[styles.subTitleText, { marginVertical: 10 }]}>
                                {'¿Confirmas el punto en el mapa?'}
                            </Text>

                        </View>

                        <View style={{ flex: 1 }}>
                            {ADDRESS && <View style={styles.mapContainer}>
                                <MapView
                                    style={styles.map}
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={
                                        ADDRESS
                                            ? {
                                                latitude: lat,
                                                longitude: long,
                                                latitudeDelta: 0.01,
                                                longitudeDelta: 0.01,
                                            }
                                            : undefined
                                    }
                                    loadingEnabled
                                >{location && (
                                    <Marker coordinate={location}
                                        // draggable={true}
                                        // onDragEnd={(coord) => getLocationData(coord.nativeEvent.coordinate)}
                                        anchor={{ x: 0.5, y: 1 }} >
                                        <Image
                                            resizeMode='contain'
                                            source={ICONO_MAP_CUSTOM}
                                            style={{
                                                height: 43,
                                                width: 43,
                                            }} />
                                    </Marker>

                                )}
                                </MapView>
                            </View>}

                        </View>
                        <View style={styles.botonView}>
                            {/* {telef ? ( */}
                            <TouchableOpacity
                                style={styles.boton}
                                onPress={() => {
                                    guardarDomiciliox(depto, entrega, telef);
                                }}>
                                <Text style={styles.textoBoton}>{'Confirmar datos'}</Text>
                            </TouchableOpacity>
                            {/* ) : null} */}
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerNow: {
        fontSize: 16,
        fontFamily: 'poppins',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    botonView: {
        bottom: 0,
        paddingBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: WHITE,
    },
    boton: {
        backgroundColor: VERDE_CLARO,
        borderRadius: 40,
        paddingHorizontal: 70,
        paddingVertical: 10,
        height: 50,
        alignItems: 'center',
        marginBottom: 20,
    },
    textoBoton: {
        color: WHITE,
        fontSize: 18,
        fontFamily: 'poppinsBold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    contenedorTexto: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleStyle: {
        color: RED,
        fontFamily: 'poppinsRegular',
    },
    subTitleText: {
        ...F1_20_600_24,
        color: VERDE_CLARO
      },
    topInputText: {
        ...F1_18_600_24,
        color: NEGRO,
    },
    bottomInputText: {
        color: NEGRO,
        fontSize: 12,
        fontFamily: 'poppins',
        fontWeight: '400',
    },
    inputSectionDisable: {
        marginBottom: 5,
        borderRadius: 10,
        fontSize: 20,
        letterSpacing: 0,
        paddingVertical: 10,
        paddingRight: 10,
        height: 'auto',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: GRIS_CLARO,
    },
    input: {
        marginStart: 13,
        height: 'auto',
        alignContent: 'center',
        alignSelf: 'center',
        width: '100%',
        fontFamily: 'poppins',
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'auto',
        textAlignVertical: 'bottom',
        alignItems: 'flex-start',
        color: NEGRO,
    },
    aligncenter: {
        paddingHorizontal: 15,
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10, // Aquí se aplica el borde redondeado
        overflow: 'hidden', // Esto es necesario para que el borde redondeado se aplique al MapView
        marginHorizontal: 20,
        marginBottom: 30
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%'
    }

});