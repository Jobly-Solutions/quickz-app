import { ICONO_SUPPORT, ICONO_VOLVER } from '@/assets/iconos';
import { Modal } from '@/components/molecules/modal';
import { obtenerDatosTienda, obtenerDocuListaDetalle } from '@/firebase-js/api';
import { BEIGE, BLACK, GRIS_OSCURO, NEGRO, VERDE_CLARO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { TiendasProductoCheck } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { parseInt } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
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
import { AdapterProductosDetalle } from './adapterProductosDetalle';

const { width: viewportWidth } = Dimensions.get('window');

export const ListaDetalle = ({ route }) => {
    const { order } = route.params || {};

    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [uiduser, setuiduser] = useState('0');
    const [orders, setOrders] = useState<Array<TiendasProductoCheck> | []>([]);
    const [total, setTotal] = useState(0);
    const [totalDel, setTotalDel] = useState(0);
    const [totalServ, setTotalServ] = useState(0);
    const [delivery, setDelivery] = useState(true);
    const [redirec, setRedirec] = useState(false);
    const handleRedirec = () => { setRedirec(() => !redirec); setVisible(false) }

    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const getDocuDetalle = async (userId: string, orderId: string) => {
        setVisible(true);
        try {
            const orderDetail = await obtenerDocuListaDetalle(userId, orderId);
            if (orderDetail) {
                setOrders(orderDetail);
                const tot = orderDetail.reduce((a, b) => a + Number(b.product_price), 0);
                setTotal(tot);
                setVisible(false);
            }
        } catch (error) {
            setVisible(false);
            setAlert(true);
            setMessageAlert('error');
            console.error('error', error)
        }
    };

    useEffect(() => {
        setVisible(true);
        (() => {
            obtenerDatosTienda(
                order.order_store,
                (doc) => {
                    if (!doc) {
                        setVisible(false);
                        setAlert(true);
                        setMessageAlert('Error al obtener los datos de la tienda');
                    } else {
                        const eca = doc.shop_envio;
                        const esa = parseInt(doc.shop_envio_precio);
                        setTotalDel(esa);
                        setTotalServ(parseInt(doc.shop_pago_precio));
                        if (!eca) {
                            setDelivery(false);
                        }
                    }
                })
        })();
        (async () => {
            const userId = await AsyncStorage.getItem('@useruid');
            const orderId = await AsyncStorage.getItem('@orderid')
            if (userId !== null) {
                setuiduser(userId);
                if (orderId !== null) {
                    getDocuDetalle(userId, orderId);
                }
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
            <Spinner visible={visible} />

            <View style={{ alignItems: 'center', height: '100%' }}>
                <View style={{
                    backgroundColor: 'rgba(73, 201, 139, 1)',
                    width: '100%',
                    height: '100%'
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
                        }}>Mi pedido</Text>
                        <TouchableOpacity onPress={() => { handleRedirec() }}>
                            <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height: 33,
                            width: 33, marginStart: 15,
                            position: 'absolute',
                            alignContent: 'center',
                            alignSelf: 'center',
                        }} onPress={() => {
                            navigation.goBack();
                        }}>
                            <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                        </TouchableOpacity>
                    </View>

                    <View style={estilos.contenedorPantalla}>
                        <ScrollView endFillColor={WHITE} showsVerticalScrollIndicator={false}
                            style={{
                                position: 'relative',
                            }}>
                            <View style={{
                                flexDirection: 'column',
                                width: '100%', height: '100%',
                                justifyContent: 'center',
                                flex: 1,
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                            }}>
                                <>
                                    <AdapterProductosDetalle products={orders} />
                                </>

                            </View>

                            {delivery ?
                                <View style={{
                                    width: '100%',
                                    flex: 1,
                                    marginBottom: 100,
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        width: '100%',
                                        flex: 1,
                                        backgroundColor: WHITE,
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        flexDirection: 'column',
                                    }}>

                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Subtotal'}
                                            </Text>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + total}
                                            </Text>

                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Costo de servicio'}
                                            </Text>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + totalServ}
                                            </Text>

                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Costo de envio'}
                                            </Text>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + totalDel}
                                            </Text>

                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', borderTopWidth: 1, borderColor: GRIS_OSCURO }}>

                                            <Text style={{
                                                color: NEGRO,
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Total'}
                                            </Text>
                                            <Text style={{
                                                color: NEGRO,
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + (totalServ + totalDel + total)}
                                            </Text>

                                        </View>

                                    </View>

                                </View>
                                :
                                <View style={{
                                    width: '100%',
                                    flex: 1,
                                    marginBottom: 100,
                                    paddingHorizontal: 15,
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        width: '100%',
                                        flex: 1,
                                        backgroundColor: WHITE,
                                        paddingHorizontal: 5,
                                        paddingVertical: 10,
                                        flexDirection: 'column',
                                    }}>

                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Subtotal'}
                                            </Text>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + total}
                                            </Text>

                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Costo de servicio'}
                                            </Text>

                                            <Text style={{
                                                color: GRIS_OSCURO,
                                                fontFamily: 'poppinsLight',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + totalServ}
                                            </Text>

                                        </View>

                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', borderTopWidth: 1, borderColor: GRIS_OSCURO }}>

                                            <Text style={{
                                                color: NEGRO,
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 16,
                                                height: 'auto',
                                                textAlign: 'center',
                                                marginHorizontal: 15,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                                width: 'auto',
                                            }}>
                                                {'Total'}
                                            </Text>
                                            <Text style={{
                                                color: NEGRO,
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 16,
                                                height: 'auto',
                                                marginHorizontal: 5,
                                                padding: 0,
                                                marginBottom: 0,
                                                includeFontPadding: false,
                                            }}>
                                                {'$' + (totalServ + total)}
                                            </Text>

                                        </View>

                                    </View>

                                </View>
                            }
                        </ScrollView>
                    </View>

                    <Modal isVisible={redirec}>
                        <Modal.Container>
                            <Modal.HeaderCarrito title="Consulta" onPress={() => handleRedirec()} />
                            <Modal.Body>
                                <Text style={{
                                    fontSize: 17,
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
                                    ¿Necesesitas hablar con un representante de la tienda?
                                </Text>


                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

                                    <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                                        <TouchableOpacity style={{
                                            height: 40,
                                            paddingHorizontal: 30,
                                            paddingVertical: 8,
                                            borderRadius: 20,
                                            backgroundColor: WHITE,
                                            borderWidth: 1,
                                            borderColor: '#5ED69C'
                                        }} onPress={() => { navigation.navigate('SoporteGeneral') }}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                color: '#5ED69C'
                                            }}>
                                                Aceptar
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            height: 40,
                                            paddingHorizontal: 30,
                                            paddingVertical: 8,
                                            borderRadius: 20,
                                            backgroundColor: '#5ED69C',
                                        }} onPress={() => handleRedirec()}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                color: WHITE
                                            }}>
                                                Cancelar
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>



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