import { ICONO_CALL, ICONO_MAIL, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND, WHATS_ICO } from '@/assets/images';
import { BEIGE, BLACK, NEGRO, RED, VERDE_CLARO, WHATSAPP, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth } = Dimensions.get('window');

export const SoporteGenScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const navigation = useNavigation();
    const abirMail = async () => {
        Linking.openURL('mailto:walledeyes.6@gmail.com?subject=Ingresa una consulta&body=Ingresa una Descripcion')
    };
    const abirLLamada = async () => {
        Linking.openURL('tel:+59 264 627 6291')
    };
    const abrirWhatsapp = () => {


        // Here we are using 91 which is India Country Code.
        // You can change country code.
        let URL = 'whatsapp://send?text=' + '' + '&phone=+54' + '2646276291';

        Linking.openURL(URL)
            .then((data) => {
                console.info('WhatsApp abierto');
            })
            .catch(() => {
                Alert.alert('No detectamos Whatsapp en tu dispositivo');
            });
    };

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

            <View style={styles.container}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}>
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
                            }}>Soporte técnico</Text>
                        </View>

                    </View>

                    <View style={estilos.contenedorPantalla}>
                        <Text style={{
                            fontSize: 22,
                            textAlign: 'left',
                            width: '100%',
                            marginTop: 20,
                            fontFamily: 'poppinsBold',
                        }}>{''}</Text>
                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1, justifyContent: 'center' }}>

                                <Text style={{
                                    fontSize: 18,
                                    marginTop: 20,
                                    textAlign: 'center',
                                    color: NEGRO,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsSemiBold',
                                }}>Contactate con nosotros vía Whatsapp</Text>

                                <TouchableOpacity

                                    onPress={() => { abrirWhatsapp() }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 'auto', alignSelf: 'center',
                                        width: 'auto', backgroundColor: WHITE, borderRadius: 50, padding: 25, elevation: 4, margin: 25, flexShrink: 1
                                    }}>
                                        <Image style={{
                                            height: 40,
                                            width: 40,
                                            tintColor: WHATSAPP,
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                        }} source={WHATS_ICO} />
                                    </View>
                                </TouchableOpacity>

                                <Text style={{
                                    fontSize: 18,
                                    marginTop: 20,
                                    textAlign: 'center',
                                    color: NEGRO,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsSemiBold',
                                }}>Contactate con nosotros vía llamada</Text>
                                <TouchableOpacity

                                    onPress={() => { abirLLamada() }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 'auto', alignSelf: 'center',
                                        width: 'auto', backgroundColor: WHITE, borderRadius: 50, padding: 25, elevation: 4, margin: 25, flexShrink: 1
                                    }}>
                                        <Image style={{
                                            height: 40,
                                            width: 40,
                                            tintColor: VERDE_CLARO,
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                        }} source={ICONO_CALL} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{
                                    marginTop: 20,
                                    fontSize: 18,
                                    textAlign: 'center',
                                    color: NEGRO,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsSemiBold',
                                }}>Contactate con nosotros vía mail</Text>
                                <TouchableOpacity

                                    onPress={() => { abirMail() }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 'auto', alignSelf: 'center',
                                        width: 'auto', backgroundColor: WHITE, borderRadius: 50, padding: 25, elevation: 4, margin: 25, flexShrink: 1
                                    }}>
                                        <Image style={{
                                            height: 40,
                                            width: 40,
                                            alignContent: 'center',
                                            tintColor: VERDE_CLARO,
                                            alignSelf: 'center',
                                        }} source={ICONO_MAIL} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>

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
