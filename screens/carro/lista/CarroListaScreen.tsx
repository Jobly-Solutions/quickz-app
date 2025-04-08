import { ICONO_CARRO, ICONO_COMPRAR, ICONO_HOME, ICONO_PUNTO, ICONO_SUPPORT, ICONO_USER, ICONO_VOLVER } from '@/assets/iconos';
import { UI_BANNERINF } from '@/assets/ui';
import AdapterCarro from '@/components/atoms/adapter-lista-carro';
import { ButtonAddLeft } from '@/components/atoms/button-add-left';
import { ButtonBottom } from '@/components/atoms/button-bottom';
import { RadioButton } from '@/components/atoms/radio-button';
import { Confirm } from '@/components/organisms/confirm';
import { addProductoCarro, agregarPedido, agregarProdPedido, obtenerContentCarro, obtenerDatosTienda, obtenerDatosUser, obtenerDocuCarro, quitarProductoCarro, restProductoCarro, restablecerCarro } from '@/firebase-js/api';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import { BEIGE, BLACK, GRIS_CLARO, NEGRO, RED, VERDE_CLARO, VERDE_LINDO, WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleVertical } from '@/styles/mixins';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { TiendasProductoCheck } from '@/types';
import { handleMpCheckout } from '@/utils/paymentUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { parseInt } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { LatLng } from 'react-native-maps';
import { CartSummary } from './cart-summary';

const { width: viewportWidth } = Dimensions.get('window');

const ADD_MORE_ITEMS = 'Agregar más items';
const CASH = 'Efectivo';
const MP = 'MercadoPago';

export const CarroListaScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const beneficiario = () => setChecked(() => !checked);
    const [value, setValue] = useState('');
    const fadeAnima = useRef(new Animated.Value(0)).current;

    const [subTotal, setSubTotal] = useState(0);
    const [priceFinal, setPriceFinal] = useState(0);
    const [takeAway, setTakeAway] = useState(false);
    const [delivery, setDelivery] = useState(false);
    const [totalDeliv, settotalDeliv] = useState(0);
    const [totalServ, setTotalServ] = useState(0);
    const [nota, setNota] = useState('');
    const [userNombre, setuserNombre] = useState('');
    const [userAddres, setuserAddres] = useState('');
    const [shopName, setShopName] = useState('Las Marías Supermercado');
    const [carroCont, setcarroCont] = useState<Array<TiendasProductoCheck> | []>([]);
    const [uiduser, setuiduser] = useState('');
    const [idPedido, setIdPedido] = useState('000000');
    const [redirec, setRedirec] = useState(false);
    const [removeItemId, setRemoveItemId] = useState('');
    const [idTienda, setIdTienda] = useState('');

    const handleRedirec = () => { setRedirec(() => !redirec); setVisible(false) }

    const [ishandlecreado, sethandlecreado] = useState(false);

    const [products, setProducts] = useState([]);

    const handlecreado = () => { sethandlecreado(() => !ishandlecreado); setVisible(false) };

    const navigation = useNavigation();

    const couponSelected = useAppSelector((state: RootState) => state.coupon.selected);
    const couponAmount = couponSelected?.coupon_amount || 0;

    const paidMethodSelected = useAppSelector((state) => state.paidMethod.selected)?.title || CASH;

    // calcula el total
    const deliveryCost = delivery ? totalDeliv : 0;
    const total = subTotal + totalServ + deliveryCost - couponAmount;

    const deepLink = Linking.useURL();

    const handleOnPress = () => {
        navigation.navigate('PantallaTienda');
    };

    const handleNext = () => {
        navigation.navigate('Checkout', { idPedido, total });
    };

    function makeid(length: number) {
        var result = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    };

    const fadeInAA = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnima, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const setestadodeli = async () => {
        setIdPedido(makeid(6));
        obtenerDatosTienda(
            idTienda,//'000001',
            (doc) => {
                if (!doc) {
                    setVisible(false);
                    setAlert(true);
                    setMessageAlert('Error al obtener los datos de la tienda');
                } else {
                    const shop_envio = doc.shop_envio;
                    const shopEnvioPrecio = parseInt(doc.shop_envio_precio);
                    setDelivery(shop_envio);
                    setTakeAway(!shop_envio);
                    setTotalServ(parseInt(doc.shop_pago_precio));
                    settotalDeliv(shopEnvioPrecio);
                    activarA(uiduser);
                }
            })
    };

    // const chetActivo = () => {
    //     if (!takeAway) {
    //         if (delivery) setDelivery(false);
    //         else setDelivery(true);
    //     }
    // };

    const handleRadioButtonPress = (index) => {
        setDelivery(index === 1);
        // setTakeAway(index === 2);
    }

    const activarA = async (esee: string) => {

        obtenerDocuCarro(esee, (doc) => {
            if (!doc) {
                setVisible(false);
                setSubTotal(0);
                setNota('');
                obtenerCarro(esee);
            } else {
                setSubTotal(doc.order_total);
                setNota(doc.order_feedback);
                obtenerCarro(esee);
            }
        });

    };

    const obtenerCarro = async (uid: string) => {

        const carroContx = await obtenerContentCarro(uid);
        setProducts(carroContx);
        if (carroContx != null) {
            var totalejemplo = 0;
            carroContx.forEach((d: TiendasProductoCheck) => {
                var multi = (d.product_price * d.product_cuant);
                var exee = Math.round(d.product_price * d.product_cuant) + totalejemplo;
                totalejemplo = exee;
            })
            setSubTotal(totalejemplo);
            setcarroCont(carroContx);
            setVisible(false);
        } else {
            setVisible(false);
            setAlert(true);
            setMessageAlert('error al cargar las listas');
        }
    };

    const terminar = () => {
        restablecerCarro(
            uiduser,
            () => { handlecreado(); },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al crear el pedido');
            });
    }

    const countProducts = (p) => p.reduce((a, b) => a + Number(b.product_cuant), 0);

    const crearPedido = () => {
        setVisible(true);
        agregarPedido(
            idTienda,
            uiduser,
            idPedido,
            total,
            userNombre,
            userAddres,
            nota,
            // products,
            0,
            delivery,
            () => {
                crearprodPedido();
                handlecreado();
                navigation.navigate('OrderPlaced',
                    {
                        id: idPedido,
                        shopId: idTienda,
                        address: delivery ? userAddres : shopName,
                        delivery: delivery,
                        total: total,
                        created: '11:35 a.m.',
                        products: countProducts(products),
                        deliveryTime: '24 de enero , 15:00hs-17:00hs'
                    }
                );
            },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al crear el pedido');
            }
        );

    };

    const crearprodPedido = async () => {
        setVisible(false);
        const carroContx = await obtenerContentCarro(uiduser);
        if (carroContx != null) {
            carroContx.forEach((d: TiendasProductoCheck) => {
                agregarProdPedido(
                    idTienda,
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
                    });
            })
        } else {
        }
    };

    const addItem = async (id: string, cant: number) => {
        setVisible(true);
        addProductoCarro(
            uiduser,
            id,
            cant,
            () => {
                obtenerCarro(uiduser)
            },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error eliminando el producto');
            });
    };

    const restItem = async (id: string, cant: number) => {
        setVisible(true);
        restProductoCarro(
            uiduser,
            id,
            cant,
            () => {
                obtenerCarro(uiduser)
            },
            () => {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error eliminando el producto');
            });
    };

    const removeItem = async (id: string) => {
        setVisible(true);
        quitarProductoCarro(
            uiduser,
            id,
            () => {
                setRemoveItemId('');
                obtenerCarro(uiduser);
            },
            () => {
                setRemoveItemId('');
                setVisible(false);
                setAlert(true);
                setMessageAlert('error eliminando el producto');
            });
    };

    const setdatosUser = () => {
        obtenerDatosUser(
            uiduser,
            (doc) => {
                if (!doc) {
                    setVisible(false);
                    setAlert(true);
                    setMessageAlert('Error al obtener los datos del usuario');
                } else {
                    const location = {
                        latitude: doc.user_lat,
                        longitude: doc.user_long,
                    };
                    setuserNombre(doc.user_lastname + ' ' + doc.user_firstname);
                    getLocationData(location);
                    setestadodeli();
                }
            })
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
            } catch {

            }
        }

    };

    const handleGoHome = () => {
        terminar();
        navigation.navigate('Home', { takeAway: true });
    };

    const handleFinalizar = () => crearPedido();

    useEffect(() => {
        setVisible(true);
        (async () => {
            const shopid = await AsyncStorage.getItem('@shopid');
            if (shopid !== null) setIdTienda(shopid);
            const useruid = await AsyncStorage.getItem('@useruid');
            if (useruid !== null) {
                setuiduser(useruid);
            }
            else {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al cargar el usuario');
            }
        })();
    }, []);

    useEffect(() => {
        if (idTienda && uiduser) setdatosUser();
    }, [uiduser]);


    useEffect(() => {
        if (deepLink) {
            const { hostname, path, queryParams } = Linking.parse(deepLink);
            if (hostname === 'mp-checkout-pro' && path === 'success') {
                crearPedido();
            }
        }
    }, [deepLink]);

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
            >
                <ScrollView>
                    <View style={{ alignItems: 'center', height: '100%' }}>
                        <View style={{
                            backgroundColor: 'rgba(73, 201, 139, 1)',
                            width: '100%',
                            height: '100%'
                        }}>
                            <ScrollView endFillColor={WHITE}
                                style={{
                                    position: 'relative',
                                }}>


                                <View style={{
                                    height: 55,
                                    marginTop: 45,
                                    alignContent: 'stretch',
                                    flexDirection: 'row',
                                    paddingHorizontal: 15,
                                    paddingVertical: 7,
                                }}>
                                    <Text style={{

                                        fontSize: 20,
                                        flex: 1,
                                        textAlign: 'center',
                                        color: WHITE,
                                        alignSelf: 'flex-end',
                                        fontFamily: 'poppinsBold',
                                    }}>Carrito</Text>
                                    <TouchableOpacity onPress={() => handleRedirec()}>
                                        <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                                    </TouchableOpacity>


                                    <TouchableOpacity style={{
                                        height: 33,
                                        width: 33, marginStart: 15,
                                        position: 'absolute',
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                    }} onPress={() => { navigation.navigate('Home') }}>
                                        <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                                    </TouchableOpacity>
                                </View>

                                <View style={estilos.contenedorPantalla}>

                                    <View style={{
                                        flex: 1,
                                        width: '100%',
                                        paddingHorizontal: 5,
                                        height: 50,
                                        flexDirection: 'row',
                                    }}>

                                        <Text style={{

                                            fontSize: 20,
                                            flex: 1,
                                            textAlign: 'center',
                                            color: NEGRO,
                                            alignSelf: 'flex-end',
                                            fontFamily: 'poppinsBold',
                                        }}>Mi carrito de compras</Text>

                                    </View>

                                    <View style={{
                                        flex: 1,
                                    }}>
                                        <AdapterCarro personss={carroCont} quitarProductos={(id) => { setRemoveItemId(id) }} addProductos={(id, cant) => { addItem(id, cant) }} restProductos={(id, cant) => { restItem(id, cant) }} />
                                        <View style={{ marginBottom: 20 }}>
                                            <ButtonAddLeft text={ADD_MORE_ITEMS} onPress={handleOnPress} />
                                        </View>
                                        <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', marginBottom: 10 }}>
                                            <View style={{ width: '100%', height: 3, backgroundColor: GRIS_CLARO }}>
                                            </View>

                                        </View>
                                        {!takeAway && <RadioButton label1={'Delivery'} label2={'Retirar en tienda'} selected={delivery ? 1 : 2} onPress={handleRadioButtonPress} />}

                                        <CartSummary delivery={delivery} coupon={couponAmount} subTotal={subTotal} total={total} totalServ={totalServ} totalDeliv={totalDeliv} navigation={navigation} />

                                        <Text style={{
                                            color: NEGRO,
                                            fontFamily: 'poppinsSemiBold',
                                            fontSize: 16,
                                            height: 'auto',
                                            textAlign: 'left',
                                            marginHorizontal: 15,
                                            marginTop: 25,
                                            padding: 0,
                                            includeFontPadding: false,
                                            width: 'auto',
                                        }}>
                                            {'Agregar nota para la tienda'}
                                        </Text>

                                        <View style={{
                                            paddingHorizontal: 15,
                                        }}>

                                            <View style={{
                                                marginBottom: 35,
                                                marginTop: 5,
                                                flex: 1,
                                                height: 45,
                                                width: '100%',
                                                maxHeight: 45,
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                                justifyContent: 'center',
                                                borderRadius: 10,
                                                backgroundColor: GRIS_CLARO,
                                            }}>

                                                <TextInput
                                                    style={{
                                                        marginStart: 5,
                                                        backgroundColor: 'transparent',
                                                        height: 45,
                                                        width: '100%',
                                                        flex: 1,
                                                        fontFamily: 'poppinsRegular',
                                                        fontSize: 15,
                                                        alignItems: 'flex-start',
                                                        marginBottom: 25,
                                                        color: NEGRO,
                                                    }}
                                                    placeholder={''}
                                                    value={nota}
                                                    onChangeText={setNota}
                                                    underlineColorAndroid='transparent'
                                                />
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ marginBottom: scaleVertical(100), paddingHorizontal: scaleHorizontal(15) }}>
                                        <ButtonBottom
                                            onPress={delivery ? handleNext : paidMethodSelected === MP ? () => handleMpCheckout(idPedido, total) : handleFinalizar}
                                            text={delivery ? "Siguiente" : paidMethodSelected === MP ? "Ir a pagar" : "Finalizar pedido"}
                                        />
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
                                        <Image style={{
                                            height: 40,
                                            width: 40,
                                            resizeMode: 'contain',
                                            tintColor: VERDE_LINDO,
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                        }} source={ICONO_CARRO} />
                                        <Image style={estilos.puntoInferior} source={ICONO_PUNTO} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            marginHorizontal: 10,
                                            marginTop: 10,
                                            marginBottom: 1,
                                        }}
                                        onPress={() => navigation.navigate('MisDatos')}>
                                        <Image style={estilos.iconosInferior} source={ICONO_USER} />
                                    </TouchableOpacity>


                                </ImageBackground>


                            </View>



                            {/* <Modal isVisible={ishandlecreado}>
                                <Modal.Container>
                                    <Modal.HeaderTakeaway title="¡Tu pedido fue realizado!" onPress={() => navigation.navigate('Home', { takeaway: true })} />
                                    <Modal.Body>
                                        <Text style={{
                                            fontSize: 20,
                                            textAlign: 'center',
                                            width: '100%',
                                            color: NEGRO,
                                            height: 'auto',
                                            fontFamily: 'poppinsRegular',
                                            alignSelf: 'flex-start',
                                            alignContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: 20,
                                            justifyContent: 'center',
                                            includeFontPadding: false,
                                            textAlignVertical: 'bottom',
                                        }}>
                                            Recibiras una notificación cuando tu pedido esté listo para retirar
                                        </Text>
                                        <View style={{
                                            height: 'auto',
                                            paddingVertical: 15,
                                            width: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'
                                        }}>
                                            <Image style={{ width: 75, height: 75, justifyContent: 'center', resizeMode: 'contain', alignSelf: 'center' }} source={ICONO_ESO} />
                                            <Text style={{
                                                fontSize: 17,
                                                textAlign: 'center',
                                                width: '100%',
                                                color: NEGRO,
                                                fontFamily: 'poppinsRegular',
                                                height: 'auto',
                                                alignSelf: 'flex-start',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                paddingHorizontal: 20,
                                                marginTop: 15,
                                                justifyContent: 'center',
                                                includeFontPadding: false,
                                                textAlignVertical: 'bottom',
                                            }}>
                                                Tu código de retiro es
                                            </Text>
                                            <Text style={{
                                                fontSize: 22,
                                                textAlign: 'center',
                                                width: '100%',
                                                color: NEGRO,
                                                height: 'auto',
                                                alignSelf: 'flex-start',
                                                marginTop: 10,
                                                fontFamily: 'poppinsSemiBold',
                                                fontWeight: 'bold',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                paddingHorizontal: 20,
                                                letterSpacing: 10,
                                                justifyContent: 'center',
                                                includeFontPadding: false,
                                                textAlignVertical: 'bottom',
                                            }}>
                                                {idPedido}
                                            </Text>
                                        </View>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

                                            <View style={{ marginHorizontal: 5 }}>
                                                <TouchableOpacity style={{
                                                    height: 40,
                                                    paddingHorizontal: 50,
                                                    paddingVertical: 9,
                                                    backgroundColor: '#5ED69C',
                                                    borderRadius: 40
                                                }} onPress={handleGoHome}>
                                                    <Text style={{
                                                        color: WHITE,
                                                        fontSize: 17,
                                                        fontFamily: 'poppinsRegular'
                                                    }}>Volver al inicio</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal.Footer>
                                </Modal.Container>
                            </Modal> */}

                            <Confirm
                                isVisible={redirec}
                                title='Consulta'
                                body='¿Necesitas hablar con un representante de la tienda?'
                                onAccept={() => navigation.navigate('SoporteGeneral')}
                                onCancel={() => handleRedirec()}
                            />
                            <Confirm
                                isVisible={!!removeItemId}
                                title='Consulta'
                                body='¿Estas seguro que deseas eliminar el producto del carrito?'
                                onAccept={() => removeItem(removeItemId)}
                                onCancel={() => setRemoveItemId('')}
                            />

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
