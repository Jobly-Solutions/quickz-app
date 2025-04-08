import { ICONO_COSO, ICONO_LUPA, ICONO_TIEMPO, ICONO_USER, ICONO_VOLVER } from '@/assets/iconos';
import AdapterVertical from '@/components/molecules/adapter-lista-vertical';
import { useAppSelector } from '@/hooks/redux';
import useShop from '@/hooks/useShop';
import { BEIGE, BLACK, BLANCO_TITANIO, BLUE_1, GRAY_DARK, NEGRO, RED, VERDE_CLARO, VERDE_LINDO, VERDE_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { F1_13_400_19, SIZE_TYPE } from '@/styles/typography';
import { TiendasProducto } from '@/types';
import productUtils from '@/utils/product-utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
// import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get("window");

export const PantallaTiendaCategory = () => {

    // ESTADO
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState("");
    const [checked, setChecked] = useState(false);
    const [statea, setStatea] = useState(false);
    const fadeAnima = useRef(new Animated.Value(0)).current;
    const [esA, setesA] = useState(false);
    const [busquedas, setbusquedas] = useState("");
    const [estaA, setestaA] = useState(true);
    const [focus, setFocus] = useState(false);
    // const SLIDER_1_FIRST_ITEM = 0;
    // const [_activeSlide, _setActiveSlide] = useState(
    //     SLIDER_1_FIRST_ITEM
    // );
    const [_activeSlide, _setActiveSlide] = useState(0);

    // HOOKS
    const navigation = useNavigation();
    const { shop } = useShop();
    // const user = useUser();
    const {
        // products, allProducts, category, subCategory, 
        updateCategoryKey, updateSubCategory, addToCart, filterProducts
    } = // useProduct();
        productUtils();

    const CATEGORY = useAppSelector((state) => state.category.category);
    const category = CATEGORY//useMemo(() => CATEGORY, [CATEGORY]);

    const SUBCATEGORY = useAppSelector((state) => state.subCategory.subCategory);
    const subCategory = SUBCATEGORY//useMemo(() => SUBCATEGORY, [SUBCATEGORY]);

    const PRODUCT_LIST_SELECTED = useAppSelector((state) => state.product.productListSelected);
    const products = PRODUCT_LIST_SELECTED //useMemo(() => PRODUCT_LIST_SELECTED, [PRODUCT_LIST_SELECTED]);

    const PRODUCT_LIST = useAppSelector((state) => state.product.myProductList);
    const allProducts = PRODUCT_LIST //useMemo(() => PRODUCT_LIST, [PRODUCT_LIST]);


    const USER = useAppSelector((state) => state.auth.user);
    const userId = USER?.uid || '';

    const route: any = useRoute();

    // const userAuth = useSelector((state: Store) => state.auth.user);  

    // METODOS
    const limpiar = async () => {
        setestaA(false);
    };

    const activarA = async () => {
        try {
            // await getProducts(shopId);
            limpiar();
            setestaA(true);
            setLoading(false);
        } catch {
            setLoading(false);
        }
    };

    const activar = (categorySelected: string) => {
        try {
            updateSubCategory(allProducts, categorySelected);
            limpiar();
            setLoading(false);
        } catch {
            setLoading(false);
        }
    };

    const agregaralCarro = async (product: TiendasProducto, quantity: number, shopId) => {
        setLoading(true);
        shopId = shopId || shop.id;
        const doc = addToCart(products, shopId, userId, product, quantity);
        if (typeof doc === "string") {
            setLoading(false);
            setAlert(true);
            setMessageAlert(doc);
        } //else activarA();
        setLoading(false);
    };

    function wp(percentage: number) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }

    const slideWidth = wp(100);
    const itemHorizontalMargin = wp(2);
    const sliderWidth = viewportWidth;
    const itemWidth = slideWidth + itemHorizontalMargin * 2;

    let _slider1Ref: any;
    const _renderSlider = ({ item }: any) => {
        return <Image source={{ uri: item.banner_url }} style={estilos.imageSlider} />;
    };

    const filtroTexto = async (texto: string) => filterProducts(products, texto);

    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert("");
    };

    // EFFECTS
    useEffect(() => {
        setLoading(true);
        (async () => {
            updateCategoryKey(allProducts, await route.params?.category);
        })();
        setLoading(false);
    }, []);

    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title="Error"
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
                alignItems: "center",
                backgroundColor: "#e4936d", height: "100%"
            }}>
                <View
                    style={{
                        backgroundColor: "#e4936d",
                        height: "100%",
                        width: "100%"
                    }}
                >
                    <ScrollView endFillColor={BLANCO_TITANIO}
                        style={{
                            position: "relative",
                        }}>


                        <View style={{
                            height: 105,
                            marginTop: 45,
                            alignContent: "stretch",
                            flexDirection: "row-reverse",
                            backgroundColor: "#e4936d",
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                        }}>
                            <TouchableOpacity onPress={() => navigation.navigate("MiCarro")}>
                                <Image style={estilos.iconosSuperior} source={ICONO_COSO} />
                            </TouchableOpacity>
                            <View style={{ display: "flex", flex: 1 }}>
                                {shop.imagen ?
                                    <Image style={estilos.iconoUserFoto} source={{ uri: shop.imagen }} />
                                    : <View style={{
                                        height: 65,
                                        width: 65,
                                        backgroundColor: "#49C98B",
                                        borderRadius: 60,
                                        justifyContent: "center",
                                        alignContent: "center",
                                        alignSelf: "center",
                                    }}>
                                        <Image style={estilos.iconoUser} source={ICONO_USER} />

                                    </View>
                                }
                                <Text style={{

                                    fontSize: 14,
                                    flex: 1,
                                    marginTop: 5,
                                    textAlign: "center",
                                    color: WHITE,
                                    alignSelf: "center",
                                    fontFamily: "poppinsMedium",
                                }}>{shop?.nombre || ''}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                                <Image style={{
                                    height: 33,
                                    width: 33, start: 3,
                                    tintColor: WHITE,
                                    alignContent: "center",
                                    alignSelf: "center",
                                }} source={ICONO_VOLVER} />
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            flexDirection: "column",
                            width: "100%",
                            flex: 1,
                            alignItems: "stretch",
                            backgroundColor: "#FFFFFF",
                        }}>

                            <View style={{
                                flex: 1,
                                height: "auto",
                                elevation: 3,
                                marginHorizontal: 20,
                                marginBottom: 7,
                                backgroundColor: WHITE,
                                borderRadius: 13,
                                flexDirection: "column",
                            }}>
                                {/* {route.params.delivery ? */}
                                {shop.delivery ?
                                    <><Text style={{
                                        color: NEGRO,
                                        fontFamily: "poppinsRegular",
                                        fontSize: 13,
                                        height: "auto",
                                        paddingHorizontal: 20,
                                        paddingTop: 10,
                                        textAlign: "center",
                                        includeFontPadding: false,
                                        width: "auto",
                                    }}>
                                        Realizando tu pedido antes de las 12:30hs
                                    </Text>
                                        <Text style={{
                                            color: NEGRO,
                                            fontFamily: "poppinsRegular",
                                            fontSize: 13,
                                            height: "auto",
                                            paddingHorizontal: 20,
                                            paddingBottom: 10,
                                            textAlign: "center",
                                            includeFontPadding: false,
                                            width: "auto",
                                        }}>
                                            recibilo hoy mismo entre las 15:00-17:00hs
                                        </Text></> : <><Text style={{
                                            color: NEGRO,
                                            fontFamily: "poppinsRegular",
                                            fontSize: 13,
                                            height: "auto",
                                            paddingHorizontal: 20,
                                            paddingTop: 10,
                                            textAlign: "center",
                                            includeFontPadding: false,
                                            width: "auto",
                                        }}>
                                            Tiempo estimado de preparación
                                        </Text>
                                        <View style={{
                                            display: "flex",
                                            flex: 1,
                                            flexDirection: "row",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            height: "auto",
                                            width: "auto",
                                        }}>
                                            <Text style={{
                                                color: NEGRO,
                                                fontFamily: "poppinsMedium",
                                                height: "auto",
                                                paddingEnd: 5,
                                                paddingBottom: 10,
                                                textAlign: "center",
                                                includeFontPadding: false,
                                                width: "auto",
                                            }}>
                                                30 min a 40 min
                                            </Text>
                                            <Image style={{
                                                height: 15,
                                                resizeMode: "contain",
                                                width: 15,
                                                tintColor: VERDE_LINDO,
                                            }} source={ICONO_TIEMPO} />
                                        </View></>}
                            </View>

                            <View style={{
                                flex: 1,
                                paddingHorizontal: 5,
                                flexDirection: "row",
                            }}>
                                <View style={{
                                    justifyContent: "center",
                                    height: 45, elevation: 3, flexDirection: "row",
                                    width: 375,
                                    backgroundColor: WHITE, borderRadius: 5,
                                    marginLeft: 15,
                                    marginTop: 10
                                }}>
                                    <TouchableOpacity style={{
                                        height: 47,
                                        width: 47,
                                        marginBottom: 4,
                                        justifyContent: "center",
                                        elevation: 6
                                    }} onPress={() => {
                                        setbusquedas(""), filtroTexto(busquedas)
                                    }}>
                                        <View style={{
                                            height: 45,
                                            width: 40,
                                            justifyContent: "center",
                                            alignSelf: "center",
                                        }} >
                                            <Image style={{
                                                height: 25,
                                                alignSelf: "center",
                                                padding: 10,
                                                width: 25,
                                                tintColor: BLACK,
                                            }} source={ICONO_LUPA} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{
                                        justifyContent: "center",
                                        flex: 1,
                                        elevation: 6,
                                        padding: 3,
                                        marginLeft: -10,
                                        marginHorizontal: 6
                                    }}>
                                        <TextInput
                                            // style={styles.input}
                                            onBlur={() => setFocus(false)}
                                            onFocus={() => setFocus(true)}
                                            placeholder={"Buscar producto"}
                                            value={busquedas}
                                            onChangeText={setbusquedas}
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                </View>

                            </View>

                            <View style={{ flex: 1, width: "100%", height: "auto", paddingBottom: 20, marginTop: 15 }}>
                                <View style={{ width: "100%", flexDirection: "row" }}>
                                    <ScrollView style={{
                                    }} showsHorizontalScrollIndicator={false} horizontal={true}
                                        contentContainerStyle={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            height: 40,
                                            marginLeft: 15,
                                            gap: 10
                                        }} >
                                        {category.value && category.value.map((item: any, index: any) =>
                                            <TouchableOpacity key={index} onPress={() => { activar(item.key) }}>
                                                <Text style={subCategory === item.key ? styles.botonOn : styles.botonOff}>{item?.value || ''}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </ScrollView>
                                </View>
                                <Text style={{ fontFamily: "poppinsBold", fontSize: 20, color: BLACK, marginLeft: 20 }}>{category?.key || ''}</Text>
                                {products && AdapterVertical(
                                    shop.id,
                                    products,
                                    (product, quantity, shopId) => { agregaralCarro(product, quantity, shopId) }
                                )}
                            </View>

                        </View>
                    </ScrollView>

                </View>

            </View>

        </>
    );
};
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    categorys: {
        width: 70,
        height: 70
    },
    deliveryOn: {
        color: "#49C98B",
        fontFamily: "poppinsSemiBold",
        height: "auto",
        padding: 2,
        marginHorizontal: 10,
        fontSize: 17,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        includeFontPadding: false,
        width: "100%",
    },
    deliveryOn2: {
        height: "auto",
        width: "100%",
        borderColor: "#49C98B",
        borderRadius: 40,
        padding: 2,
        marginHorizontal: 10,
        borderWidth: 2,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        flex: 1,
    },
    deliveryOff: {
        color: GRAY_DARK,
        fontFamily: "poppinsSemiBold",
        height: "auto",
        fontSize: 17,
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        includeFontPadding: false,
        width: "auto",
    },
    deliveryOff2: {
        height: "auto",
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "auto",
    },
    botonDashOn: {
        height: 4,
        width: "40%",
        borderRadius: 15,
        backgroundColor: VERDE_OSCURO,
        alignSelf: "center",
    },
    botonDashOff: {
        width: "auto",
        height: 4,
        marginHorizontal: 13,
        borderRadius: 15,
        backgroundColor: VERDE_OSCURO,
        alignSelf: "center",
    },
    botonOn: {
        ...F1_13_400_19,
        // shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.26,
        shadowRadius: 1,
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: "auto",
        height: "auto",
        color: NEGRO,
        backgroundColor: WHITE,
        borderRadius: 16,
        borderColor: BLUE_1,
        borderWidth: 1,
    },
    botonOff: {
        ...F1_13_400_19,
        // shadowColor: 'rgba(0,0,0,0.15)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.26,
        shadowRadius: 1,
        elevation: 1,
        paddingHorizontal: 10,
        paddingVertical: 4,
        width: "auto",
        height: "auto",
        color: NEGRO,
        backgroundColor: WHITE,
        borderRadius: 16,
    },
    container: {
        justifyContent: "center",
        backgroundColor: WHITE,
    },
    formContainer: {
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        backgroundColor: "#FFFFFF",
    },
    titleStyle: {
        color: RED,
        fontFamily: "poppinsRegular",
    },
    fadingContainer: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    spinnerTextStyle: {
        color: "#FFFFFF",
    },
    contenedorPantalla: {
        flexDirection: "column",
    },
    containeracc: {
        width: "100%",
        backgroundColor: VERDE_CLARO,
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        flexDirection: "row",
    },
    textView: { alignItems: "center", marginBottom: 5, marginTop: 30, flex: 1, flexDirection: "row" },
    textPrimary: {
        fontSize: SIZE_TYPE.big,
        textAlign: "center",
        width: "100%",
        marginTop: 30,
    },
    losePassword: {
        color: BLACK,
        fontSize: 15,
        fontFamily: "poppinsRegular",
        textDecorationLine: "underline",
        alignSelf: "flex-end",
        marginBottom: 30,
        marginTop: 5,
    },
    aligncenter: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 120,
        alignItems: "center",
    },
    containerBton: {
        marginBottom: "10%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    SectionStyle: {
        flex: 3,
        top: 45,
    },
    registerbuttonStyle: {
        backgroundColor: BEIGE,
        height: 40,
        width: viewportWidth * 0.65,
        alignItems: "center",
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
        width: "70%",
        height: "70%",
        borderRadius: 7,
    },
    registerNow: {
        fontSize: 15,
        fontFamily: "poppinsRegular",
        textDecorationLine: "underline",
    },
    donthaveacc: {
        fontSize: 15,
        fontFamily: "poppinsRegular",
    },
});
