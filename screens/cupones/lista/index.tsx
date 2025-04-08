import { ICONO_CHECK_1, ICONO_SALIR, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { CouponList } from '@/components/atoms/coupon-list';
import TextCupones from '@/components/molecules/campo-cupones';
import { agregarCupon, obtenerDatosCupon, obtenerDocuCupones, SignOut } from '@/firebase-js/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { signOut } from '@/redux/slices/auth-slice';
import { setCouponList, setCouponValue } from '@/redux/slices/coupon-slice';
import { RootState } from '@/redux/store';
import { BEIGE, BLACK, GRAY_1, GREEN_1, GREEN_3, GREEN_5, VERDE_CLARO, WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { estilos } from '@/styles/tema_general';
import { TITULO_CUPONES } from '@/styles/textos';
import { F1_16_400, F1_16_600, FONT_SIZE_14, FONT_SIZE_16, LINE_HEIGHT_20, LINE_HEIGHT_21, SIZE_TYPE } from '@/styles/typography';
import { Coupon, Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { now } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
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

const COUPON_DEFAULT: Coupon = {
    coupon_id: '200off',
    coupon_code: '200off',
    coupon_description: 'Para pedir lo que quieras!',
    coupon_img: '',
    coupon_amount: 200,
    coupon_quantity: 1,
    coupon_expires_at: '5 de junio',
    coupon_created_at: now().toString(),
};
const COUPON_DEFAULT_LIST = [COUPON_DEFAULT];

export const CuponListaScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [titleAlert, setTitleAlert] = useState('Error');
    // const [cupones, setcupones] = useState<Array<TiendasCupon> | []>([]);
    const cupones = useAppSelector((state: RootState) => state.coupon.list);

    const user = useSelector((state: Store) => state.auth.user);
    if (!user) {
        SignOut().then(() => dispatch(signOut()));
    }

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const cargarCupones = async () => {
        if (user) {
            const cuponesx = await obtenerDocuCupones(user.uid);
            if (cuponesx != null) {
                // if (cuponesx.length === 0) {
                //     dispatch(setCouponList(COUPON_DEFAULT_LIST));
                // } else {
                // setcupones(cuponesx);
                dispatch(setCouponList(cuponesx));
                // }
                setVisible(false);
            } else {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al cargar las listas');
            }
        }
    };

    const Tabs = ({ style }) => {
        const [selected, setSelected] = useState(true);

        const handlePress = (value: boolean) => {
            setSelected(value);
        };

        const styles = StyleSheet.create({
            tab: {
                flex: 1,
                alignItems: 'center',
                padding: 10,
            },
            tabSelected: {
                borderBottomColor: GREEN_1,
                borderBottomWidth: 2,
            },
            text: {
                ...F1_16_400,
                color: GRAY_1,
            },
            textSelected: {
                ...F1_16_600,
                color: GREEN_1,
            }
        });

        return (
            <View style={[{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            { ...style }]}>
                <TouchableOpacity
                    style={[styles.tab, selected && styles.tabSelected]}
                    onPress={() => handlePress(true)}>
                    <Text style={[styles.text, selected && styles.textSelected]}>{'Vigente'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, !selected && styles.tabSelected]}
                    onPress={() => handlePress(false)}>
                    <Text style={[styles.text, !selected && styles.textSelected]}>{'Vencido'}</Text>
                </TouchableOpacity>
            </View >
        );
    };

    const InputAddVoucher = ({ style }) => {
        const [cupon, setcupon] = useState('');

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
                },
                () => {
                    setVisible(false);
                    setAlert(true);
                    setMessageAlert('Error agregando el cupon, intenta nuevamente mas tarde');
                }
            );
        };

        const leercupon = async (id: string) => {
            const idTienda = await AsyncStorage.getItem('@shopid');

            if (id === COUPON_DEFAULT.coupon_id) {
                dispatch(setCouponValue(COUPON_DEFAULT));
                dispatch(setCouponList(COUPON_DEFAULT_LIST));
                setVisible(false);
                setTitleAlert("Cupón cargado con éxito");
                setMessageAlert("Ya puedes utilizar tu cupón");
                setAlert(true);
                // navigation.goBack();
            }
            else
                if (idTienda != null) {
                    obtenerDatosCupon(
                        idTienda,
                        id,
                        (doc) => {
                            if (!doc) {
                                setVisible(false);
                                setAlert(true);
                                setMessageAlert('El cupón ingresado no existe, o no quedan mas disponibles');
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

        return (<View
            style={[{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            { ...style }]}>
            <TextCupones
                value={cupon}
                setValue={setcupon}
                placeholder={'Ingresar cupón'}
                icon={{
                    name: undefined
                }} >

            </TextCupones>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    height: 50,
                    width: 134,
                    backgroundColor: '#49C98B',
                    borderRadius: 100,
                }}
                onPress={() => { leercupon(cupon) }}>
                <Text
                    style={{
                        ...F1_16_600,
                        height: '100%',
                        color: 'white',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>{'agregar'}</Text>
            </TouchableOpacity>
        </View>);
    }

    const customView = (
        <View style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <View style={{
                width: scaleHorizontal(48),
                height: scaleVertical(48),
                backgroundColor: GREEN_1,
                borderRadius: scaleModerate(16),
                borderColor: GREEN_5,
                borderWidth: scaleModerate(1),
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Image
                    source={ICONO_CHECK_1}
                    style={{
                        width: scaleHorizontal(32),
                        height: scaleVertical(32),
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <View style={{
                width: scaleHorizontal(200),
                marginVertical: scaleVertical(15),
            }}>
                <Text style={styles.titleStyle}>
                    {titleAlert}
                </Text>
                <Text style={styles.messageStyle}>
                    {messageAlert}
                </Text>
            </View>
            <TouchableOpacity style={{
                marginTop: scaleHorizontal(-4),
                marginRight: scaleHorizontal(-4),
            }}
                onPress={() => setAlert(false)}>
                <Image
                    source={ICONO_SALIR}
                    style={{
                        width: scaleHorizontal(24),
                        height: scaleVertical(24),
                        tintColor: BLACK,
                    }}
                />
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        setVisible(true);
        try {
            cargarCupones()
        } catch {
            setVisible(false);
        }
    }, []);
    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                contentContainerStyle={styles.contentContainerStyle}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                onDismiss={() => _cleanAlert()}
                showConfirmButton={false}
                customView={customView}
            />
            <Spinner visible={visible} />


            <View style={styles.container}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}>

                    <ScrollView endFillColor={WHITE} style={{
                        flex: 1,
                        width: '100%', alignSelf: 'stretch',
                        height: '100%',
                    }}>

                        <View style={estilos.barra_superiod}>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity style={{
                                height: 33,
                                width: 33, start: 3,
                                position: 'relative',
                                alignContent: 'center',
                                alignSelf: 'center',
                            }} onPress={() => { navigation.navigate('Home') }}>
                                <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                            </TouchableOpacity>

                        </View>

                        <View style={[estilos.contenedorPantalla, { paddingHorizontal: 15, }]}>
                            <Text
                                style={{
                                    fontSize: 22,
                                    textAlign: 'left',
                                    width: '100%',
                                    marginTop: 20,
                                    fontFamily: 'poppinsBold',
                                    marginBottom: 20,
                                }}>
                                {TITULO_CUPONES}
                            </Text>

                            <InputAddVoucher style={{ marginBottom: 20 }} />

                            <Tabs style={{ marginBottom: 20 }} />

                            <View style={{
                                backgroundColor: WHITE,
                                // flex: 1, 
                                // alignSelf: 'stretch', 
                            }}>
                                {/* {AdapterCupon(user.uid, cupones)} */}
                                <CouponList uid={user.uid} />
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
        color: '#1C9274',
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: FONT_SIZE_16,
        lineHeight: LINE_HEIGHT_21,
    },
    messageStyle: {
        color: '#54565A',
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: FONT_SIZE_14,
        lineHeight: LINE_HEIGHT_20,
    },
    contentContainerStyle: {
        position: 'absolute',
        top: scaleVertical(50),
        // height: scaleVertical(110),
        // width: scaleHorizontal(350 + 60),
        backgroundColor: GREEN_3,
        borderRadius: scaleModerate(16),
        borderColor: GREEN_5,
        borderWidth: scaleModerate(2),
        padding: 0,
        margin: 0,
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
