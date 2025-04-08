import { ICONO_CELULAR, ICONO_CONTRAS, ICONO_CORREO, ICONO_SUPPORT, ICONO_USER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import TextRegisterField from '@/components/molecules/campo-register';
import PassRegisterField from '@/components/molecules/password-register';
import { InputCode } from '@/components/organisms/input-code';
import { signUpUser } from '@/firebase-js/api';
import { auth } from '@/firebase-js/setup';
import { useIsMounted } from '@/hooks/useIsMounted';
import { BEIGE, BLACK, GRIS_OSCURO, RED, VERDE_CLARO, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { APELLIDO_TEXT, CONTRAA_TEXT, CONTRAB_TEXT, CORREO_TEXT, CREAR_CUENTA, INGRESA_APELLIDO, INGRESA_CONTRAA, INGRESA_CONTRAB, INGRESA_CORREO, INGRESA_NOMBRE, INGRESA_TELEF, INGRESA_TUS_DATOS, NOMBRE_TEXT, TELEF_TEXT } from '@/styles/textos';
import { FONT_SIZE_26, SIZE_TYPE } from '@/styles/typography';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth } = Dimensions.get('window');

const ROLES = [
    {
        title: 'Selecciona tu rol',
        data: ['Supervisor', 'Empleado'],
    },

];
const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);


export const PantallaRegistro = () => {
    const navigation = useNavigation();
    const isMounted = useIsMounted();
    const [messageAlert, setMessageAlert] = useState('');
    const [alert, setAlert] = useState(false);

    const [isLoading, setIsLoading] = useState<true | false>(false);
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const [coreo, setcoreo] = useState('');
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [contraa, setcontraa] = useState('');
    const [contrab, setcontrab] = useState('');
    const [telef, settelef] = useState('');
    const [verificacion, setverificacion] = useState(false);

    const [coreoError, setcoreoError] = useState('');
    const [nombreError, setnombreError] = useState('');
    const [apellidoError, setapellidoError] = useState('');
    const [contraaError, setcontraaError] = useState('');
    const [contrabError, setcontrabError] = useState('');
    const [telefError, settelefError] = useState('');

    const [picked, setPicked] = useState(1.15);

    const [code, setcode] = useState('');
    const [credencial, setCredencial] = useState('');

    const recaptchaVerifier = React.useRef(null);
    const [verificationId, setVerificationId] = useState('');
    const recaptchaToken = useRef(null);
    // const applicationVerifier = new FirebaseRecaptchaVerifier(recaptchaVerifier);
    const [mensaje, setMensaje] = useState('');

    const [shop, setshop] = useState('');
    const [direccion, setDireccion] = useState('');
    const [role, setRole] = useState('');

    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState(null);


    const cambiarPantalla = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        enviarCodigo();
        setverificacion(true);
    };


    const enviarCodigo = async () => {
        try {
            // const confirmation = await auth().signInWithPhoneNumber(`+54${telef}`, true);
            const confirmation = await auth().verifyPhoneNumber(`+54${telef}`);
            setVerificationId(String(confirmation.verificationId));
        } catch (error) {
            console.error('Error al enviar código:', error);
        }
        // verifyPhoneNumber(`+54${telef}`)
    };

    // Handle the verify phone button press
    /* async function verifyPhoneNumber(phoneNumber:string) {
        const confirmation = await auth().verifyPhoneNumber(phoneNumber);
        setConfirm(confirmation);
    } */

    const crearCuenta = () => {
        // setIsLoading(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        signUpUser(
            coreo,
            contraa,
            nombre,
            apellido,
            telef,
            async () => {
                /* if (isMounted.current)
                    setIsLoading(false); */
            },
            (errorMessage) => {
                setMensaje(errorMessage);
                // setIsLoading(false);
            },
        );
    };

    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title='Error al registrarse'
                titleStyle={estilos.textTitulo}
                message={messageAlert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                onDismiss={() => _cleanAlert()}
                showConfirmButton={false}
            />
            <Spinner visible={isLoading} />

            {!verificacion ?
                <View style={estilos.contenedor}>

                    <ImageBackground
                        source={IMAGE_BACKGROUND}
                        resizeMode='stretch'
                        style={estilos.backgroundimage}>

                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                            <>
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
                                    paddingHorizontal: 15,
                                    alignItems: 'stretch',
                                    borderTopEndRadius: 40,
                                    borderTopStartRadius: 40,
                                    backgroundColor: '#FFFFFF',
                                }}>
                                    <View>

                                        <Text style={{
                                            textAlign: 'center',
                                            width: '100%',
                                            fontWeight: '600',
                                            fontSize: 24,
                                            lineHeight: 38,
                                            height: 'auto',
                                            alignSelf: 'flex-start',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 20,
                                            includeFontPadding: false,
                                            textAlignVertical: 'bottom',
                                            fontFamily: 'poppinsSemiBold',
                                        }}>
                                            {INGRESA_TUS_DATOS}
                                        </Text>

                                        <TextRegisterField
                                            topText={CORREO_TEXT}
                                            placeholder={INGRESA_CORREO}
                                            icon={{
                                                name: ICONO_CORREO,
                                            }}
                                            visible={true}
                                            // @ts-ignore
                                            valueError={coreoError}
                                            value={coreo}
                                            setValueError={setcoreoError}
                                            setValue={setcoreo}
                                            autoCompleteType='email'
                                        />
                                        <TextRegisterField
                                            topText={NOMBRE_TEXT}
                                            placeholder={INGRESA_NOMBRE}
                                            icon={{
                                                name: ICONO_USER,
                                            }}
                                            visible={true}
                                            // @ts-ignore
                                            valueError={nombreError}
                                            value={nombre}
                                            setValueError={setnombreError}
                                            setValue={setnombre}
                                        />
                                        <TextRegisterField
                                            topText={APELLIDO_TEXT}
                                            placeholder={INGRESA_APELLIDO}
                                            icon={{
                                                name: ICONO_USER,
                                            }}
                                            // @ts-ignore
                                            visible={false}
                                            valueError={apellidoError}
                                            value={apellido}
                                            setValueError={setapellidoError}
                                            setValue={setapellido}
                                        />

                                        <TextRegisterField
                                            topText={TELEF_TEXT}
                                            placeholder={INGRESA_TELEF}
                                            icon={{
                                                name: ICONO_CELULAR,
                                            }}
                                            visible={true}
                                            // @ts-ignore
                                            valueError={telefError}
                                            value={telef}
                                            setValueError={settelefError}
                                            setValue={settelef}
                                        />
                                        <PassRegisterField
                                            topText={CONTRAA_TEXT}
                                            placeholder={INGRESA_CONTRAA}
                                            icon={{
                                                name: ICONO_CONTRAS,
                                            }}
                                            visible={true}
                                            valueError={contraaError}
                                            value={contraa}
                                            setValueError={setcontraaError}
                                            setValue={setcontraa}
                                        />
                                        <PassRegisterField
                                            topText={CONTRAB_TEXT}
                                            placeholder={INGRESA_CONTRAB}
                                            icon={{
                                                name: ICONO_CONTRAS,
                                            }}
                                            visible={true}
                                            valueError={contrabError}
                                            value={contrab}
                                            setValueError={setcontrabError}
                                            setValue={setcontrab}
                                        />

                                        <View style={{ marginTop: 30, }}>
                                            <Button
                                                title={CREAR_CUENTA}
                                                onPressed={() => cambiarPantalla()}
                                            />
                                        </View>
                                    </View>

                                    <View style={[estilos.textosCentrales, { marginTop: 10, }]}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontFamily: 'poppinsRegular',
                                        }}>
                                            Ya tenes cuenta?{' '}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate(
                                                    'Start'
                                                )
                                            }
                                        >
                                            <Text style={{
                                                fontSize: 17,
                                                fontFamily: 'poppinsRegular',
                                                textDecorationLine: 'underline',
                                            }}>
                                                Inicia sesión
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </>
                        </ScrollView>

                    </ImageBackground>

                </View>
                :
                <InputCode telef={telef} crearCuenta={crearCuenta} cambiarPantalla={cambiarPantalla} />
            }

            {/* <FirebaseRecaptchaVerifierModal
                                        ref={recaptchaVerifier}
                                        firebaseConfig={firebase.app().options} 
  title='Anti-spam'
  cancelLabel='Close' /> */}
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
    codeContainer: {
        flex: 1,
        borderTopEndRadius: 40,
        paddingHorizontal: 15,
        borderTopStartRadius: 40,
        backgroundColor: '#FFFFFF',
    },
    codeImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    codeText: {
        textAlign: 'center',
        fontSize: FONT_SIZE_26,
        // lineHeight: 39,
        fontFamily: 'poppins',
        fontWeight: '700',
    },
    nextButtonContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
});