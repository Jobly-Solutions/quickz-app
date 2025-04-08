import { ICONO_AVANZAR, ICONO_BORRAR, ICONO_CARRO, ICONO_COMPRAR, ICONO_HOME, ICONO_PUNTO, ICONO_SUPPORT, ICONO_UPLOAD, ICONO_USER, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGEN_LOGOUT } from '@/assets/images';
import { UI_BANNERINF } from '@/assets/ui';
import { ButtonDialogos } from '@/components/atoms/boton-dialogos';
import { Modal } from '@/components/molecules/modal';
import { agregarFotoPerfil, cargarFotoPerfil, obtenerDatosUser, SignOut } from '@/firebase-js/api';
import { signOut } from '@/redux/slices/auth-slice';
import { BEIGE, BLACK, NAVBAR_BUTTON, NEGRO, RED, VERDE_CLARO, VERDE_LINDO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { Store, UserInformation } from '@/types';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
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
import { useDispatch, useSelector } from 'react-redux';

const { width: viewportWidth } = Dimensions.get('window');

export const DatosUserScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user = useSelector((state: Store) => state.auth.user);
    const userData = useSelector((state: Store) => state.user_data);
    const [userInfo, setUserInfo] = useState<UserInformation>({});

    const [imagen, setimagen] = useState('');
    const [ishandleFoto, sethandleFoto] = React.useState(false);
    const handleFoto = () => sethandleFoto(() => !ishandleFoto);


    if (!user) {
        SignOut().then(() => dispatch(signOut()));
    }
    useEffect(() => {
        if (user)
            obtenerDatosUser(user.uid, (doc) => {
                if (!doc) {
                    setVisible(false);
                } else {
                    setUserInfo({
                        user_email: doc.user_email,
                        user_firstname: doc.user_firstname,
                        user_lastname: doc.user_lastname,
                        user_phone: doc.user_phone,
                        user_password: doc.user_password,
                        user_image: doc.user_image,
                    });
                    setimagen(doc.user_image);
                    setVisible(false);
                }
            });
        else setVisible(false);
    }, []);
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 2],
            // maxWidth: 150,
            // maxHeight: 150,
            quality: 0.9,
        });

        if (!result.canceled) {
            setimagen(result.assets[0].uri); // 🔹 Ahora la URI se encuentra en `result.assets`
            sethandleFoto(true);
        }
    };

    const crgrfoto = async (magen: null) => {
        setVisible(true),
            cargarFotoPerfil(
                user.uid,
                imagen,
                (refe) => {
                    continuar(refe)
                },
                () => {
                    setAlert(true); setVisible(false);
                    setMessageAlert('Error al cargar la imagen, revise su conexion de internet');
                },);
    };

    const continuar = async (url: string) => {
        await agregarFotoPerfil(
            user.uid,
            url,
            () => {
                setVisible(false);
                setimagen(url);
                navigation.navigate('MisDatos');
            },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('Error al cargar la imagen, revise su conexion de internet');
            },
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
                {/* <ImageBackground
                source={IMAGE_BACKGROUND}
                resizeMode='stretch'
                style={estilos.backgroundimage}> */}
                <View style={estilos.backgroundimage}>
                    <ScrollView endFillColor={WHITE}
                        style={{
                            position: 'relative',
                            paddingBottom: 60,
                        }}>

                        <View style={estilos.barra_superiod}>
                            <View style={{ flex: 1, }}>
                                <TouchableOpacity style={estilos.iconoVolver} onPress={() => { navigation.navigate('Home') }}>
                                    <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 20,
                                    flex: 1,
                                    textAlign: 'center',
                                    color: WHITE,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsBold',
                                }}>Mi cuenta</Text>
                            </View>

                        </View>

                        <View style={estilos.contenedorPantalla}>
                            <View style={estilos.contenedorVerticalRow}>

                                <TouchableOpacity style={estilos.iconoUserFoto} onPress={() => { handleFoto() }}>
                                    {imagen ?
                                        <Image style={estilos.iconoUserFoto} source={{ uri: imagen }} />
                                        : <View style={{
                                            height: 65,
                                            width: 65,
                                            backgroundColor: NAVBAR_BUTTON,
                                            borderRadius: 60,
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                        }}>
                                            <Image style={estilos.iconoUser} source={ICONO_USER} />

                                        </View>
                                    }
                                </TouchableOpacity>

                                <View style={{ flex: 1, marginStart: 15, }}>
                                    <Text style={estilos.textTituloGrande}>{userInfo.user_firstname} {userInfo.user_lastname}</Text>
                                    <Text style={estilos.textoMedio}>{userInfo.user_email}</Text>


                                </View>
                            </View>
                            <Text style={{
                                color: NEGRO,
                                fontFamily: 'poppinsMedium',
                                fontSize: 20,
                                marginHorizontal: 15,
                                marginTop: 10,
                                marginStart: 15,
                                letterSpacing: 0,
                                textAlignVertical: 'center',
                                width: 'auto',
                                height: 'auto',
                            }}>{'Mi cuenta'}</Text>
                            <View style={{ flex: 1 }}>

                                <View style={{
                                    flexDirection: 'column', paddingHorizontal: 15,
                                    paddingVertical: 5,
                                }}>
                                    <TouchableOpacity style={estilos.botonBlanco} onPress={() => { navigation.navigate('Editar') }}>
                                        <Icon name="person" size={30} color={NAVBAR_BUTTON} />
                                        <View style={estilos.contenedorHorizontalCentro}>
                                            <Text style={estilos.textoMedio}>{'Información personal'}</Text>
                                            <Text style={estilos.textoFino}>{'Email/Usuario/Celular/Contraseña'}</Text>
                                        </View>
                                        <Image style={estilos.iconoBotonPeque} source={ICONO_AVANZAR} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={estilos.botonBlanco} onPress={() => { navigation.navigate('Notifica') }}>
                                        <Icon name="notifications" size={30} color="gold" />
                                        <View style={estilos.contenedorVertical}>
                                            <Text style={estilos.textoCentro}>{'Notificaciones'}</Text>
                                        </View>
                                        <Image style={estilos.iconoBotonPeque} source={ICONO_AVANZAR} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={estilos.botonBlanco} onPress={() => { navigation.navigate('Queja') }}>
                                        <Image style={estilos.iconoBoton} source={ICONO_SUPPORT} />
                                        <View style={estilos.contenedorVertical}>
                                            <Text style={estilos.textoCentro}>{'Soporte técnico'}</Text>
                                        </View>
                                        <Image style={estilos.iconoBotonPeque} source={ICONO_AVANZAR} />
                                    </TouchableOpacity>


                                </View>
                                <Text style={{
                                    color: NEGRO,
                                    fontFamily: 'poppinsMedium',
                                    fontSize: 20,
                                    marginHorizontal: 15,
                                    marginTop: 10,
                                    marginStart: 15,
                                    letterSpacing: 0,
                                    textAlignVertical: 'center',
                                    width: 'auto',
                                    height: 'auto',
                                }}>{'Informacion Legal'}</Text>
                                <View style={{
                                    flexDirection: 'column', paddingHorizontal: 15,
                                    marginBottom: 100,
                                    paddingVertical: 5,
                                }}>
                                    <TouchableOpacity style={estilos.botonBlanco} onPress={() => { navigation.navigate('Terminos') }}>
                                        <Icon name="document-text-outline" size={30} color="black" />
                                        <View style={estilos.contenedorVertical}>
                                            <Text style={estilos.textoCentro}>{'Términos y condiciones'}</Text>
                                        </View>
                                        <Image style={estilos.iconoBotonPeque} source={ICONO_AVANZAR} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={estilos.botonBlanco} onPress={() => { navigation.navigate('Politicas') }}>
                                        <Icon name="shield-checkmark" size={30} color={NAVBAR_BUTTON} />
                                        <View style={estilos.contenedorVertical}>
                                            <Text style={estilos.textoCentro}>{'Politicas de privacidad'}</Text>
                                        </View>
                                        <Image style={estilos.iconoBotonPeque} source={ICONO_AVANZAR} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={estilos.botonBlanco} onPress={() => {
                                        SignOut().then(() => {
                                            dispatch(signOut());
                                        })
                                    }}>
                                        <Image style={estilos.iconoBotonRojo} source={IMAGEN_LOGOUT} />
                                        <View style={estilos.contenedorVertical}>
                                            <Text style={estilos.textoCentro}>{'Cerrar sessión'}</Text>
                                        </View>
                                    </TouchableOpacity>


                                </View>

                                <View style={styles.aligncenter} />

                            </View>





                        </View>
                    </ScrollView>



                    <View style={estilos.barra_inferior}>
                        <ImageBackground
                            source={UI_BANNERINF}
                            resizeMode='stretch'
                            style={estilos.backgroundiferior}
                        >


                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('Home')}>
                                <Image style={estilos.iconosInferior} source={ICONO_HOME} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('Pedidos')}>
                                <Image style={estilos.iconosInferior} source={ICONO_COMPRAR} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('MiCarro')}>
                                <Image style={estilos.iconosInferior} source={ICONO_CARRO} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('MisDatos')}>
                                <Image style={{
                                    height: 40,
                                    width: 40,
                                    resizeMode: 'contain',
                                    tintColor: VERDE_LINDO,
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }} source={ICONO_USER} />
                                <Image style={estilos.puntoInferior} source={ICONO_PUNTO} />
                            </TouchableOpacity>

                        </ImageBackground>

                    </View>

                    <Modal isVisible={ishandleFoto}>
                        <Modal.Container>
                            <Modal.Header title="Cambiar imagen de perfil" onPress={() => handleFoto()} />
                            <Modal.Body>
                                <Text style={estilos.textoDialogoGris}>
                                    Una foto ayudará a las personas a reconocerte y te permitirá saber cuando hayas accedido a la cuenta
                                </Text>
                                <View style={{
                                    height: 95,
                                    paddingStart: 20,
                                    paddingVertical: 15,
                                    width: '100%', flexDirection: 'row'
                                }}>
                                    <View style={{
                                        height: 95,
                                        width: 95,
                                        backgroundColor: VERDE_LINDO,
                                        borderRadius: 60,
                                        marginEnd: 15,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignSelf: 'flex-start',
                                    }}>
                                        {imagen ?
                                            <Image style={{
                                                backgroundColor: WHITE,
                                                borderRadius: 60, height: 89,
                                                width: 89,
                                                alignContent: 'center',
                                                alignSelf: 'center',
                                            }} source={{ uri: imagen }} />
                                            :
                                            <Image style={{
                                                backgroundColor: WHITE,
                                                borderRadius: 60, height: 89,
                                                width: 89,
                                                tintColor: WHITE,
                                                alignContent: 'center',
                                                alignSelf: 'center',
                                            }} source={ICONO_USER} />

                                        }
                                    </View>

                                    <View style={{ justifyContent: 'center', height: 95, width: 'auto' }}>
                                        <View style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>

                                            <TouchableOpacity onPress={() => { pickImage() }}>

                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                                    <Image style={{
                                                        height: 15,
                                                        width: 15,
                                                        resizeMode: 'contain',
                                                        tintColor: NEGRO,
                                                        marginHorizontal: 5,
                                                        marginVertical: 10,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_UPLOAD} />
                                                    <Text style={{

                                                        fontSize: 14,
                                                        textAlign: 'center',
                                                        textDecorationLine: 'underline',
                                                        color: NEGRO,
                                                        alignSelf: 'center',
                                                        fontFamily: 'poppinsLight',
                                                    }}>{'Cargar imagen'}</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => { setimagen(null) }}>

                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                                    <Image style={{
                                                        height: 15,
                                                        width: 15,
                                                        resizeMode: 'contain',
                                                        tintColor: NEGRO,
                                                        marginHorizontal: 5,
                                                        marginVertical: 10,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_BORRAR} />
                                                    <Text style={{

                                                        fontSize: 14,
                                                        textAlign: 'center',
                                                        textDecorationLine: 'underline',
                                                        color: NEGRO,
                                                        alignSelf: 'center',
                                                        fontFamily: 'poppinsLight',
                                                    }}>{'Eliminar imagen'}</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>


                                </View>
                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 20, }}>
                                    <View style={{ marginHorizontal: 5 }}>
                                        <ButtonDialogos
                                            watercolor={false}
                                            title={'Cerrar'}
                                            onPressed={() => {
                                                handleFoto();
                                            }} />

                                    </View>
                                    <View style={{ marginHorizontal: 5 }}>
                                        <ButtonDialogos
                                            watercolor={true}
                                            disabled={imagen ? false : true}
                                            title={'Guardar'}
                                            onPressed={() => {
                                                handleFoto();
                                                crgrfoto(imagen);
                                            }} />
                                    </View>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>

                    {/* </ImageBackground> */}
                </View>

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
