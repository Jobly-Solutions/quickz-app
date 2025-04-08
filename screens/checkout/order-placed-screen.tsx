import { ICONO_COSO, ICONO_DERECHA, ICONO_INFO_CIRCLE } from '@/assets/iconos';
import { ButtonBottom } from '@/components/atoms/button-bottom';
import { Titles } from '@/components/atoms/titles';
import { ScreenCustom } from '@/components/templates/screen-custom';
import { GRAY_14, GREEN_2, VERDE_CLARO, VERDE_LINDO } from '@/styles/colors';
import { F1_13_500_20, F1_14_500_21, F1_15_600_22, F1_25_700_24 } from '@/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { restablecerCarro } from '@/firebase-js/api';
import { useAppSelector } from '@/hooks/redux';

interface OrderPlacedScreenProps {
    route: {
        params: {
            id?: string;
            shopId?: string;
            address?: string;
            delivery?: boolean;
            total?: string;
            created?: string;
            products?: number;
            deliveryTime?: string;
        };
    };
    navigation: any;
}

export const OrderPlacedScreen: React.FC<OrderPlacedScreenProps> = ({ route, navigation }) => {
    const {
        id = '55555',
        shopId = '0001',
        address = 'Libertad 788, 2C',
        delivery = false,
        total = '11.500',
        created = '11:35 a.m.',
        products = 5,
        deliveryTime = '24 de enero , 15:00hs-17:00hs'
    } = route.params;

    const shops = useAppSelector((state) => state.shop.list);
    const getShop = (shopId) => {
        const shop = shops.filter((shop) => shop.shop_id === shopId);
        return shop[0];
    };

    const shopName = getShop(shopId)?.shop_name || "Supermercado Las Marías"

    const terminar = async () => {
        const userId = await AsyncStorage.getItem('@useruid');
        restablecerCarro(
            userId,
            () => {
                navigation.navigate('Home');
            },
            () => {
                console.error('error al limpiar el carro');
            });
    }

    const goToHome = () => {
        terminar();
    };
    const goBack = () => {
        //navigation.goBack();
        goToHome();
    }
    const handleProducts = async () => {
        try {
            await AsyncStorage.setItem('@orderid', id);
        } catch (e) { console.error(e) }
        const order = { order_store: shopId, order_id: id };
        navigation.navigate('ListaOrderDetalle', { order: order });
    };

    return (<>
        <ScreenCustom title="Tu pedido fue realizado con éxito." subTitle={shopName} help>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.orderCreated} >{`Creado ${created}`}</Text>
                <Titles title="Tu pedido" subTitle="Detalle" style={TitlesStyles} />

                <View style={styles.orderDetailsContainer}>

                    <View style={styles.orderInfoRow}>
                        <Text style={styles.text}>Código de tu pedido</Text>
                        <Text style={styles.orderInfoValue}>{id}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.orderInfoRow}>
                        <View style={styles.orderInfoRow}>
                            <Image source={ICONO_COSO} style={[styles.icon, styles.colorIcon]} />
                            <Text style={styles.text}>{products} productos</Text>
                        </View>
                        <TouchableOpacity onPress={handleProducts}>
                            <Image source={ICONO_DERECHA} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.orderInfoRow}>
                        <Text style={styles.text}>{address}</Text>
                        <TouchableOpacity onPress={goBack}>
                            <Text style={styles.changeLink}>{delivery ? 'Cambiar' : 'Ver mapa'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.orderInfoRow}>
                        <Text style={styles.text}>Pago realizado</Text>
                        <Text style={styles.changeLink}>${total}</Text>
                    </View>

                </View>

                <View style={styles.deliveryTimeContainer}>
                    <Text style={styles.deliveryTimeLabel}>{delivery ? 'Horario de entrega:' : 'Retiro estimado'}</Text>
                    <Text style={styles.deliveryTimeValue}>{deliveryTime}</Text>
                </View>

                <View style={styles.notificationContainer}>
                    <View style={styles.orderInfoRow}>
                        <Image source={ICONO_INFO_CIRCLE} style={[styles.icon, styles.colorIcon]} />
                        <Text style={styles.notificationText}>Recibirás una notificación cuando tu pedido esté {delivery ? 'en camino.' : 'listo para retirar.'}</Text>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <ButtonBottom text="Volver a inicio" onPress={goToHome} />
                </View>
            </ScrollView>
        </ScreenCustom>

    </>);
};

const styles = StyleSheet.create({
    container: { marginTop: 20 },
    text: {
        fontSize: 14,
    },
    orderDetailsContainer: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    orderCreated: {
        ...F1_14_500_21,
        color: GRAY_14,
        marginBottom: 2,
    },
    orderInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    orderInfoValue: {
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: VERDE_LINDO,
        borderWidth: 1,
        borderRadius: 30,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginVertical: 20,
    },
    icon: {
        width: 26,
        height: 26,
    },
    colorIcon: { tintColor: VERDE_LINDO },
    changeLink: {
        fontSize: 14,
        fontWeight: '500',
    },
    deliveryTimeContainer: {
        marginBottom: 20,
        gap: 10,
    },
    deliveryTimeLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    deliveryTimeValue: {
        color: '#000000',
        fontSize: 14,
        marginLeft: 10,
    },
    notificationContainer: {
        backgroundColor: GREEN_2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        borderColor: '#5ED69C',
        borderWidth: 1,
    },
    notificationText: {
        width: '90%',
        ...F1_13_500_20,
        color: '#5E5E5E',
        includeFontPadding: false,
    },
});

const TitlesStyles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    titleText: {
        ...F1_25_700_24,
    },
    subTitleText: {
        ...F1_15_600_22,
        color: VERDE_CLARO
    },
});