import { ICONO_SUPPORT, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { nameHandler } from '@/functions/string-utilities';
import { BEIGE, BLACK, GRIS_OSCURO, RED, VERDE_CLARO, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { FirebaseUser, Store } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

const { width: viewportWidth } = Dimensions.get('window');

export const PantallaEsperaScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const [statea, setStatea] = useState(false);
    const fadeAnima = useRef(new Animated.Value(0)).current;
    const [esA, setesA] = useState(false);

    const user = useSelector((state: Store) => state.auth.user);

    const greet = (_user: null | FirebaseUser) => {
        return ` Bienenid@ ${user
                ? nameHandler(
                    user.displayName ? user.displayName : ' '
                )
                : ' '
            } `;
    };

    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
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
            <Spinner visible={visible} />

            <View style={{ alignItems: 'center', height: '100%' }}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}>
                    <ScrollView endFillColor={WHITE}
                        style={{
                            position: 'relative',
                        }}>


                        <View style={estilos.barra_superiod}>
                            <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
                                <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                            </TouchableOpacity>

                            <Text style={{

                                fontSize: 20,
                                flex: 1,
                                textAlign: 'center',
                                color: WHITE,
                                alignSelf: 'flex-end',
                                fontFamily: 'poppinsBold',
                            }}>{'En construccion'}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                                <Image style={{
                                    height: 33,
                                    width: 33, start: 3,
                                    tintColor: WHITE,
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }} source={ICONO_VOLVER} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            paddingTop: 30,
                            flexDirection: 'column',
                            width: '100%',
                            flex: 1,
                            alignItems: 'stretch',
                            borderTopEndRadius: 40,
                            borderTopStartRadius: 40,
                            backgroundColor: '#FFFFFF',
                        }}>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 25,
                            }}>

                            </View>


                        </View>
                    </ScrollView>

                </ImageBackground>

            </View>

        </>
    );
};
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    botonDashOn: {
        height: 4,
        width: '40%',
        borderRadius: 15,
        backgroundColor: VERDE_OSCURO,
        alignSelf: 'center',
    },
    botonDashOff: {
        width: 'auto',
        height: 4,
        marginHorizontal: 13,
        borderRadius: 15,
        backgroundColor: VERDE_OSCURO,
        alignSelf: 'center',
    },
    botonOn: {
        fontSize: 20,
        width: 'auto',
        textAlign: 'center',
        color: VERDE_OSCURO,
        alignSelf: 'center',
        fontFamily: 'poppinsBold',
    },
    botonOff: {
        fontSize: 20,
        width: 'auto',
        textAlign: 'center',
        color: GRIS_OSCURO,
        alignSelf: 'center',
        fontFamily: 'poppinsBold',
    },
    container: {
        justifyContent: 'center',
        backgroundColor: WHITE,
    },
    formContainer: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        backgroundColor: '#FFFFFF',
    },
    titleStyle: {
        color: RED,
        fontFamily: 'poppinsRegular',
    },
    fadingContainer: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    spinnerTextStyle: {
        color: '#FFFFFF',
    },
    contenedorPantalla: {
        flexDirection: 'column',
    },
    containeracc: {
        width: '100%',
        backgroundColor: VERDE_CLARO,
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textView: { alignItems: 'center', marginBottom: 5, marginTop: 30, flex: 1, flexDirection: 'row' },
    textPrimary: {
        fontSize: SIZE_TYPE.big,
        textAlign: 'center',
        width: '100%',
        marginTop: 30,
    },
    losePassword: {
        color: BLACK,
        fontSize: 15,
        fontFamily: 'poppinsRegular',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        marginBottom: 30,
        marginTop: 5,
    },
    aligncenter: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 120,
        alignItems: 'center',
    },
    containerBton: {
        marginBottom: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    SectionStyle: {
        flex: 3,
        top: 45,
    },
    registerbuttonStyle: {
        backgroundColor: BEIGE,
        height: 40,
        width: viewportWidth * 0.65,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        marginBottom: 20,
    },
    loginbuttonTextStyle: {
        color: WHITE,
        paddingVertical: 8,
        fontSize: 18,
    },
    registerbuttonTextStyle: {
        color: WHITE,
        paddingVertical: 8,
        fontSize: 18,
    },
    imgStart: {
        width: '70%',
        height: '70%',
        borderRadius: 7,
    },
    registerNow: {
        fontSize: 15,
        fontFamily: 'poppinsRegular',
        textDecorationLine: 'underline',
    },
    donthaveacc: {
        fontSize: 15,
        fontFamily: 'poppinsRegular',
    },
});