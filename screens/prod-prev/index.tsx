import { ICONO_CARRO, ICONO_CHECK, ICONO_MAS, ICONO_MENOS, ICONO_SALIR, ICONO_VOLVER } from '@/assets/iconos';
import { ModalIcono } from '@/components/molecules/modal-icono';
import Rating from '@/components/molecules/rating';
import { agregarProductoCarro, obtenerDatosProducto, obtenerDatosProductoUser, updateProductRating } from '@/firebase-js/api';
import { BEIGE, BLACK, BLANCO_TITANIO, GREEN, GREEN_2, GRIS_CLARO, GRIS_OSCURO, NEGRO, RED, VERDE_CLARO, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleVertical } from '@/styles/mixins';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

const { width: viewportWidth } = Dimensions.get('window');

export const ProductosScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const [statea, setStatea] = useState(false);
    const fadeAnima = useRef(new Animated.Value(0)).current;
    const [esA, setesA] = useState(false);

    // const [Idtienda, setIdtienda] = useState('');

    const [uiduser, setuiduser] = useState('');
    const [Idprod, setIdprod] = useState('');
    const [nombre, setnombre] = useState('');
    const [imagen, setimagen] = useState('');
    const [detalle, setdetalle] = useState('');
    const [precio, setprecio] = useState(0);
    const [cantidad, setcantidad] = useState(0);
    const [pesounidad, setpesounidad] = useState('');
    const [produnitvalue, setprodunitvalue] = useState(0);
    const [activo, setActivo] = useState(true);
    const [descuento, setDescuento] = useState(false);
    const [descuentonum, setdescuentonum] = useState(0);
    const [rating, setRating] = useState(0);
    const [shopId, setShopId] = useState('');
    const [prodId, setProdId] = useState('');
    const [userId, setUserId] = useState('');

    const navigation = useNavigation();

    const [ishandleAlerta, setIshandleAlerta] = useState(false);
    const handleAlerta = () => setIshandleAlerta(() => !ishandleAlerta);

    const user = useSelector((state: Store) => state.auth.user);

    const getProducto = async () => {

        const shopid = await AsyncStorage.getItem('@shopid')
        setShopId(shopid);
        const prodid = await AsyncStorage.getItem('@prodid')
        setProdId(prodid);
        const userid = await AsyncStorage.getItem('@useruid')
        setUserId(userid);
        if (shopid && prodid && userid) {
            revisarProdUser(shopid, userid, prodid);
        } else {
            setVisible(false);
            setAlert(true);
            setMessageAlert('error');
        }
    };

    const revisarProdUser = async (shop_id: string, user_id: string, product_id: string) => {
        await obtenerDatosProductoUser(
            user_id,
            product_id,
            (doc) => {
                if (!doc) {
                    revisarProdTienda(shop_id, user_id, product_id);
                } else {
                    setVisible(false);
                    setShopId(shop_id);
                    setuiduser(user_id);
                    setIdprod(doc.product_id);
                    setnombre(doc.product_name);
                    setimagen(doc.product_sku);
                    setdetalle(doc.product_details);
                    setprecio(doc.product_price);
                    setActivo(doc.product_active);
                    setDescuento(doc.product_isdisc);
                    setdescuentonum(doc.product_disc);
                    setpesounidad(doc.product_unit);
                    setprodunitvalue(doc.product_unit_value);
                    setcantidad(doc.product_cuant);
                    setRating(doc.product_rating);
                }
            });
    };

    const setProductRating = async (rating: number) => {
        await updateProductRating(
            shopId,
            userId,
            prodId,
            rating);
        setRating(rating);
    }

    const revisarProdTienda = async (shop_id: string, user_id: string, product_id: string) => {
        await obtenerDatosProducto(
            shop_id,
            product_id,
            (doc) => {
                if (!doc) {
                    setVisible(false);
                    setAlert(true);
                    setMessageAlert('error al obtener datos del producto');
                } else {
                    setVisible(false);
                    setShopId(shop_id);
                    setuiduser(user_id);
                    setIdprod(doc.product_id);
                    setnombre(doc.product_name);
                    setimagen(doc.product_sku);
                    setdetalle(doc.product_details);
                    setprecio(doc.product_price);
                    setActivo(doc.product_active);
                    setDescuento(doc.product_isdisc);
                    setdescuentonum(doc.product_disc);
                    setpesounidad(doc.product_unit);
                    setprodunitvalue(doc.product_unit_value);
                    setRating(doc.product_rating);
                }
            });
    };

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const agregaralCarro = async () => {
        await agregarProductoCarro(
            uiduser,
            shopId,
            Idprod,
            imagen,
            nombre,
            detalle,
            pesounidad,
            produnitvalue,
            precio,
            cantidad,
            () => {
                handleAlerta();
            },
            () => {
                setAlert(true);
                setMessageAlert('error al agregar el producto al carro');
            },

        );
    };

    useEffect(() => {
        setVisible(true);
        getProducto();
    }, []);

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

            <View style={{ alignItems: 'center', height: '100%'}}>
                <View style={{
                    backgroundColor: 'rgba(73, 201, 139, 1)',
                    width: '100%',
                    height: '100%'
                }}>
                    <ScrollView endFillColor={WHITE}
                        style={{
                            position: 'relative',
                        }}>


                        <View style={estilos.barra_superiod}>
                            <TouchableOpacity onPress={() => navigation.navigate('MiCarro')}>
                                <Image style={estilos.iconosSuperior} source={ICONO_CARRO} />
                            </TouchableOpacity>

                            <Text style={{

                                fontSize: 20,
                                flex: 1,
                                textAlign: 'center',
                                color: WHITE,
                                alignSelf: 'flex-end',
                                fontFamily: 'poppinsBold',
                                marginBottom: 7,
                            }}>Detalle de producto</Text>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Image style={{
                                    height: 33,
                                    width: 33, start: 3,
                                    tintColor: WHITE,
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }} source={ICONO_VOLVER} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            paddingTop: 30,
                            flexDirection: 'column',
                            width: '100%',
                            flex: 1,
                            alignItems: 'stretch',
                            borderTopEndRadius: 40,
                            borderTopStartRadius: 40,
                            backgroundColor: '#FFFFFF',                            
                        }}>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 25,
                            }}>
                                <Image style={{
                                    width: '100%', height: 250, borderRadius: 18,
                                }} source={{ uri: imagen }} />
                            </View>
                            <View style={{
                                flex: 1,
                                width: '100%',
                                paddingHorizontal: 25,
                                height: 'auto',
                                flexDirection: 'column',
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    width: 'auto',
                                    textAlign: 'center',
                                    flex: 1,
                                    color: NEGRO,
                                    marginTop: 10,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsSemiBold',
                                }}>{nombre}</Text>
                                <View style={{ marginHorizontal: 10, width: 'auto', height: 'auto' }}>

                                    <Text style={{
                                        fontSize: 20,
                                        width: 'auto',
                                        textAlign: 'center',
                                        color: NEGRO,
                                        marginTop: 40,
                                        alignSelf: 'flex-start',
                                        fontFamily: 'poppinsSemiBold',
                                    }}>Detalles</Text>
                                    <View style={{
                                        height: 4,
                                        width: '15%',
                                        marginStart: 12,
                                        alignSelf: 'flex-start',
                                        borderRadius: 15,
                                        backgroundColor: 'rgba(73, 201, 139, 1)',
                                    }} />
                                </View>

                            </View>


                            <View 
                            style={{
                                paddingTop: 40,
                                flexDirection: 'column',
                                marginTop: 7,
                                width: '100%',
                                height: '100%',
                                flex: 1,
                                elevation: 6,
                                alignItems: 'stretch',
                                borderTopEndRadius: 40,
                                borderTopStartRadius: 40,
                                backgroundColor: GRIS_CLARO,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    width: 'auto',
                                    marginHorizontal: 15,
                                    minHeight: 75,
                                    maxHeight: 75,
                                    textAlign: 'center',
                                    color: NEGRO,
                                    alignSelf: 'flex-start',
                                    fontFamily: 'poppinsLight',
                                }}>{detalle}</Text>

                                <View style={{
                                    paddingTop: 30,
                                    flexDirection: 'column',
                                    marginTop: 7,
                                    width: '100%',
                                    height: '100%',
                                    flex: 1,
                                    elevation: 6,
                                    alignItems: 'stretch',
                                    borderTopEndRadius: 40,
                                    borderTopStartRadius: 40,
                                    backgroundColor: BLANCO_TITANIO,
                                    paddingBottom: 20,
                                }}>

                                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 15}}>

                                        <Text style={{
                                            fontSize: 20,
                                            width: 'auto',
                                            textAlign: 'center',
                                            color: NEGRO,
                                            alignSelf: 'flex-start',
                                            fontFamily: 'poppinsSemiBold',
                                        }}>{nombre}</Text>
                                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                            <Rating size={26} rating={rating} setRating={setProductRating} />
                                        </View> 
                                    </View>

                                    <View style={{
                                        flex: 1, 
                                        flexDirection: 'row', 
                                        paddingHorizontal: 15,
                                        marginTop: 6, 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            color: NEGRO,
                                            fontFamily: 'poppinsLight',
                                        }}>Ventas mensuales: {'100'}</Text>
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            gap:5
                                            }}>
                                        <Text style={{
                                            fontSize: 15,
                                            color: NEGRO,
                                            fontFamily: 'poppinsSemiBold',
                                        }}>{'5.0'}</Text>
                                        <Text style={{
                                            fontSize: 13,
                                            color: NEGRO,
                                            fontFamily: 'poppinsLight',
                                        }}>{`(${200} valoraciones)`}</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row', 
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingHorizontal: 15,
                                        width: '100%',
                                        marginTop: 6,
                                    }}>
                                        <Text style={{
                                            fontSize: 20,
                                            width: 'auto',
                                            textAlign: 'center',
                                            color: NEGRO,
                                            alignSelf: 'flex-start',
                                            fontFamily: 'poppinsSemiBold',
                                        }}>ARS{precio}</Text>
                                            <View style={{
                                                height: 32,
                                                width: 130,
                                                backgroundColor: cantidad === 0 ? GREEN_2:'rgba(94, 214, 156, 1)',
                                                borderRadius: 30,
                                                borderWidth: cantidad === 0 ? 1:0,
                                                borderColor: cantidad > 0 ? GREEN:'#4BB280',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                                <TouchableOpacity style={{
                                                    marginHorizontal: 10,
                                                }}
                                                    onPress={() => { if (cantidad >= 1) { setcantidad(cantidad - 1) } }}>
                                                    <Image style={{
                                                        height: 20,
                                                        width: 20,
                                                        tintColor: cantidad === 0 ? BLACK:WHITE,
                                                    }} source={ICONO_MENOS} />
                                                </TouchableOpacity>
                                                <Text style={{
                                                    color: cantidad === 0 ? BLACK:WHITE,
                                                    fontFamily: 'poppinsLight',
                                                    fontSize: 23,
                                                }}>{cantidad}</Text>
                                                <TouchableOpacity style={{
                                                    marginHorizontal: 10,
                                                }}
                                                    onPress={() => { setcantidad(cantidad + 1) }}>
                                                    <Image style={{
                                                        height: 20,
                                                        width: 20,
                                                        tintColor: cantidad === 0 ? BLACK:WHITE,
                                                    }} source={ICONO_MAS} />
                                                </TouchableOpacity>
                                            </View>

                                            <TouchableOpacity style={{
                                                width: 120, 
                                                height: 32,
                                                backgroundColor: 'rgba(94, 214, 156, 1)',
                                                borderRadius: 30,
                                            }}
                                                onPress={() => { if (cantidad != 0) agregaralCarro() }}>
                                                <Text style={{
                                                    fontSize: 15,
                                                    width: 'auto',
                                                    paddingVertical: 5,
                                                    textAlign: 'center',
                                                    color: WHITE,
                                                    alignSelf: 'center',
                                                    fontFamily: 'poppinsSemiBold',
                                                }}>Agregar</Text>
                                            </TouchableOpacity>

                                    </View>
                                </View>

                            </View>

                        </View>
                    </ScrollView>

                    <ModalIcono isVisible={ishandleAlerta}>
                        <ModalIcono.Container>
                            <ModalIcono.Header cosas={
                                <Image
                                    style={{
                                        height: scaleVertical(35),
                                        resizeMode: 'contain',
                                        width: scaleHorizontal(35)
                                    }}
                                    source={ICONO_CHECK}
                                />
                            } />
                            <ModalIcono.Body>
                                <Text style={{
                                    fontSize: 17, width: '100%', height: 'auto',
                                    color: '#07AA00',
                                    fontWeight: 'bold'
                                }}>
                                    {'¡Tus productos fueron agregados!'}
                                </Text>

                                <Text style={{
                                    fontSize: 16, width: '100%', height: 'auto',
                                    color: NEGRO,
                                }}>
                                    {'Ya puedes visualizarlos en tu carrito'}
                                </Text>

                            </ModalIcono.Body>
                            <ModalIcono.Footer>
                                <TouchableOpacity style={{
                                    width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'center'
                                }}
                                    onPress={() => { handleAlerta() }}>
                                    <Image style={{
                                        height: 35,
                                        width: 35,
                                        tintColor: NEGRO,
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                    }} source={ICONO_SALIR} />
                                </TouchableOpacity>

                            </ModalIcono.Footer>
                        </ModalIcono.Container>
                    </ModalIcono>

                </View>

            </View>

        </>
    );
};
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    botonDashOn: {
        height: 4,
        width: '40%',
        borderRadius: 15,
        backgroundColor: VERDE_OSCURO,
        alignSelf: 'center',
    },
    botonDashOff: {
        width: 'auto',
        height: 4,
        marginHorizontal: 13,
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
        fontFamily: 'poppinsBold',
    },
    botonOff: {
        fontSize: 20,
        width: 'auto',
        textAlign: 'center',
        color: GRIS_OSCURO,
        alignSelf: 'center',
        fontFamily: 'poppinsBold',
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
