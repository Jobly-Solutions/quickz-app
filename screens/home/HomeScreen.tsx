import { ICONO_CARRO, ICONO_SALIR, ICONO_TIEMPO, ICONO_VOLVER } from '@/assets/iconos';
import {
    IMAGEN_ERROR
} from '@/assets/images';
import { Button } from '@/components/atoms/button';
import AdapterVertical from '@/components/molecules/adapter-lista-vertical';
import Banner from '@/components/molecules/banner';
import { ModalIcono } from '@/components/molecules/modal-icono';
import { BottomBar } from '@/components/organisms/bottom-bar';
import { agregarProductoCarro, obtenerDatosProducto, obtenerDatosUser, obtenerDocuBanners, obtenerDocuProductos } from '@/firebase-js/api';
import { useAppSelector } from '@/hooks/redux';
import { useGetShops } from '@/hooks/use-shop-actions';
import { BLACK, GRIS_CLARO, NEGRO, WATERCOLOR_TOP, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { INICIAR_SESION } from '@/styles/textos';
import { ShopInformation, TiendasBanner, TiendasProducto, UserInformation } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
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
import { SearchHome } from './components/search-home';
import ShippingProcesses from './components/shipping-processes';
import { ShopsHome } from './components/shops-home';
import { TitleHome } from './components/title-home';

const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window');

export const HomeScreen = () => {
    const navigation = useNavigation();
    const route: any = useRoute();

    const {getShopList, isLoading} = useGetShops();    

    const user = useAppSelector((state) => state.auth.user);
    const userData = useAppSelector((state) => state.user_data);
    const shops = useAppSelector((state) => state.shop.list);

    const [alert, setAlert] = useState(false);useAppSelector
    const [titleAlert, setTitleAlert] = useState('Error');
    const [messageAlert, setMessageAlert] = useState('');
    // const [uidusuario, setuidusuario] = useState('');
    const [screenIsLoading, setScreenLoading] = useState(true);
    const [shopName, setshopName] = useState('');
    const [shopId, setShopId] = useState('');

    const [ishandleRecargar, setIshandleRecargar] = React.useState(false);
    const [ishandleError, setIshandleError] = React.useState(false);
    const [error, setError] = useState('');
    const [busquedas, setbusquedas] = useState('');
    const [ishandleWeb, setIshandleWeb] = React.useState(false);
    const [paginaWeb, setPaginaWeb] = useState('');
    const handleWeb = () => setIshandleWeb(() => !ishandleWeb);
    const handleError = () => setIshandleError(() => !ishandleError);
    const handleRecargar = () => setIshandleRecargar(() => !ishandleRecargar);
    const [iconDelivery, setIconDel] = useState(false);
    const [products, setproducts] = useState<Array<TiendasProducto> | []>([]);
    const [tiendas, setTiendas] = useState<Array<ShopInformation> | []>([]);
    const [userInfo, setUserInfo] = useState<UserInformation>() || {};
    const [banners, setBanners] = useState<Array<TiendasBanner> | []>([]);

    useEffect(() => {
        if (user)
            obtenerDatosUser(user.uid, (doc) => {
                if (!doc) {
                    setScreenLoading(false);
                } else {
                    setUserInfo({
                        ...userInfo,
                        user_address: doc?.user_address || '',
                    } as UserInformation);
                    setScreenLoading(false);
                }
            });
        else setScreenLoading(false);
        getShopList();
    }, []);

    const _onPressLogin = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    };

    const cargarTiendas = async () => {
        const tiendasActivas = shops.filter((tienda) => !!tienda.shop_active);
        const userId = await AsyncStorage.getItem('@useruid');
        const tiendaActivaId = tiendasActivas[0]?.shop_id;
        setShopId(tiendaActivaId);
        const bannersx = await obtenerDocuBanners(tiendaActivaId);
        setshopName(tiendasActivas[0]?.shop_name);
        activarA(tiendaActivaId);

        if (tiendasActivas != null && bannersx != null && userId != null) {
            // setuidusuario(userId);
            setTiendas(tiendasActivas);
            setBanners(bannersx);
            setScreenLoading(false);
        } else {
            setScreenLoading(false);
            setAlert(true);
            setMessageAlert('error al cargar las listas');
        }
    };

    const statusShippingProcesses = ['Tu pedido fue recibido','Tu pedido está en preparación', 'Tu pedido está en camino', 'Tu pedido fue recibido']

    const agregaralCarro = (product: TiendasProducto, quantity: number, shopId: string) => {
        setScreenLoading(true);
        obtenerDatosProducto(
            shopId,//'000001',
            product.product_id,
            (doc) => {
                if (!doc) {
                    setScreenLoading(false);
                    setAlert(true);
                    setTitleAlert('Error');
                    setMessageAlert('error al obtener datos del producto');
                } else {
                    agregarProductoCarro(
                        user.uid,// uidusuario,
                        shopId,
                        doc.product_id,
                        doc.product_sku,
                        doc.product_name,
                        doc.product_details,
                        doc.product_unit,
                        doc.product_unit_value,
                        doc.product_price,
                        1,
                        () => {
                            activarA(shopId);//'000001');
                            // setScreenLoading(false);
                            // setAlert(true);
                            // setTitleAlert("¡Tus productos fueron agregados!");
                            // setMessageAlert("Ya puedes visualizarlos en tu carrito");
                        },
                        () => {
                            setScreenLoading(false);
                            setAlert(true);
                            setTitleAlert('Error');
                            setMessageAlert('error al agregar el producto al carro');
                        },

                    );

                }
            });

    };
    const activarA = async (id: string) => {
        await AsyncStorage.setItem('@shopid', id);
        const value = await AsyncStorage.getItem('@useruid');
        const docuProducts: Array<TiendasProducto> = await obtenerDocuProductos(id);
        if (docuProducts != null && value != null) {
            setScreenLoading(false);
            setproducts(docuProducts);
        }
    };

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    useEffect(() => {
        setScreenLoading(true);
        try {
            cargarTiendas();
        } catch {
            setScreenLoading(false);
        }
    }, [shops]);

    const filtroTexto = async (texto: string) => {
        const pattern = new RegExp(texto, "i");
        setproducts(products.filter(
            (products: TiendasProducto) =>
                pattern.test(products.product_name)
                ||
                pattern.test(products.product_details)
        ));
    };

    function onPressTitleHome(): void {
        navigation.navigate('Addresses');
    }

    const step = Math.floor(Math.random() * 4);

    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title={titleAlert}
                titleStyle={styles.titleStyle}
                message={messageAlert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                onDismiss={() => _cleanAlert()}
                showConfirmButton={false}
            />
            <Spinner visible={screenIsLoading} />
            <View style={{ alignItems: 'center', height: '100%' }}>
                <View
                    style={estilos.backgroundimage}>
                    <ScrollView
                        style={{
                            position: 'relative',
                        }}>
                        <View style={estilos.barra_superiod}>
                            <TouchableOpacity onPress={() => navigation.navigate('MiCarro')}>
                                <Image style={estilos.iconosSuperior} source={ICONO_CARRO} />
                            </TouchableOpacity>
                            <TitleHome userAddress={userInfo?.user_address || ''} handlePress={onPressTitleHome} />
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
                        <SearchHome busquedas={busquedas} setbusquedas={setbusquedas} navigation={navigation} filtroTexto={filtroTexto} />
                        <View style={estilos.contenedorPantalla}>
                            <View style={{
                                width: '100%',
                                // paddingBottom: 90,
                                height: '100%',
                            }}>
                                <Banner banners={banners} viewportWidth={viewportWidth} />

                                <ShopsHome tiendas={tiendas} />
                                <ShippingProcesses title={statusShippingProcesses[step]} steps={step}/>
                                <View style={{ flex: 1, width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', marginBottom: 15 }}>
                                    <View style={{ width: '100%', height: 5, backgroundColor: GRIS_CLARO }} />
                                </View>
                                <Text style={{
                                    color: NEGRO,
                                    fontFamily: 'poppinsSemiBold',
                                    fontSize: 16,
                                    height: 'auto',
                                    marginHorizontal: 15,
                                    padding: 0,
                                    marginBottom: 10,
                                    includeFontPadding: false,
                                    width: 'auto',
                                }}>
                                    {'Destacados de ' + shopName}
                                </Text>
                                <View style={{
                                    width: '100%',
                                    flex: 1,
                                    marginBottom: 120,
                                }}>
                                    {AdapterVertical(shopId, products, (product, quantity, shopId) => { agregaralCarro(product, quantity, shopId) })}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <BottomBar />
                    <ModalIcono isVisible={(route.params) ? route.params.delivery : false}>
                        <ModalIcono.Container>
                            <ModalIcono.Header cosas={
                                <Image
                                    style={{
                                        height: 20,
                                        resizeMode: 'contain',

                                        width: 20
                                    }}
                                    source={ICONO_TIEMPO}
                                />
                            } />
                            <ModalIcono.Body>
                                <Text style={{
                                    fontSize: 17, width: '100%', height: 'auto',
                                    color: '#07AA00',
                                    fontWeight: 'bold', marginVertical: 7, paddingBottom: 10
                                }}>
                                    {'Tu pedido está en camino'}
                                </Text>

                                <Text style={{
                                    fontSize: 16, width: '100%', height: 'auto',
                                    color: NEGRO,
                                }}>
                                    {'¡Nos vemos pronto!'}
                                </Text>

                            </ModalIcono.Body>
                            <ModalIcono.Footer>
                                <TouchableOpacity style={{
                                    width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'center'
                                }}
                                    onPress={() => {
                                        navigation.navigate('Home', { delivery: false, });
                                    }}>
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

                    <ModalIcono isVisible={(route.params) ? route.params.delivery : false}>
                        <ModalIcono.Container>
                            <ModalIcono.Header cosas={
                                <Image
                                    style={{
                                        height: 30,
                                        resizeMode: 'contain',
                                        tintColor: WHITE,
                                        width: 30
                                    }}
                                    source={ICONO_TIEMPO}
                                />
                            } />
                            <ModalIcono.Body>
                                <Text style={{
                                    fontSize: 17, width: '100%', height: 'auto',
                                    color: '#07AA00',
                                    fontWeight: 'bold', marginVertical: 7, paddingBottom: 10
                                }}>
                                    {'Ya podés retirar tu pedido'}
                                </Text>

                                <Text style={{
                                    fontSize: 16, width: '100%', height: 'auto',
                                    color: NEGRO,
                                }}>
                                    {'¡Te estamos esperando!'}
                                </Text>

                            </ModalIcono.Body>
                            <ModalIcono.Footer>
                                <TouchableOpacity style={{
                                    width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'center'
                                }}
                                    onPress={() => {
                                        navigation.navigate('Home', {
                                            delivery: false,
                                        });
                                    }}>
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


            <ModalIcono isVisible={ishandleError}>
                <ModalIcono.Container>
                    <ModalIcono.Header cosas={
                        <Image
                            style={styles.tinyLogo}
                            source={IMAGEN_ERROR}
                        />
                    } />
                    <ModalIcono.Body>
                        <Text style={styles.textSubtitle}>
                            {error}
                        </Text>



                    </ModalIcono.Body>
                    <ModalIcono.Footer>

                        <Button
                            title={INICIAR_SESION}
                            onPressed={() => _onPressLogin()}
                        />
                    </ModalIcono.Footer>
                </ModalIcono.Container>
            </ModalIcono>

            <ModalIcono isVisible={ishandleRecargar}>
                <ModalIcono.Container>
                    <ModalIcono.Header cosas={
                        <Image
                            style={styles.tinyLogo}
                            source={IMAGEN_ERROR}
                        />
                    } />
                    <ModalIcono.Body>
                        <Text style={styles.textSubtitle}>
                            {error}
                        </Text>



                    </ModalIcono.Body>
                    <ModalIcono.Footer>

                        <Button
                            title={INICIAR_SESION}
                            onPressed={() => _onPressLogin()}
                        />

                        <Button
                            title={INICIAR_SESION}
                            onPressed={() => _onPressLogin()}
                        />
                    </ModalIcono.Footer>
                </ModalIcono.Container>
            </ModalIcono>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },

    textWrapper: {
        height: '6%',
        marginTop: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    tinyLogo: {
        marginTop: 20,
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    textSubtitle: {
        textAlign: 'center',
        fontSize: 16,
    },

    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: WATERCOLOR_TOP,
    },
    headerTitle: {
        marginTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fff',
    },
    icons: {
        position: 'absolute',
        left: 15,
        top: 7,
    },

    donthaveacc: {
        fontSize: 15,
        fontFamily: 'poppinsRegular',
    },
    registerNow: {
        fontSize: 15,
        fontFamily: 'poppinsRegular',
        textDecorationLine: 'underline',
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
});
