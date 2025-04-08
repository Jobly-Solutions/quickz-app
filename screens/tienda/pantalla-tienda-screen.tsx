import { ICONO_COSO, ICONO_USER, ICONO_VOLVER } from '@/assets/iconos';
import Banner from '@/components/molecules/banner';
import SearchField from '@/components/molecules/campo-busqueda';
import ProductsByCategory from '@/components/molecules/produtcs-by-category';
import TakeAwayOrDelivery from '@/components/molecules/takeaway-or-delivery';
import { useAppSelector } from '@/hooks/redux';
import useShop from '@/hooks/useShop';
import useUser from '@/hooks/useUser';
import { BEIGE, BLACK, BLANCO_TITANIO, GRIS_BORDE, GRIS_CLARO, NEGRO, RED, VERDE_CLARO, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { SIZE_TYPE } from '@/styles/typography';
import { TiendasProducto } from '@/types';
import productUtils from '@/utils/product-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import CategoryMenu from './category-menu';

const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window');

export const PantallaTiendaScreen = () => {
    const { shop, banners } = useShop();
    
    // STATES
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [checked, setChecked] = useState(false);
    const [statea, setStatea] = useState(false);
    const [esA, setesA] = useState(false);
    const [delivery, setdelivery] = useState(false);
    const [busquedas, setbusquedas] = useState('');

    
    const user = useUser();

    const {
        getProducts,
        updateCategoryKey, addToCart, filterProducts
    } = productUtils();

    // HOOKS
    const fadeAnima = useRef(new Animated.Value(0)).current;

    const PRODUCT_LIST_SELECTED = useAppSelector((state) => state.product.productListSelected);
    const products = useMemo(() => PRODUCT_LIST_SELECTED, [PRODUCT_LIST_SELECTED]);

    const PRODUCT_LIST = useAppSelector((state) => state.product.myProductList);
    const allProducts = useMemo(() => PRODUCT_LIST, [PRODUCT_LIST]);

    const USER = useAppSelector((state) => state.auth.user);
    const userId = USER?.uid || '';

    // ROUTES
    const route: any = useRoute();
    const navigation = useNavigation();

    // METHODS
    const checkActivo = () => {
        if (shop.delivery) setdelivery(!delivery);
    }

    const agregaralCarro = async (product: TiendasProducto, quantity: number, shopId: string) => {
        setLoading(true);
        const doc = addToCart(products, shopId, userId, product, quantity);
        if (typeof doc === "string") {
            setLoading(false);
            setAlert(true);
            setMessageAlert(doc);
        }
        // else activarA();
        setLoading(false);
    }

    const filtroTexto = async (texto: string) => filterProducts(products, texto);

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    const getShopId = async () => await AsyncStorage.getItem('@shopid');

    useEffect(() => {
        (async () => {
            const shopId = await getShopId();
            if (shopId && userId) await getProducts(shopId, userId);            
            setLoading(false);
        })();
    }, []);

    useEffect(() => checkActivo(),[shop]);

    const Products = () => {
        return (<>
            {products && <ProductsByCategory
                shopId={shop.id}
                products={products}
                navigation={navigation}
                agregaralCarro={agregaralCarro}
                delivery={delivery}
            />}
        </>)
    }

    // RENDER
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
            <Spinner visible={loading} />

            <View style={{
                alignItems: 'center',
                backgroundColor: '#e4936d', height: '100%'
            }}>
                <View
                    style={{height: '100%',
                    width: '100%',}}>
                    <ScrollView endFillColor={BLANCO_TITANIO}
                        style={{
                            position: 'relative',
                        }}>


                        <View style={{
                            height: 105,
                            marginTop: 45,
                            alignContent: 'stretch',
                            flexDirection: 'row-reverse',
                            //backgroundColor: '#e4936d',
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate('MiCarro')}>
                                <Image style={estilos.iconosSuperior} source={ICONO_COSO} />
                            </TouchableOpacity>
                            <View style={{ display: 'flex', flex: 1 }}>
                                {shop.imagen ?
                                    <Image style={estilos.iconoUserFoto} source={{ uri: shop.imagen }} />
                                    : <View style={{
                                        height: 65,
                                        width: 65,
                                        backgroundColor: '#49C98B',
                                        borderRadius: 60,
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                    }}>
                                        <Image style={estilos.iconoUser} source={ICONO_USER} />

                                    </View>
                                }
                                <Text style={{
                                    fontSize: 14,
                                    flex: 1,
                                    marginTop: 5,
                                    textAlign: 'center',
                                    color: WHITE,
                                    alignSelf: 'center',
                                    fontFamily: 'poppinsMedium',
                                }}>{shop?.nombre || ""}</Text>
                            </View>
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

                        <View style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexDirection: 'column',
                            width: '100%',
                            flex: 1,
                            alignItems: 'stretch',
                            backgroundColor: '#FFFFFF',
                        }}>

                            <TakeAwayOrDelivery checkActivo={checkActivo} takeAway={!shop.delivery} delivery={delivery} deliveryPrecio={shop.deliveryPrecio} pagosPrecio={shop.pagosPrecio} />

                            <View style={{ width: '100%', height: 3, backgroundColor: GRIS_CLARO, marginVertical: 8 }} ></View>

                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderColor: GRIS_BORDE,
                                borderRadius: 10,
                                // elevation: 1,
                                marginBottom: 10,
                                marginHorizontal: 10
                            }}>
                                <SearchField
                                    value={busquedas}
                                    setValue={setbusquedas}
                                    pressed={() => { filtroTexto(busquedas) }}
                                    placeholder={'Buscar producto'}
                                />
                            </View>

                            <Text style={{
                                color: NEGRO,
                                fontFamily: 'poppinsSemiBold',
                                height: 'auto',
                                fontSize: 18,
                                paddingBottom: 5,
                                paddingStart: 15,
                                flex: 1,
                                alignContent: 'flex-start',
                                justifyContent: 'flex-start',
                                alignSelf: 'flex-start',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                includeFontPadding: false,
                                width: 'auto',
                            }}>
                                Categorias
                            </Text>
                            <View style={{ flex: 1, width: '100%', height: 'auto', paddingBottom: 20 }}>
                                <CategoryMenu navigation={navigation} delivery={delivery} />
                                <Banner banners={banners} viewportWidth={viewportWidth} />
                            </View>
                            <Products />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    categorias: {
        width: 70,
        height: 70
    },
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
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 14,
        width: 'auto',
        height: 'auto',
        color: NEGRO,
        elevation: 4,
        backgroundColor: WHITE,
        borderRadius: 10,
        borderColor: VERDE_CLARO,
        borderWidth: 1,
        fontFamily: 'poppinsRegular',
    },
    botonOff: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 14,
        width: 'auto',
        height: 'auto',
        color: NEGRO,
        elevation: 4,
        backgroundColor: WHITE,
        borderRadius: 10,
        fontFamily: 'poppinsRegular',
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
