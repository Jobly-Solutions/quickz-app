import { ICONO_CELULAR, ICONO_CONTRAS, ICONO_CORREO, ICONO_USER, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { ButtonDialogos } from '@/components/atoms/boton-dialogos';
import { Button } from '@/components/atoms/button';
import TextField from '@/components/molecules/campo-texto';
import { Modal } from '@/components/molecules/modal';
import PassRegisterField from '@/components/molecules/password-register';
import { cambiarNombre, cambiarPassword, obtenerDatosUser, reauthenticateUser, SignOut, updateUserInformation } from '@/firebase-js/api';
import { auth } from '@/firebase-js/setup';
import { signOut } from '@/redux/slices/auth-slice';
import { BEIGE, BLACK, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { APELLIDO_TEXT, CONTRAA_TEXT, CORREO_TEXT, INGRESA_APELLIDO, INGRESA_CONTRAA, INGRESA_CORREO, INGRESA_NOMBRE, INGRESA_TELEF, NOMBRE_TEXT, TELEF_TEXT } from '@/styles/textos';
import { SIZE_TYPE } from '@/styles/typography';
import { Store, UserInformation } from '@/types';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

const { width: viewportWidth } = Dimensions.get('window');

export const EditarUserScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const [coreo, setcoreo] = useState('');
    const [coreoB, setcoreoB] = useState('');
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [contraa, setcontraa] = useState('');
    const [contrab, setcontrab] = useState('');
    const [contrac, setcontrac] = useState('');
    const [telef, settelef] = useState('');

    const [coreoError, setcoreoError] = useState('');
    const [nombreError, setnombreError] = useState('');
    const [apellidoError, setapellidoError] = useState('');
    const [contraaError, setcontraaError] = useState('');
    const [contrabError, setcontrabError] = useState('');
    const [telefError, settelefError] = useState('');

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [ishandleAlerta, setIshandleAlerta] = React.useState(false);
    const handleAlerta = () => setIshandleAlerta(() => !ishandleAlerta);
    const [mensaje, setMensaje] = useState('');
    const [contraRep, setcontraRep] = useState('');


    const [screenIsLoading, setScreenLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state: Store) => state.auth.user);
    const userData = useSelector((state: Store) => state.user_data);
    const [userInfo, setUserInfo] = useState<UserInformation>();

    if (!user) {
        SignOut().then(() => dispatch(signOut()));
    }
    useEffect(() => {
        if (user)
            obtenerDatosUser(user.uid, (doc) => {
                if (!doc) {
                    setScreenLoading(false);
                } else {
                    setUserInfo({
                        user_email: doc.user_email,
                        user_firstname: doc.user_firstname,
                        user_lastname: doc.user_lastname,
                        user_phone: doc.user_phone,
                        user_password: doc.user_password,
                    });


                    setScreenLoading(false);
                    setcoreo(doc.user_email);
                    setnombre(doc.user_firstname);
                    setapellido(doc.user_lastname);
                    settelef(doc.user_phone);
                    setcontraa(doc.user_password);
                    setcontrab(doc.user_password);
                }
            });
        else setScreenLoading(false);
    }, []);
    const guardarDatos = () => {
        if (user) {
            setIsLoading(
                true
            );
            updateUserInformation(
                // {
                //     uid: user.uid,
                //     current_password: contrab,
                //     user_firstname: nombre,
                //     user_lastname: apellido,
                //     user_email: coreo,
                //     user_phone: telef,
                //     user_password: contraa,
                // },
                    user.uid,
                    contrab,
                    nombre,
                    apellido,
                    coreo,
                    telef,
                    contraa,
                () => {
                    setIsLoading(
                        false
                    );
                    setMensaje('Perfil actualizado correctamente!');
                    handleAlerta();

                },
                () => {

                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                    setMensaje('No se pudo guardar su información');
                    handleAlerta();
                    setIsLoading(
                        false
                    );
                }
            );
        }
    };

    const validarCambios = async () => {
        handleAlerta();
        setVisible(true);
        if (nombre.length <= 0) {
            setVisible(false);
            ToastAndroid.show('Debes ingresar un nombre', ToastAndroid.LONG);
        } else if (apellido.length <= 0) {
            setVisible(false);
            ToastAndroid.show('Debes ingresar un apellido', ToastAndroid.LONG);
        } else if (coreo.length <= 0) {
            setVisible(false);
            ToastAndroid.show('Debes ingresar un correo', ToastAndroid.LONG);
        } else if (telef.length <= 0) {
            setVisible(false);
            ToastAndroid.show('Debes ingresar un telefono', ToastAndroid.LONG);
        } else if (contraa.length <= 0) {
            setVisible(false);
            ToastAndroid.show('Debes ingresar tu contraseña!', ToastAndroid.LONG);
        }
        if (contrac.length <= 0 &&
            contraa.length > 0 &&
            coreo.length > 0 &&
            telef.length > 0 &&
            apellido.length > 0 &&
            nombre.length > 0) {
            await testcuatro(contraRep, coreoB, coreo, contraa, nombre, telef, apellido);
        } else if (contrac.length > 0 &&
            contraa.length > 0 &&
            coreo.length > 0 &&
            telef.length > 0 &&
            apellido.length > 0 &&
            nombre.length > 0) {
            if (contraa.match(contraRep)) {
                await testcuatro(contraRep, coreoB, coreo, contrac, nombre, telef, apellido);
            } else {
                ToastAndroid.show('Ingresa tu contraseña actual correctamente', ToastAndroid.LONG);
            }
        }
    };

const testcuatro = async (
    contraRep: string,
    coreoB: string,
    coreo: string,
    contra: string,
    nombre: string,
    telef: string,
    apellido: string
) => {
    try {
        const credential = auth.EmailAuthProvider.credential(coreoB, contraRep);
        await reauthenticateUser(
            credential,
            coreo,
            contra,
            nombre,
            telef,
            apellido,
            () => {
                cambiarPassword(
                    credential,
                    contra,
                    () => {
                        cambiarNombre(
                            credential,
                            nombre,
                            apellido,
                            () => {
                                ToastAndroid.show('Datos guardados con éxito', ToastAndroid.LONG);
                                setVisible(false);
                            },
                            () => {
                                ToastAndroid.show('Error al cambiar el nombre', ToastAndroid.LONG);
                                setVisible(false);
                            }
                        );
                    },
                    () => {
                        ToastAndroid.show('Error al cambiar la contraseña', ToastAndroid.LONG);
                        setVisible(false);
                    }
                );
            },
            (error) => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                ToastAndroid.show(error, ToastAndroid.LONG);
                setVisible(false);
            }
        );
    } catch (error) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        ToastAndroid.show('Error en la autenticación', ToastAndroid.LONG);
        setVisible(false);
    }
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            ><ScrollView>
            <View style={styles.container}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}>
                    <ScrollView endFillColor={WHITE}
                        style={{
                            position: 'relative',
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
                                }}>Información personal</Text>
                            </View>

                        </View>

                        <View style={estilos.contenedorPantalla}>
                            <View style={estilos.contenedorVerticalRow}>
                                <View style={{ flex: 1 }}>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>

                                <Text style={{
                                    fontSize: 21,
                                    textAlign: 'left',
                                    width: '100%',
                                    marginStart: 15,
                                    marginTop: 20,
                                    fontFamily: 'poppinsBold',
                                }}>{'Información personal'}</Text>
                                <View style={{
                                    flexDirection: 'column',
                                    backgroundColor: WHITE,
                                    elevation: 6,
                                    marginTop: 15,

                                    marginBottom: 120,
                                    borderRadius: 20,
                                    paddingHorizontal: 20,
                                    marginHorizontal: 15,
                                    padding: 5,
                                }}>
                                    <TextField
                                        topText={CORREO_TEXT}
                                        placeholder={INGRESA_CORREO}
                                        icon={{
                                            name: ICONO_CORREO
                                        }}
                                        // @ts-ignore
                                        valueError={coreoError}
                                        validation={'email'}
                                        value={coreo}
                                        input={'email'}
                                        setValueError={setcoreoError}
                                        setValue={setcoreo}
                                    />
                                    <TextField
                                        topText={NOMBRE_TEXT}
                                        placeholder={INGRESA_NOMBRE}
                                        icon={{
                                            name: ICONO_USER,
                                        }}
                                        // @ts-ignore
                                        valueError={nombreError}
                                        // validation={'email'}
                                        value={nombre}
                                        input={'text'}
                                        setValueError={setnombreError}
                                        setValue={setnombre}
                                    />
                                    <TextField
                                        topText={APELLIDO_TEXT}
                                        placeholder={INGRESA_APELLIDO}
                                        icon={{
                                            name: ICONO_USER,
                                        }}
                                        // @ts-ignore
                                        valueError={apellidoError}
                                        // validation={'email'}
                                        value={apellido}
                                        input={'text'}
                                        setValueError={setapellidoError}
                                        setValue={setapellido}
                                    />

                                    <TextField
                                        topText={TELEF_TEXT}
                                        placeholder={INGRESA_TELEF}
                                        icon={{
                                            name: ICONO_CELULAR,
                                        }}
                                        // @ts-ignore
                                        valueError={telefError}
                                        // validation={'email'}
                                        value={telef}
                                        input={'text'}
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
                                        topText={'Nueva contraseña'}
                                        placeholder={'Ingresar nueva contraseña'}
                                        icon={{
                                            name: ICONO_CONTRAS,
                                        }}
                                        visible={true}
                                        valueError={contraaError}
                                        value={contrac}
                                        setValueError={setcontraaError}
                                        setValue={setcontrac}
                                    />


                                </View>

                                <View style={styles.aligncenter} />

                            </View>





                        </View>
                    </ScrollView>


                    <Modal isVisible={ishandleAlerta}>
                        <Modal.Container>
                            <Modal.Header title="Guardar datos" onPress={() => handleAlerta()} />
                            <Modal.Body>
                                <Text style={estilos.textoDialogoNegrita}>
                                    ¿Deseas guardar los cambios?
                                </Text>
                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', }}>
                                    <ButtonDialogos
                                        watercolor={false}
                                        title={'Cancelar'}
                                        onPressed={() => {
                                            handleAlerta();
                                        }} />
                                    <ButtonDialogos
                                        watercolor={true}
                                        title={'Aceptar'}
                                        onPressed={() => {
                                            validarCambios();

                                        }} />
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>

                    <View style={estilos.barra_inferior}>
                        <Button
                            title={'Actualizar'}
                            onPressed={() => { handleAlerta() }}
                        />

                    </View>




                </ImageBackground>

            </View>
            </ScrollView></KeyboardAvoidingView>
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
