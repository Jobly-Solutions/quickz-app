import { ICONO_CONTRAS, ICONO_CORREO, ICONO_SUPPORT } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import { Checkbox } from '@/components/atoms/checkbox';
import TextField from '@/components/molecules/campo-texto';
import PassRegisterField from '@/components/molecules/password-register';
import constraints from '@/components/organisms/constraintsValidation';
import { LoginWithEmail } from '@/firebase-js/api';
import { BACKGROUND_COLOR, BEIGE, BLACK, GRIS_OSCURO, RED, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { CONTRAA_TEXT, CORREO_TEXT, INGRESA_CONTRAA, INGRESA_CORREO, INICIAR_SESION, MENSAJE_BIENVENIDA } from '@/styles/textos';
import { SIZE_TYPE } from '@/styles/typography';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import validate from 'validate.js';

const { width: viewportWidth } = Dimensions.get('window');

export const StartScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [esA, setesA] = useState(false);
    const [checked, setChecked] = useState(false);
    const [value, setValue] = useState('');
    const [statea, setStatea] = useState(false);

    const navigation = useNavigation();
    navigation.addListener('beforeRemove', (e: any) => {
        e.preventDefault();
    });

    const _onPressLogin = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setEmailError(validate.single(email, constraints.email));
        setPasswordError(
            validate.single(password, constraints.password)
        );
        setVisible(true);
        LoginWithEmail(
            email,
            password,
            () => {
                setVisible(false);
            },
            (errorMessage) => {
                setAlert(true);
                setVisible(false);
                setMessageAlert(errorMessage);
            }
        );
    };
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };
    const _isValidLogin = () => {
        return (
            emailError === undefined && passwordError === undefined
        );
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
                        <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
                            <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        paddingTop: 24,
                        flexDirection: 'column',
                        width: '100%',
                        flex: 1,
                        alignItems: 'stretch',
                        borderTopEndRadius: 40,
                        paddingHorizontal: 15,
                        borderTopStartRadius: 40,
                        backgroundColor: '#FFFFFF',
                    }}>
                        <Text style={{
                            textAlign: 'left',
                            width: '100%',
                            fontWeight: '600',
                            fontSize: 24,
                            lineHeight: 38,
                            height: 'auto',
                            alignSelf: 'flex-start',
                            alignContent: 'flex-start',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginTop: 30,
                            marginBottom: 15,
                            includeFontPadding: false,
                            textAlignVertical: 'bottom',
                            fontFamily: 'poppinsBold',
                        }}>
                            {MENSAJE_BIENVENIDA}
                        </Text>


                        <View>


                            <TextField
                                topText={CORREO_TEXT}
                                placeholder={INGRESA_CORREO}
                                icon={{
                                    name: ICONO_CORREO,
                                }}
                                // @ts-ignore
                                valueError={emailError}
                                validation={'email'}
                                value={email}
                                input={'email'}
                                setValueError={setEmailError}
                                setValue={setEmail}
                                autoCompleteType='email'
                            />
                            <PassRegisterField
                                topText={CONTRAA_TEXT}
                                placeholder={INGRESA_CONTRAA}
                                icon={{
                                    name: ICONO_CONTRAS,
                                }}
                                visible={true}
                                valueError={passwordError}
                                value={password}
                                setValueError={setPasswordError}
                                setValue={setPassword}
                            />

                            <View style={{
                                marginTop: 5,
                                height: 'auto', width: '100%', flexDirection: 'row'
                            }}>
                                <Checkbox checked={checked} onPress={() => { setChecked(!checked), setStatea(true) }} />
                                <Text style={{
                                    color: BLACK,
                                    fontSize: 13,
                                    fontFamily: 'poppinsLight',
                                    textDecorationLine: 'underline',
                                    marginBottom: 30,
                                    marginTop: 5,
                                }}>
                                    Aceptar términos y condiciones
                                </Text>

                            </View>
                            <Text style={styles.losePassword}>
                                ¿Olvidaste tu contraseña?
                            </Text>

                            <View style={styles.aligncenter}>
                                <Button
                                    title={INICIAR_SESION}
                                    onPressed={() => _onPressLogin()}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1 }}></View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            width: '100%',
                            marginBottom: 15,
                            marginTop: 5,
                            backgroundColor: '#FFFFFF',
                        }}>
                            <Text style={styles.donthaveacc}>
                                Aún no estás registrado?{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (statea) {
                                        navigation.navigate(
                                            'Register'
                                        )
                                    } else {
                                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                                        setAlert(true);
                                        setMessageAlert('Debes Aceptar los términos y condiciones para continuar');
                                    }
                                }
                                }
                            >
                                <Text style={styles.registerNow}>
                                    Crear cuenta
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>




                </ImageBackground>

            </View>

        </>
    );
};
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    botonDashOn: {
        height: 3,
        width: '35%',
        borderRadius: 15,
        backgroundColor: VERDE_OSCURO,
        alignSelf: 'center',
    },
    botonDashOff: {
        width: 'auto',
        height: 4,
        marginHorizontal: 5,
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
        fontFamily: 'poppinsMedium',
    },
    botonOff: {
        fontSize: 20,
        width: 'auto',
        textAlign: 'center',
        color: GRIS_OSCURO,
        alignSelf: 'center',
        fontFamily: 'poppinsLight',
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
    spinnerTextStyle: {
        color: '#FFFFFF',
    },
    contenedorPantalla: {
        flexDirection: 'column',
    },
    containeracc: {
        width: '100%',
        backgroundColor: BACKGROUND_COLOR,
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
