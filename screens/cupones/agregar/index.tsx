import { ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import TextCupones from '@/components/molecules/campo-cupones';
import { BEIGE, BLACK, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { AGREGAR_CUPON, TITULO_CUPONES_AGREGAR } from '@/styles/textos';
import { SIZE_TYPE } from '@/styles/typography';
import { Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { agregarCupon, obtenerDatosCupon, SignOut } from '@/firebase-js/api';
import { signOut } from '@/redux/slices/auth-slice';

const { width: viewportWidth } = Dimensions.get('window');

export const AgregarCuponScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const user = useSelector((state: Store) => state.auth.user);
    if (!user) {
        SignOut().then(() => dispatch(signOut()));
    }

    const navigation = useNavigation();

    const leercupon = async (id: string) => {
        const idTienda = await AsyncStorage.getItem('@shopid');
        if (idTienda != null) {
             obtenerDatosCupon(
                idTienda,
                id,
                (doc) => {
                    if (!doc) {
                        setVisible(false);
                        setAlert(true);
                        setMessageAlert('El cupon ingresado no existe, o no quedan mas disponibles');
                    } else {
                        AgregarCupones(
                            id,
                            doc.coupon_quantity,
                            doc.coupon_description,
                            doc.coupon_img,
                            doc.coupon_amount,
                            doc.coupon_expires_at,
                            doc.coupon_created_at);
                            
                        navigation.goBack();
                    }
                }
            )
        }        
    };

    const AgregarCupones = (id: string, quantity: string, description: string, img: string, amount: string, expires_at: string, created_at: string) => {
        agregarCupon(
            user.uid,
            id,
            quantity,
            description,
            img,
            amount,
            expires_at,
            created_at,
            () => {
                setVisible(false);
                navigation.navigate('Lista');
            },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('Error agregando el cupon, intenta nuevamente mas tarde');
            }
        );
    };

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };
    const [cupon, setcupon] = useState('');

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
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity style={{
                            height: 33,
                            width: 33, start: 3,
                            position: 'relative',
                            alignContent: 'center',
                            alignSelf: 'center',
                        }} onPress={() => { navigation.goBack() }}>
                            <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                        </TouchableOpacity>


                    </View>

                    <View style={estilos.contenedorPantalla}>
                        <Text style={{
                            fontSize: 22,
                            textAlign: 'left',
                            width: '100%',
                            marginTop: 20,
                            paddingHorizontal: 15,
                            fontFamily: 'poppinsBold',
                        }}>{TITULO_CUPONES_AGREGAR}</Text>
                        <View style={{ flex: 1 }}>

                            <View style={{
                                flex: 1,
                                paddingHorizontal: 15,
                                paddingTop: 10
                            }}>
                                <TextCupones
                                    value={cupon}
                                    setValue={setcupon}
                                    placeholder={'Ingresa el código'}
                                    icon={{
                                        name: undefined
                                    }} >

                                </TextCupones>

                            </View>









                        </View>


                        <View style={styles.aligncenter}>
                            <Button
                                title={AGREGAR_CUPON}
                                onPressed={() => { leercupon(cupon) }}
                            />
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
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 10,
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
function dispatch(arg0: { type: string; }) {
    throw new Error('Function not implemented.');
}

