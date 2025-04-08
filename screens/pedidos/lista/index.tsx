import { ICONO_CARRO, ICONO_COMPRAR, ICONO_HOME, ICONO_PUNTO, ICONO_SUPPORT, ICONO_USER, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { UI_BANNERINF } from '@/assets/ui';
import AdapterPedidos from '@/components/atoms/adapter-lista-pedidos';
import { CancelarPedido, obtenerDocuPedidos } from '@/firebase-js/api';
import { BEIGE, BLACK, RED, VERDE_CLARO, VERDE_LINDO, WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleVertical } from '@/styles/mixins';
import { estilos } from '@/styles/tema_general';
import { F1_21_500_31, F1_21_700_31, SIZE_TYPE } from '@/styles/typography';
import { TiendasMulti } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
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

const { width: viewportWidth } = Dimensions.get('window');

const PEDIDO_EJEMPO = [{ "order_address": "", "order_code": "632376", "order_created_at": "5/7/2024 23:54", "order_emp_id": undefined, "order_emp_name": undefined, "order_feedback": "", "order_finished_at": undefined, "order_id": "632376", "order_owner": "Bones Mad", "order_ownerid": "oDZGi43Lbgcn5qSe3AGrH80xHIv1", "order_products_json": undefined, "order_shipping": false, "order_status": "unasigned", "order_store": "000001", "order_total": 650 }];

export const ListaPedidoScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const [statea, setStatea] = useState(false);
    const fadeAnima = useRef(new Animated.Value(0)).current;
    const [esA, setesA] = useState(false);
    const [pedidos, setPedidos] = useState<Array<TiendasMulti> | []>([]);
    const [cancel, setCancel] = useState(false);

    const handleCancel = () => setCancel(!cancel);

    const handleOpinar = () => {
        // setCancel(!cancel)
        navigation.navigate('Opinion')
    }

    const handleRepeat = () => { };

    useEffect(() => {
        setVisible(true);
        try {
            cargarPedidos();
        } catch {
            setVisible(false);
        }
    }, [esA]);

    const fadeInAA = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnima, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const cargarPedidos = async () => {
        const uid = await AsyncStorage.getItem('@useruid');
        if (uid != null) {
            const pedidosx = await obtenerDocuPedidos(uid);            
            setPedidos(pedidosx);
            // setpedidosCom(pedidosx);
            setVisible(false);
        } else {
            setVisible(false);
            setAlert(true);
            setMessageAlert('error al cargar las listas');
        }
    };

    const cancelar = async (id: string) => {
        var today = new Date();
        var time = '' + today.getDay() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes().toPrecision(2);
        const uid = await AsyncStorage.getItem('@useruid');
        CancelarPedido(
            uid,
            id,
            time,
            async () => {
                //TODO
            },
            () => {
                setVisible(false);
            }
        );
        navigation.goBack();
    };

    const orderFilter = (completed: boolean) => {
        let pedidosFiltered = [];
        if (completed) {
            const pedidosCompleted = pedidos.filter((pedido: { order_status: string; }) => pedido.order_status === 'completed');
            pedidosFiltered = (pedidosCompleted?.length > 0) ? pedidosCompleted : PEDIDO_EJEMPO;
        } else {
            pedidosFiltered = pedidos.filter((pedido: { order_status: string; }) => pedido.order_status !== 'completed' && pedido.order_status !== 'cancel' && pedido?.order_store && pedido?.order_store !== 'undefined' );
        }
        return pedidosFiltered;
    }

    // const handleSend = (rating: any, comment: any): void => {
    //     console.info("rating: ", rating);
    //     console.info("comment: ", comment);
    //     handleCancel();
    // }

    const obtenerListaDetalle = async (item) => {
        // try {
        //     await AsyncStorage.setItem('@orderid', id);
        // } catch (e) {
        // }
        // navigation.navigate('ListaOrderDetalle');
        navigation.navigate('Detalle', { order: item });
    }

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
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}
                >
                    {/* <ScrollView 
                        endFillColor={WHITE}
                        style={{
                            position: 'relative',
                        }}
                        > */}

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
                    <View style={styles.screen}>

                        <View style={styles.tabs}>
                            <TouchableOpacity style={styles.tab} onPress={() => { setesA(true) }}>
                                <Text
                                    style={esA ? styles.botonOn : styles.botonOff}
                                >Finalizados</Text>
                                <View
                                    //style={esA ? styles.botonDashOn : styles.botonDashOff}
                                    style={esA && styles.botonDashOn}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tab} onPress={() => { setesA(false) }}>
                                <Text
                                    style={esA ? styles.botonOff : styles.botonOn}
                                >En proceso</Text>
                                <View
                                    style={!esA && styles.botonDashOn}
                                />
                            </TouchableOpacity>

                        </View>

                        <AdapterPedidos
                            finalized={esA}
                            pedidos={orderFilter(esA)}
                            bLeftPress={esA ? handleOpinar : obtenerListaDetalle}
                            bRightPress={esA ? handleRepeat : cancelar}
                        />

                    </View>
                    {/* </ScrollView> */}
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
                                <Image style={{
                                    height: 40,
                                    width: 40,
                                    resizeMode: 'contain',
                                    tintColor: VERDE_LINDO,
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }} source={ICONO_COMPRAR} />
                                <Image style={estilos.puntoInferior} source={ICONO_PUNTO} />
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
                                <Image style={estilos.iconosInferior} source={ICONO_USER} />
                            </TouchableOpacity>

                        </ImageBackground>



                    </View>
                </ImageBackground>

            </View>




        </>
    );
};
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    tabs: {
        width: '100%',
        paddingHorizontal: scaleHorizontal(25),
        height: scaleVertical(29 + 10),
        flexDirection: 'row',
        marginBottom: scaleVertical(10),
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
    },
    botonDashOn: {
        // height: 4,
        // width: '40%',
        // borderRadius: 15,
        // backgroundColor: VERDE_OSCUROCancelarPedido,
        alignSelf: 'center',
        height: scaleVertical(3),
        width: scaleHorizontal(142),
        backgroundColor: '#49C98B',
    },
    botonDashOff: {
        // width: scaleHorizontal(142),
        //height: scaleVertical(3),
        // marginHorizontal: 13,
        // borderRadius: 15,
        // backgroundColor: VERDE_OSCURO,
        // alignSelf: 'center',
    },
    botonOn: {
        ...F1_21_700_31,
        color: '#49C98B',
        alignSelf: 'center',
    },
    botonOff: {
        ...F1_21_500_31,
        color: '#7E8085',
        alignSelf: 'center',
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
    textView: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 30,
        flex: 1, flexDirection: 'row'
    },
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
    screen: {
        //...estilos.contenedorPantalla
        paddingTop: scaleVertical(41),
        //flexDirection:'column',
        width: '100%',
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#FFFF',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
    },
});