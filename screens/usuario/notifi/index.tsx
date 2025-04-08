import { ICONO_ALERT_OFF, ICONO_ALERT_ON, ICONO_PUNTO, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { obtenerDatosUser, updateUserNotify } from '@/firebase-js/api';
import { ALERT, BEIGE, BLACK, GRIS_CLARO, GRIS_OSCURO, NEGRO, RED, VERDE_CLARO, WARNING, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { Store } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

const { width: viewportWidth } = Dimensions.get('window');

export const NotifUserScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [notify, setNotify] = useState(true);
    const [messageAlert, setMessageAlert] = useState('');

    const user = useSelector((state: Store) => state.auth.user);

    useEffect(() => {
        if (user)
            obtenerDatosUser(user.uid, (doc) => 
                setNotify(doc.user_notify));
    }, []);

    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const updateNotify = (user_notify: boolean) => {
        updateUserNotify(user.uid, user_notify);
        setNotify(user_notify);
    };

    const checkNotify = () => updateNotify(!notify);
    
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

            <View style={styles.container}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}>

                    <ScrollView endFillColor={WHITE}
                        style={{
                            position: 'relative',
                            paddingBottom: 60,
                        }}>

                        <View style={estilos.barra_superiod}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={estilos.iconoVolver} onPress={() => { navigation.goBack() }}>
                                    <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                                </TouchableOpacity>
                                <Text style={{

                                    fontSize: 20,
                                    flex: 1,
                                    textAlign: 'center',
                                    color: WHITE,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsBold',
                                }}>Notificaciones</Text>
                            </View>

                        </View>

                        <View style={estilos.contenedorPantalla}>

                            <Text style={{
                                fontSize: 17,
                                textAlign: 'left',
                                width: 'auto',
                                flex: 1,
                                marginHorizontal: 20,
                                marginTop: 25,
                                fontFamily: 'poppinsSemiBold',
                            }}>{'¿Deseas recibir notificaciones de noticias o promociones?'}</Text>
                            <View style={{ flex: 1 }}>

                                <View style={{
                                    flexDirection: 'column', paddingHorizontal: 15,
                                    marginBottom: 100,
                                    paddingVertical: 5,
                                }}>
                                    <TouchableOpacity style={{ flex: 1, marginVertical: 10, flexDirection: 'row' }} onPress={() => { checkNotify() }}>
                                        {notify ?
                                            <Image style={{
                                                height: 20,
                                                margin: 4,
                                                width: 20,
                                                tintColor: VERDE_CLARO,
                                                alignContent: 'center',
                                                alignSelf: 'center',
                                            }} source={ICONO_PUNTO} />
                                            :
                                            <Image style={{
                                                height: 20,
                                                margin: 4,
                                                width: 20,
                                                tintColor: GRIS_CLARO,
                                                alignContent: 'center',
                                                alignSelf: 'center',
                                            }} source={ICONO_PUNTO} />
                                        }

                                        <Text style={{
                                            color: NEGRO,
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 17,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            alignContent: 'center',
                                            textAlign: 'left',
                                            marginHorizontal: 8,
                                            padding: 0,
                                            includeFontPadding: false,
                                        }}>{'Si deseo recibir'}</Text>
                                        <Image style={{
                                            height: 30,
                                            margin: 4,
                                            width: 30,
                                            tintColor: WARNING,
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                        }} source={ICONO_ALERT_ON} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, marginVertical: 10, flexDirection: 'row' }} onPress={() => { checkNotify() }}>
                                        {!notify ?
                                            <Image style={{
                                                height: 20,
                                                margin: 4,
                                                width: 20,
                                                tintColor: VERDE_CLARO,
                                                alignContent: 'center',
                                                alignSelf: 'center',
                                            }} source={ICONO_PUNTO} />
                                            :
                                            <Image style={{
                                                height: 20,
                                                margin: 4,
                                                width: 20,
                                                tintColor: GRIS_CLARO,
                                                alignContent: 'center',
                                                alignSelf: 'center',
                                            }} source={ICONO_PUNTO} />
                                        }


                                        <Text style={{
                                            color: NEGRO,
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 17,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            alignContent: 'center',
                                            textAlign: 'left',
                                            marginHorizontal: 8,
                                            padding: 0,
                                            includeFontPadding: false,
                                        }}>{'No deseo recibir'}</Text>
                                        <Image style={{
                                            height: 30,
                                            margin: 4,
                                            width: 30,
                                            tintColor: ALERT,
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                        }} source={ICONO_ALERT_OFF} />
                                    </TouchableOpacity>
                                    <Text style={{
                                        color: GRIS_OSCURO,
                                        fontFamily: 'poppinsRegular',
                                        fontSize: 15,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        textAlign: 'center',
                                        alignSelf: 'center',
                                        marginVertical: 15,
                                        marginHorizontal: 1,
                                        padding: 0,
                                        includeFontPadding: false,
                                    }}>{'(Podrás modificar esta opción si te arrepientes)'}</Text>


                                </View>
                                <View style={styles.aligncenter} />

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
