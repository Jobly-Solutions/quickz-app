import { ICONO_CHECK } from '@/assets/iconos';
import { scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { F1_10_700_15, F1_13_400_19, F1_13_600_19, F1_15_600_22 } from '@/styles/typography';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    steps: number,
    title: string;
}

const ShippingProcesses = ({ steps, title }: Props) => {
    const navigation = useNavigation();

    const id = '555555';
    const delivery = true;
    const address = 'Avenida siempreviva 123';
    const shopName = 'Las Marías Supermercado';
    const total = 999;
    const idTienda = '0001';

    const handleDetail = () => {
        navigation.navigate('OrderPlaced',
            {
                id: id,
                shopId: idTienda,
                address: delivery ? address : shopName,
                delivery: delivery,
                total: total,
                created: '11:35 a.m.',
                products: 5,
                deliveryTime: '24 de enero , 15:00hs-17:00hs'
            }
        );
    };
    const handleOpinar = () => { navigation.navigate('Opinion') };

    const CheckCircle = () =>
        <View style={styles.iconWrapper}>
            <View style={styles.iconBackground}>            
            <Image
                style={{
                    width: scaleModerate(13),
                    height: scaleModerate(10),
                    resizeMode: 'contain',
                }}
                source={ICONO_CHECK}
            />
            </View>
        </View>;

    const Line = () =>
        <View style={styles.lineContainer}>
            <View style={styles.whiteStrip} />
        </View>;

    const PendingDot = () =>
        <View style={styles.pendingDotWrapper}>
            <View style={styles.pendingDot} />
        </View>;

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Las Marías Supermercado - Benavidez</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: scaleVertical(10),
                minHeight:scaleVertical(30),
            }}>
                <Text style={styles.subtitle}>{title}</Text>
                <View style={styles.statusContainer}>
                    <View style={styles.statusDots}>
                        <CheckCircle />
                        <Line />
                        {steps > 0 ? <CheckCircle /> : <PendingDot />}
                        <Line />
                        {steps > 1 ? <CheckCircle /> : <PendingDot />}
                        <Line />
                        {steps > 2 ? <CheckCircle /> : <PendingDot />}
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.orderCode}>Código de pedido: 555555</Text>
                <TouchableOpacity
                    style={styles.detailButton}
                    onPress={steps > 2 ? handleOpinar : handleDetail}>
                    <Text style={styles.detailButtonText}>{steps > 2 ? 'opinar' : 'ver detalle'}</Text>
                    <FontAwesome name="chevron-right" size={14} color="#FFFFFF" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1f3342',
        paddingVertical: scaleVertical(20),
        paddingHorizontal: scaleHorizontal(20),
        borderRadius: scaleModerate(12),
        margin: scaleModerate(10),
    },
    title: {
        ...F1_13_400_19,
        color: '#FFFFFF',
        marginBottom: scaleVertical(5),
    },
    subtitle: {
        width: scaleHorizontal(199),
        ...F1_15_600_22,
        color: '#FFFFFF',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDots: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: scaleHorizontal(10),
    },
    completedDot: {
        width: scaleHorizontal(12),
        height: scaleVertical(12),
        borderRadius: scaleModerate(6),
        backgroundColor: 'green',
        marginHorizontal: scaleHorizontal(5),
    },
    pendingDotWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pendingDot: {
        width: scaleModerate(25),
        height: scaleModerate(25),
        borderRadius: scaleModerate(30),
        backgroundColor: 'grey',
        borderWidth: scaleModerate(2),
        borderColor: 'white',
        zIndex: 1,
    },
    lineContainer: {
        width: scaleHorizontal(16),
        height: scaleVertical(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteStrip: {
        width: '100%',
        height: scaleVertical(2),
        backgroundColor: 'white',
    },
    greenStrip: {
        width: '100%',
        height: scaleVertical(2),
        backgroundColor: 'green',
    },
    orderCode: {
        ...F1_10_700_15,
        color: '#0DFF8B',
    },
    detailButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailButtonText: {
        ...F1_13_600_19,
        color: '#FFFFFF',
    },
    iconWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBackground: {
        width: scaleModerate(25),
        height: scaleModerate(25),
        borderRadius: scaleModerate(12),
        borderWidth:scaleHorizontal(1),
        borderColor: '#00D57C',
        backgroundColor: '#49C98B',
        alignItems:'center',
        justifyContent: 'center',
    },
});

export default ShippingProcesses;
