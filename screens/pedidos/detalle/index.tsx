import { ICONO_CARRO, ICONO_CREDIT, ICONO_DERECHA, ICONO_SUPPORT, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { obtenerDocuListaDetalle } from '@/firebase-js/api';
import { useAppSelector } from '@/hooks/redux';
import { GRIS_BORDE, GRIS_CLARO, RED, VERDE_CLARO, VERDE_LINDO, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export const DetalleScreen = ({ route }) => {
    const { order } = route.params || {};

    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [products, setProducts] = useState([]);

    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };    

    const shops = useAppSelector((state) => state.shop.list);
    const getShop = (shopId) => {
        const shop = shops.filter((shop)=> shop.shop_id === shopId);
        return shop[0];
      };

    const obtenerListaDetalle = async (id: string) => {
        try {
            await AsyncStorage.setItem('@orderid', id);
        } catch (e) {
        }
        navigation.navigate('ListaOrderDetalle', { order: order });
    }

    const countProducts = (p) => p.reduce((a, b) => a + Number(b.product_cuant), 0);

    useEffect(() => {
        setVisible(true);
        (async () => {
            const userId = await AsyncStorage.getItem('@useruid');
            if (userId !== null) {
                const orderDetail = await obtenerDocuListaDetalle(userId, order.order_id);
                setProducts(orderDetail);
            } else {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al cargar el usuario');
            }
        })();
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

            <View style={{ alignItems: 'center', height: '100%' }}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}
                >
                    <View style={estilos.barra_superiod}>
                        <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
                            <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                        </TouchableOpacity>

                        <Text style={{

                            fontSize: 20,
                            flex: 1,
                            textAlign: 'center',
                            color: WHITE,
                            alignSelf: 'flex-end',
                            fontFamily: 'poppinsBold',
                        }}>Mis pedidos</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                            <Image style={{
                                height: 33,
                                width: 33, start: 3,
                                tintColor: WHITE,
                                alignContent: 'center',
                                alignSelf: 'center',
                            }} source={ICONO_VOLVER} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.contenedorPantalla}>
                        <View style={{
                            flexDirection: 'column',
                            margin: 'auto',
                            alignSelf: 'center',
                            width: '90%',
                            marginTop: 10
                        }}>
                            <Text style={{
                                fontFamily: 'poppinsMedium',
                                fontSize: 12,
                                color: '#5F5F5F'
                            }}>Creado {order.order_created_at}</Text>
                            <Text style={{
                                fontFamily: 'poppinsBold',
                                fontSize: 20,
                                lineHeight: 24,
                                fontWeight: '600'
                            }}>{order.order_shipping ? 'Tu pedido - Delivery' : 'Tu pedido - Take Away'}</Text>
                            <Text style={{
                                fontFamily: 'poppinsSemiBold',
                                fontSize: 12,
                                color: VERDE_LINDO,
                            }}>Detalle</Text>
                            <View style={{
                                width: '100%',
                                marginTop: 15
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '90%',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{
                                        fontFamily: 'poppinsRegular',
                                        fontSize: 13,
                                        color: '#5F5F5F',
                                        verticalAlign: 'middle'
                                    }}>Código de tu pedido</Text>
                                    <Text style={{
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        paddingTop: 3,
                                        borderWidth: 1,
                                        borderColor: VERDE_CLARO,
                                        borderRadius: 20,
                                        fontFamily: 'poppinsSemiBold',
                                        fontSize: 13
                                    }}>{order.order_code}</Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: GRIS_BORDE, marginHorizontal: 10, marginTop: 10, marginBottom: 10 }} />
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    width: '90%',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center'
                                }} onPress={() => { obtenerListaDetalle(order.order_id) }}>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Image style={{ tintColor: VERDE_OSCURO, height: 20, width: 20 }} source={ICONO_CARRO} />
                                        </View>
                                        <Text style={{
                                            textAlignVertical: 'bottom',
                                            marginLeft: 10,
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 13,
                                            color: '#5F5F5F'
                                        }}>{countProducts(products)} productos</Text>
                                    </View>
                                    <View style={{ paddingVertical: 5 }}>
                                        <Image source={ICONO_DERECHA} style={{ height: 15, width: 15 }} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 1, backgroundColor: GRIS_CLARO, marginHorizontal: 10, marginTop: 15, marginBottom: 15 }} />
                                <Text style={{
                                    marginLeft: 16,
                                    fontFamily: 'poppinsRegular',
                                    fontSize: 13,
                                    color: '#5F5F5F'
                                }}>{getShop(order.order_store)?.shop_name}</Text>
                                <View style={{ height: 1, backgroundColor: GRIS_CLARO, marginHorizontal: 10, marginTop: 15, marginBottom: 10 }} />
                                <View style={{
                                    flexDirection: 'row-reverse',
                                    width: '90%',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center'
                                }}>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{ padding: 5, borderRadius: 10, backgroundColor: '#9EDCFF' }}>
                                            <Image style={{ height: 20, width: 20 }} source={ICONO_CREDIT} />
                                        </View>
                                        <Text style={{
                                            textAlignVertical: 'center',
                                            marginLeft: 10,
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 13,
                                        }}>0000</Text>
                                    </View>
                                    <View style={{ paddingVertical: 5 }}>
                                        <Text style={{
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 13,
                                            color: '#5F5F5F',
                                        }}>Medio de pago</Text>
                                    </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: GRIS_CLARO, marginHorizontal: 10, marginTop: 10, marginBottom: 10 }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '90%',
                                    alignSelf: 'center'
                                }}>
                                    <View>
                                        <Text style={{
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 13,
                                            color: '#5F5F5F'
                                        }}>Pago realizado</Text>
                                    </View>
                                    <View>
                                        <Text style={{
                                            fontFamily: 'poppinsRegular',
                                            fontSize: 13,
                                            color: '#2C2C2C'
                                        }}>${order.order_total}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    commentInput: {
        borderRadius: 10,
        padding: 10,
        height: 120,
        textAlignVertical: 'top',
        marginBottom: 20,
        backgroundColor: GRIS_CLARO
    },
    titleStyle: {
        color: RED,
        fontFamily: 'poppinsRegular',
    },
    contenedorPantalla: {
        ...estilos.contenedorPantalla,
        paddingTop: 30,
    },
});
