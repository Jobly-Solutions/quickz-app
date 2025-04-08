import {
    ICONO_BORRAR,
    ICONO_CASH_STACK,
    ICONO_CREDIT,
    ICONO_MAS,
    ICONO_MP,
    ICONO_SALIR
} from '@/assets/iconos';
import { ButtonBottom } from '@/components/atoms/button-bottom';
import { Point } from '@/components/atoms/point';
import { Titles } from '@/components/atoms/titles';
import { Unavailable } from '@/components/atoms/unavailable';
import { Confirm } from '@/components/organisms/confirm';
import { Screen } from '@/components/templates/screen';
import {
    agregarPedido,
    agregarProdPedido,
    obtenerContentCarro,
    obtenerDatosTienda,
    obtenerDatosUser,
    obtenerDocuCarro,
    quitarProductoCarro
} from '@/firebase-js/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPaidMethodSelected, setPaidMethodValue } from '@/redux/slices/paid-method-slice';
import { RootState } from '@/redux/store';
import { BEIGE, BLACK, GREEN_3, GREEN_5, NEGRO, RED, RED_1, VERDE_CLARO, WHITE } from '@/styles/colors';
import { scale, scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { F1_14_500_21, F1_16_600_24, F1_18_600_27, F1_20_600_24, F1_25_700_24, FONT_SIZE_13, FONT_SIZE_14, FONT_SIZE_16, FONT_SIZE_18, LINE_HEIGHT_20, LINE_HEIGHT_21, SIZE_TYPE } from '@/styles/typography';
import { ShopInformation, TiendasProductoCheck } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { parseInt } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { LatLng } from 'react-native-maps';

const { width: viewportWidth } = Dimensions.get('window');

const PAYMENT_METHOD_TITLE = 'Tarjeta de Débito/Crédito:';
const PAYMENT_METHOD_ROW = 'Agregar medio de pago';
const CASH = 'Efectivo';
const MP = 'MercadoPago';

export const PreguntaPagoScreen = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const beneficiario = () => setChecked(() => !checked);
    const [value, setValue] = useState('');
    const fadeAnima = useRef(new Animated.Value(0)).current;
    const [activo, setActivo] = useState(true);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [iconDelivery, setIconDelivery] = useState(false);
    const route: any = useRoute();
    const [total, setTotal] = useState(0);
    const [tieneDel, settieneDel] = useState(false);
    const [delivery, setdelivery] = useState(true);
    const [totalDeliv, settotalDeliv] = useState(0);
    const [nota, setNota] = useState('');
    const [userNombre, setuserNombre] = useState('');
    const [userAddres, setuserAddres] = useState('');
    const [carroCont, setcarroCont] = useState<
        Array<TiendasProductoCheck> | []
    >([]);
    const [uiduser, setuiduser] = useState('0');
    const [idPedido, setIdPedido] = useState('000000');
    const [debito, setDebito] = useState(false);
    const checkDebito = () => {
        setDebito(() => !debito);
        setVisible(false);
    };
    const [editable, setEditable] = useState(false);

    const [ishandlecreado, sethandlecreado] = useState(false);
    const [tienda, setTienda] = useState<ShopInformation>();

    const setPaymentMethodSelected = (value: string) => dispatch(setPaidMethodSelected({ title: value }));
    const paidMethodSelected = useAppSelector((state) => state.paidMethod.selected);
    const paymentMethodSelected = paidMethodSelected?.title || CASH;
    const paidMethod = useAppSelector((state: RootState) => state.paidMethod.value);
    const paidMethodCard = (paidMethod?.card_number) ? paidMethod.card_number.slice(paidMethod.length - 4) : '0000';
    const isCard = Object.keys(paidMethod).length > 0;

    const mpEnabled = tienda?.shop_payment?.mp;
    const cashEnabled = tienda?.shop_payment?.cash;
    const cardEnabled = tienda?.shop_payment?.card;

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const leerDatosTarjeta = () => {
        setVisible(false);
        setAlert(true);
        setTitleAlert('Tu medio de pago fue agregado con éxito');
        setMessageAlert('¡Ya podés utilizarlo!');
        // setTimeout(() => {
        //     navigation.goBack()
        // }, 3000)
    };

    const handlecreado = async () => {
        sethandlecreado(() => !ishandlecreado);
        setVisible(false);
        await AsyncStorage.setItem('@del', 'true');
    };
    const handleDismiss = () => {
        _cleanAlert();
        // navigation.goBack()
    };

    const handleAddPaidMethod = () => {
        navigation.navigate('MedioDePago', { onSave: leerDatosTarjeta });
    };
    const handleRemovePaidMethod = () => {
        setMostrarModal(false);
        dispatch(setPaidMethodValue({}));
    };

    function makeid(length: number) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    const fadeInAA = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnima, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const setestadodeli = async (esee: string) => {
        var iddddd = makeid(6);
        setIdPedido(iddddd);
        const shopId = (await AsyncStorage.getItem('@shopid')) || '';
        obtenerDatosTienda(
            shopId, //'000001',
            (doc) => {
                if (!doc) {
                    setVisible(false);
                    setAlert(true);
                    setMessageAlert(
                        'Error al obtener los datos de la tienda'
                    );
                } else {
                    setTienda(doc);
                    const eca = doc.shop_envio;
                    const esa = parseInt(doc.shop_envio_precio);
                    settieneDel(eca);
                    settotalDeliv(esa);
                    if (!eca) {
                        setdelivery(false);
                    }
                    activarA(esee);
                }
            }
        );
    };

    const setdatosUser = async (esee: string) => {
        obtenerDatosUser(esee, (doc) => {
            if (!doc) {
                setVisible(false);
                setAlert(true);
                setMessageAlert(
                    'Error al obtener los datos del usuario'
                );
            } else {
                const location = {
                    latitude: doc.user_lat,
                    longitude: doc.user_long,
                };
                setuserNombre(
                    doc.user_lastname + ' ' + doc.user_firstname
                );
                getLocationData(location);
                setestadodeli(esee);
            }
        });
    };

    // const chetActivo = () => { setActivo(() => !activo); setVisible(false) };
    const chetActivo = (paymentMethod) => {
        setPaymentMethodSelected(paymentMethod);
        setVisible(false);
    };

    const activarA = async (esee: string) => {
        obtenerDocuCarro(esee, (doc) => {
            if (!doc) {
                setVisible(false);
                setTotal(0);
                setNota('');
                obtenerCarro(esee);
            } else {
                setTotal(doc.order_total);
                setNota(doc.order_feedback);
                obtenerCarro(esee);
            }
        });
    };
    const obtenerCarro = async (uid: string) => {
        var totalejemplo = 0;
        const carroContx = await obtenerContentCarro(uid);
        if (carroContx != null) {
            carroContx.forEach((d: TiendasProductoCheck) => {
                var multi = d.product_price * d.product_cuant;
                var exee =
                    Math.round(d.product_price * d.product_cuant) +
                    totalejemplo;
                totalejemplo = exee;
                setTotal(totalejemplo);

                //ToastAndroid.show(multi + 'rest',ToastAndroid.LONG);
            });
            setcarroCont(carroContx);
            setVisible(false);
        } else {
            setVisible(false);
            setAlert(true);
            setMessageAlert('error al cargar las listas');
        }
    };

    const crearPedido = async () => {
        var numerito = 0;
        if (activo) {
            numerito = 1;
        } else {
            numerito = 2;
        }
        setVisible(true);
        if (route.params.tipo === 'takeaway') {
            navigation.goBack();
        } else if (route.params.tipo === 'delivery') {
            const shopId =
                (await AsyncStorage.getItem('@shopid')) || '';
            agregarPedido(
                shopId,
                uiduser,
                idPedido,
                total + totalDeliv,
                userNombre,
                userAddres,
                nota,
                // products,
                numerito,
                delivery,
                () => {
                    crearprodPedido();
                    handlecreado();
                    navigation.navigate(
                        'OrderPlaced'
                        // , {
                        //     idPedido: idPedido,
                        //     total: total,
                        // }
                    );
                },
                () => {
                    setVisible(false);
                    setAlert(true);
                    setMessageAlert('error al crear el pedido');
                }
            );
        }
    };

    const crearprodPedido = async () => {
        setVisible(false);
        const carroContx = await obtenerContentCarro(uiduser);
        if (carroContx != null) {
            const shopId =
                (await AsyncStorage.getItem('@shopid')) || '';
            carroContx.forEach((d: TiendasProductoCheck) => {
                agregarProdPedido(
                    shopId,
                    uiduser,
                    idPedido,
                    d.product_id,
                    d.product_sku,
                    d.product_name,
                    d.product_details,
                    d.product_unit,
                    d.product_unit_value,
                    d.product_price,
                    false,
                    d.product_cuant,
                    () => { },
                    () => {
                        setVisible(false);
                        setAlert(true);
                        setMessageAlert('error al crear el pedido');
                    }
                );
            });
        } else {
        }
        setVisible(false);
    };

    const getLocationData = async (cords: LatLng) => {
        let locaation = await Location.reverseGeocodeAsync(cords);
        if (locaation !== null) {
            var prov = locaation[0].region?.toString();
            var loca = locaation[0].city?.toString();
            var dire = locaation[0].street?.toString();
            var number = locaation[0].name?.toString();
            try {
                setuserAddres(dire + ' ' + number);
            } catch { }
        }
    };
    const volverInicio = async () => {
        await AsyncStorage.setItem('@delivery', 'true');
        navigation.navigate('Home');
    };

    const removeItem = async (id: string) => {
        setVisible(true);
        quitarProductoCarro(
            uiduser,
            id,
            () => {
                obtenerCarro(uiduser);
            },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error eliminando el producto');
            }
        );
    };

    const handleOnPress = () => {
        navigation.goBack();
    };

    const customView = (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: scaleHorizontal(10),
        }}>
            <View style={{
                width: scaleHorizontal(48),
                height: scaleVertical(48),
                backgroundColor: '#38CB89',
                borderRadius: scaleModerate(16),
                justifyContent: 'center',
                alignItems: 'center',
            }} >
                <Image
                    source={ICONO_CREDIT}
                    style={{
                        width: scaleHorizontal(32),
                        height: scaleVertical(32),
                        resizeMode: 'contain',
                        tintColor: 'white'
                    }}
                />
            </View>
            <View style={{ marginLeft: scaleHorizontal(20) }}>
                <Text style={styles.titleStyle}>
                    {titleAlert}
                </Text>
                <Text style={styles.messageStyle}>
                    {messageAlert}
                </Text>
            </View>
            <TouchableOpacity style={{
                marginTop: scaleVertical(-55),
                marginRight: scaleHorizontal(-10)
            }}
                onPress={handleDismiss}>
                <Image
                    source={ICONO_SALIR}
                    style={{
                        width: scaleHorizontal(32),
                        height: scaleVertical(32),
                        tintColor: BLACK,
                    }}
                />
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        setVisible(true);
        (async () => {
            const values = await AsyncStorage.getItem('@useruid');
            if (values !== null) {
                await setdatosUser(values);
                await setuiduser(values);
            } else {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al cargar el usuario');
            }
        })();
    }, []);

    return (
        <>
            <Screen title=''>
                <AwesomeAlert
                    show={alert}
                    showProgress={false}
                    contentContainerStyle={styles.contentContainerStyle}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    onDismiss={handleDismiss}
                    showConfirmButton={false}
                    customView={customView}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Titles
                        title='Método de pago'
                        subTitle='Seleccionar método'
                        style={TitlesStyles}
                    />

                    <View
                        style={
                            {
                                //flex: 1
                            }
                        }
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                //paddingHorizontal: 15,
                                marginBottom: 10,
                                // paddingVertical: 5,
                            }}
                        >
                            <Text style={styles.selectorTitle}>
                                Métodos de pago disponible:
                            </Text>
                            <View style={{ marginLeft: 10 }}>
                                <TouchableOpacity
                                    style={{
                                        // flex: 1,
                                        marginVertical: 10,
                                        flexDirection: 'row',
                                    }}
                                    onPress={() => {
                                        cashEnabled && chetActivo(CASH);
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.cashImageContainer,
                                            !cashEnabled && styles.unavailableView
                                        ]}
                                    >
                                        <Image
                                            style={[
                                                styles.cashImage,
                                                !cashEnabled && styles.unavailableImage
                                            ]}
                                            source={ICONO_CASH_STACK}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            color: NEGRO,
                                            fontFamily:
                                                'poppinsRegular',
                                            fontSize: FONT_SIZE_14,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            alignContent: 'center',
                                            flex: 1,
                                            textAlign: 'left',
                                            marginHorizontal: 8,
                                            padding: 0,
                                            includeFontPadding:
                                                false,
                                        }}
                                    >
                                        {CASH}
                                    </Text>
                                    {cashEnabled ?
                                        <Point
                                            active={
                                                paymentMethodSelected === CASH
                                            }
                                        />
                                        : <Unavailable />}
                                </TouchableOpacity>

                                <View style={styles.separator} />

                                <TouchableOpacity
                                    style={{
                                        marginVertical: 10,
                                        flexDirection: 'row',
                                        justifyContent:
                                            'space-between',
                                    }}
                                    onPress={() => {
                                        mpEnabled && chetActivo(MP);
                                    }}
                                >
                                    <Image
                                        style={[{
                                            height: scaleVertical(27),
                                            width: scaleHorizontal(104),
                                            resizeMode: 'contain'
                                        },
                                        !mpEnabled && { opacity: 0.5 }
                                        ]}
                                        source={ICONO_MP}
                                    />
                                    {mpEnabled ?
                                        <Point
                                            active={
                                                paymentMethodSelected === MP
                                            }
                                        />
                                        : <Unavailable />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.separator,
                            {
                                height: 4,
                                width: '120%',
                                marginLeft: -20,
                                backgroundColor: '#EFEFEF',
                                borderWidth: 1,
                                borderColor: '#E0E0E0',
                            },
                        ]}
                    />

                    <View
                        style={{
                            // flex: 1,
                            flexDirection: 'column',
                            width: '100%',
                            alignSelf: 'center',
                        }}
                    >
                        <Text style={styles.paymentMethodTitle}>
                            {PAYMENT_METHOD_TITLE}
                        </Text>
                        {cardEnabled ? <>
                            {isCard && (<>
                                <TouchableOpacity onPress={() => setEditable(!editable)}
                                    style={{
                                        top: scale(-26),
                                        alignSelf: 'flex-end',
                                    }}>
                                    <Text
                                        style={{
                                            ...F1_18_600_27,
                                            color: '#49C98B',
                                        }}
                                    >
                                        {'Editar'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignSelf: 'center',
                                        marginLeft: 20,
                                        marginBottom: scale(20),
                                        paddingRight: 10,
                                    }}
                                    onPress={() => {
                                        chetActivo('0000');
                                    }}
                                >
                                    <View style={styles.debitoImageContainer}>
                                        <Image
                                            style={styles.debitoImage}
                                            source={ICONO_CREDIT}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            color: NEGRO,
                                            fontFamily: 'poppinsRegular',
                                            fontSize: FONT_SIZE_14,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            alignContent: 'center',
                                            flex: 1,
                                            textAlign: 'left',
                                            marginHorizontal: 8,
                                            padding: 0,
                                            includeFontPadding: false,
                                        }}
                                    >
                                        {'**** **** **** ' + paidMethodCard}
                                    </Text>
                                    {
                                        editable
                                            ? (<TouchableOpacity onPress={() => setMostrarModal(true)}>
                                                <View style={styles.borrarImageContainer}>
                                                    <Image
                                                        style={styles.borrarImage}
                                                        source={ICONO_BORRAR}
                                                    />
                                                </View>
                                            </TouchableOpacity>)
                                            : (<Point active={paymentMethodSelected === '0000'} />)
                                    }
                                    <Confirm
                                        isVisible={mostrarModal}
                                        title={'Consulta'}
                                        body={'¿Estás seguro que deseas eliminar el medio de pago?'}
                                        onAccept={handleRemovePaidMethod}
                                        onCancel={() => setMostrarModal(false)}
                                        style={{}}
                                    />
                                </TouchableOpacity>

                                <View style={styles.separator} />

                            </>)}

                            <TouchableOpacity
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                    marginLeft: 20,
                                    marginTop: 10,
                                }}
                                onPress={handleAddPaidMethod}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 10,
                                        marginBottom: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: scaleVertical(38),
                                            width: scaleHorizontal(38),
                                            borderRadius: scaleModerate(10),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: VERDE_CLARO,
                                        }}
                                    >
                                        <Image
                                            source={ICONO_MAS}
                                            style={{
                                                height: scaleVertical(28),
                                                width: scaleHorizontal(28),
                                                tintColor: 'white',
                                            }}
                                        />
                                    </View>
                                    <Text
                                        style={styles.paymentMethodRow}
                                    >
                                        {PAYMENT_METHOD_ROW}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </>
                            : <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginLeft: 10,
                                    marginTop: 10,
                                }}
                            >
                                <View style={[styles.debitoImageContainer, styles.unavailableView]}>
                                    <Image
                                        style={[styles.debitoImage, styles.unavailableImage]}
                                        source={ICONO_CREDIT}
                                    />
                                </View>
                                <Unavailable />
                            </View>}
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <ButtonBottom
                            onPress={debito ? () => { } : handleOnPress}
                            text={
                                debito
                                    ? 'Agregar método'
                                    : 'Confirmar método'
                            }
                        /></View>
                </ScrollView>
            </Screen >
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
    fadingContainer: {
        flexDirection: 'row',
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
    textView: {
        alignItems: 'center',
        marginBottom: 5,
        marginBottom: 30,
        flex: 1,
        flexDirection: 'row',
    },
    textPrimary: {
        fontSize: SIZE_TYPE.big,
        textAlign: 'center',
        width: '100%',
        marginBottom: 30,
    },
    losePassword: {
        color: BLACK,
        fontSize: FONT_SIZE_14,
        fontFamily: 'poppinsRegular',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        marginBottom: 5,
    },
    aligncenter: {
        marginHorizontal: 10,
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
        marginBottom: 20,
    },
    loginbuttonTextStyle: {
        color: WHITE,
        paddingVertical: 8,
        fontSize: FONT_SIZE_16,
    },
    registerbuttonTextStyle: {
        color: WHITE,
        paddingVertical: 8,
        fontSize: FONT_SIZE_16,
    },
    imgStart: {
        width: '70%',
        height: '70%',
        borderRadius: 7,
    },
    registerNow: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'poppinsRegular',
        textDecorationLine: 'underline',
    },
    donthaveacc: {
        fontSize: FONT_SIZE_14,
        fontFamily: 'poppinsRegular',
    },
    selectorTitle: {
        ...F1_16_600_24,
        fontSize: FONT_SIZE_14,
        color: '#5F5F5F',
        textAlign: 'left',
    },
    cashImageContainer: {
        height: scaleVertical(38),
        width: scaleHorizontal(38),
        borderRadius: scaleModerate(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#38CB89',
    },
    cashImage: {
        height: scaleVertical(24),
        width: scaleHorizontal(24),
        resizeMode: 'contain',
        tintColor: '#A8FFB6',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#D8D8D8',
        marginVertical: 10,
    },
    paymentMethodTitle: {
        ...F1_16_600_24,
        color: '#515151',
        fontSize: FONT_SIZE_14,
        // marginBottom: 10,
    },
    paymentMethodRow: {
        ...F1_14_500_21,
        color: '#49C98B',
    },
    debitoImageContainer: {
        height: scaleVertical(38),
        width: scaleHorizontal(38),
        borderRadius: scaleModerate(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9EDCFF',
    },
    debitoImage: {
        height: scaleVertical(26),
        width: scaleHorizontal(26),
        resizeMode: 'contain',
    },
    borrarImageContainer: {
        height: 28,
        width: 28,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: RED_1,
        borderWidth: 1,
        borderColor: RED,
        opacity: .9,
    },
    borrarImage: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
        tintColor: '#FFF',
    },
    titleStyle: {
        color: '#1C9274',
        fontFamily: 'Roboto',
        fontSize: FONT_SIZE_13,
        fontWeight: "700",
        lineHeight: LINE_HEIGHT_21,
    },
    messageStyle: {
        color: '#54565A',
        fontFamily: 'Roboto',
        fontSize: FONT_SIZE_13,
        fontWeight: "500",
        lineHeight: LINE_HEIGHT_20,
    },
    contentContainerStyle: {
        position: 'absolute',
        top: scaleVertical(30),
        width: scaleHorizontal(615),
        backgroundColor: GREEN_3,
        borderRadius: scaleModerate(16),
        borderColor: GREEN_5,
        borderWidth: scaleHorizontal(1),
    },
    unavailableView: {
        backgroundColor: '#DEDEDE',
    },
    unavailableImage: {
        tintColor: '#8F8F8F'
    },
});

const TitlesStyles = StyleSheet.create({
    container: {
        paddingTop: 20,
        marginBottom: 20,
    },
    titleText: {
        ...F1_25_700_24,
    },
    subTitleText: {
        ...F1_20_600_24,
        fontSize: FONT_SIZE_18,
        color: VERDE_CLARO,
    },
});
