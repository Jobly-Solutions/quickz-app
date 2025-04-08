import { ICONO_LUPA, ICONO_SHOP, ICONO_VOLVER } from '@/assets/iconos';
import { GRAY, GRAY_1, GREEN, GRIS_CLARO, WHITE } from '@/styles/colors';
import { F1_20_400_30, F1_20_600_30, FONT_SIZE_14, FONT_SIZE_20 } from '@/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchField from '@/components/molecules/campo-busqueda';
import { obtenerDocuTiendas } from '@/firebase-js/api';
import { useAppSelector } from '@/hooks/redux';
import useShop from '@/hooks/useShop';
import { estilos } from '@/styles/tema_general';
import { ShopInformation } from '@/types';
import productUtils from '@/utils/product-utils';

const tempProducts = [{ id: 'p1', image: ICONO_LUPA, name: 'Arroz dos hermanos' }, { id: 'p2', image: ICONO_LUPA, name: 'Arroz dos hermanos' }, { id: 'p3', image: ICONO_LUPA, name: 'Arroz dos hermanos' }]
const tempShops = [{ id: 's1', image: ICONO_SHOP, name: 'Las Marías Supermercado' }, { id: 's2', image: ICONO_SHOP, name: 'Las Marías Supermercado' }, { id: 's3', image: ICONO_SHOP, name: 'Las Marías Supermercado' }]

export function SearchScreen() {
    const [loading, setLoading] = useState(true);
    const [busquedas, setBusquedas] = useState('');
    const [tiendas, setTiendas] = useState<Array<ShopInformation> | []>([]);
    const [items, setItems] = useState([]);
    const [recentlyShops, setRecentlyShops] = useState(tempShops[0]);
    const [recentlyProducts, setRecentlyProducts] = useState(tempProducts[0]);
    const [popularShops, setPopularShops] = useState(tempShops);
    const [popularProducts, setPopularProducts] = useState(tempProducts);
    const [isShops, setIsShops] = useState(true);
    const navigation = useNavigation();
    const { shop, banners } = useShop();
    const {
        getProducts,
        updateCategoryKey, addToCart, filterProducts
    } = productUtils();

    const PRODUCT_LIST = useAppSelector((state) => state.product.myProductList);
    const allProducts = useMemo(() => PRODUCT_LIST, [PRODUCT_LIST]);

    const USER = useAppSelector((state) => state.auth.user);
    const userId = USER?.uid || '';

    const cargarTiendas = async () => {
        const tiendasTodas = await obtenerDocuTiendas();
        const tiendasActivas = tiendasTodas.filter((tienda) => !!tienda.shop_active);
        setTiendas(tiendasActivas);
    };

    const filterShops = (text: string) => {
        const pattern = new RegExp(text, "i");
        return (tiendas.filter(
            (shop) =>
            (
                pattern.test(shop.shop_name)
                // ||
                // pattern.test(shop.direccion)
            )
        ));
    }

    const filtroTexto = (text: string) => {
        if (isShops) {
            const _shops = filterShops(text);
            if (_shops.length) {
                const _popular = _shops.map((shop) => ({ id: shop.shop_id, image: ICONO_SHOP, name: shop.shop_name }));
                setPopularShops(_popular);
                setItems(_popular);
                const _recently = _popular[0];
                setRecentlyShops(_recently);
            }
        } else {
            const _products = filterProducts(allProducts, text);
            if (_products.length) {
                const _popular = _products.map((product) => ({ id: product.id, image: ICONO_LUPA, name: product.product_name }));
                setPopularProducts(_popular);
                setItems(_popular);
                const _recently = _popular[0];
                setRecentlyProducts(_recently);
            }
        }
    };

    const handleIsShops = () => {
        setIsShops(!isShops);
        setItems([]);
        setBusquedas('');
    }

    const handleSearch = (text: string) => {
        setBusquedas(text);
        filtroTexto(text);
    };

    const goToShop = async (shopId) => {
        await AsyncStorage.setItem('@shopid', shopId);
        navigation.navigate('PantallaTienda');
    }

    const goToProduct = async (productId) => {
        await AsyncStorage.setItem('@prodid', productId);
        navigation.navigate('VerProducto')
    }

    const goTo = (id) => {
        if (isShops) goToShop(id);
        else goToProduct(id);
    }

    const Selected = () => <View style={styles.tabSelected} />;

    const getShopId = async () => await AsyncStorage.getItem('@shopid');

    useEffect(() => {
        (async () => {
            const shopId = await getShopId();
            if (shopId && userId) await getProducts(shopId, userId);
            await cargarTiendas();
            setLoading(false);
        })();
    }, []);

    const recently = isShops ? recentlyShops : recentlyProducts;
    const popular = isShops ? popularShops : popularProducts;

    const RenderItem = (item) => {
        return (
            <TouchableOpacity
                key={item.id}
                style={styles.recentlyContainer}
                onPress={() => goTo(item.id)}>
                <Image source={item.image} style={styles.recentlyImage} />
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View
                style={estilos.backgroundimage}>
                <View style={estilos.barra_superiod}>
                    <View style={{ width: 33 }} />
                    <Text style={styles.titleText}>
                        Busqueda
                    </Text>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image style={styles.backImage} source={ICONO_VOLVER} />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={handleIsShops} >
                            <Text style={isShops ? styles.tabTextSelected : styles.tabText}>
                                Tiendas
                            </Text>
                            {isShops && <Selected />}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleIsShops} >
                            <Text style={!isShops ? styles.tabTextSelected : styles.tabText}>
                                Productos
                            </Text>
                            {!isShops && <Selected />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchFieldContainer}>
                        <SearchField
                            value={busquedas}
                            setValue={handleSearch}
                            pressed={() => { filtroTexto(busquedas) }}
                            placeholder={'Buscar...'}
                        />
                    </View>
                    {items.length ? <FlatList
                        data={items}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <RenderItem {...item} />}
                    /> : <>
                        <Text style={styles.recentlyText}>
                            Búsquedas recientes
                        </Text>
                        <RenderItem {...recently} />
                        <View style={{ width: '100%', height: 5, backgroundColor: GRIS_CLARO }} />
                        <Text style={styles.recentlyText}>
                            Búsquedas populares
                        </Text>
                        <FlatList
                            data={popular}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <RenderItem {...item} />
                            }
                        />
                    </>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    body: {
        height: '100%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: WHITE,
        paddingHorizontal: 20
    },
    titleText: {
        color: WHITE,
        fontFamily: 'poppinsSemiBold',
        fontSize: FONT_SIZE_20,
        textAlign: 'center',
        alignSelf: 'center',
    },
    backImage: {
        height: 33,
        width: 33,
        start: 3,
        tintColor: WHITE,
        alignContent: 'center',
        alignSelf: 'center',
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        color: GREEN,
    },
    tabText: {
        ...F1_20_400_30,
        marginHorizontal: 20,
        color: GRAY_1,
    },
    tabTextSelected: {
        ...F1_20_600_30,
        color: GREEN,
    },
    tabSelected: {
        width: 59,
        alignSelf: 'center',
        borderBottomWidth: 3,
        borderColor: GREEN,
    },
    searchFieldContainer: {
        // marginHorizontal: 20,
        borderColor: GRAY,
        borderWidth: 2,
        borderRadius: 8,
    },
    recentlyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    recentlyText: {
        // marginHorizontal: 20,
        marginVertical: 10,
        fontFamily: 'poppinsSemiBold',
        fontSize: FONT_SIZE_14,
    },
    recentlyImage: {
        width: 15,
        height: 15,
        marginRight: 10
    }
});