import { GRAY_DARK, GRAY_LIGHT, GREEN, GREEN_2, NEGRO, VERDE_LINDO, WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleModerate, scaleVertical, TEXT_CENTER } from '@/styles/mixins';
import { F1_12_300_18, F1_12_500_18, F1_15_500_22, F1_15_600_22 } from '@/styles/typography';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICONO_INFO_CIRCLE, ICONO_MAP_MARKER, ICONO_TIEMPO } from '@/assets/iconos';

export default function TakeAwayOrDelivery({ checkActivo, takeAway, delivery, deliveryPrecio, pagosPrecio }) {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {delivery ? <>
                    <Text style={styles.titleText}>
                        Realizando tu pedido antes de las 12:30hs
                    </Text>
                    <Text style={styles.titleText}>
                        recibilo hoy mismo entre las 15:00-17:00hs
                    </Text></>
                    : <>
                        <Text style={styles.titleText}>
                            Tiempo estimado de preparación
                        </Text>
                        <Text style={styles.subTitleText}>
                            {"30 min a 40 min "}
                            <Image style={styles.subTitleImage} source={ICONO_TIEMPO} />
                        </Text>
                    </>}
            </View>

            <View style={styles.isDelivery} >
                {!takeAway && <TouchableOpacity style={delivery ? styles.deliveryOn2 : styles.deliveryOff2} onPress={() => checkActivo()}>
                    <Text style={delivery ? styles.deliveryOn : styles.deliveryOff}>
                        Delivery
                    </Text>
                </TouchableOpacity>}
                <TouchableOpacity style={!delivery ? styles.deliveryOn2 : styles.deliveryOff2} onPress={() => checkActivo()}>
                    <Text style={!delivery ? styles.deliveryOn : styles.deliveryOff}>
                        Retiro en el local
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.TakeawayDeliveryDetail}>
                {delivery ?
                    <View style={styles.deliveryContainer} >
                        <View style={{ flex: 1, }}>
                            <Text style={styles.deliveryText}>
                                Envío
                            </Text>
                            <Text style={styles.priceText}>
                                $ {deliveryPrecio}
                            </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.deliveryText}>
                                Compra minima
                            </Text>
                            <Text style={styles.priceText}>
                                $ {pagosPrecio}
                            </Text>
                        </View>
                    </View>
                    :
                    <>
                        {takeAway && <View style={styles.takeAwayBottomContainer} >
                            <Image style={styles.infoImage} source={ICONO_INFO_CIRCLE} />
                            <Text style={styles.infoText}>
                                {"Este local no cuenta con delivery actualmente"}
                            </Text>
                        </View>}
                        <View style={styles.takeAwayBottomContainer} >
                            <Image style={styles.markerImage} source={ICONO_MAP_MARKER} />
                            <Text style={styles.markerText}>
                                Ver en el mapa
                            </Text>
                        </View>
                    </>
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: scaleVertical(153),
        marginHorizontal: scaleHorizontal(15),
    },
    takeAway: {
        color: '#49C98B',
        fontFamily: 'poppinsSemiBold',
        marginHorizontal: 10,
        fontSize: 17,
        textAlign: 'left',
    },
    deliveryOn: {
        ...F1_15_600_22,
        ...TEXT_CENTER,
        color: '#49C98B',
    },
    deliveryOn2: {
        borderColor: '#49C98B',
        borderRadius: scaleModerate(100),
        borderWidth: 2,
        flex: 1,
        backgroundColor: GREEN_2,
        paddingVertical: scaleVertical(5),
    },
    deliveryOff: {
        ...F1_15_500_22,
        ...TEXT_CENTER,
        color: GRAY_DARK,
    },
    deliveryOff2: {
        flex: 1,
    },
    titleContainer: {
        height: scaleVertical(51),
        marginBottom: scaleVertical(7),
        backgroundColor: WHITE,
        borderRadius: scaleModerate(13),
        flexDirection: 'column',
        borderWidth: 2,
        borderColor: GRAY_LIGHT,
        justifyContent: 'center',
    },
    titleText: {
        color: NEGRO,
        fontFamily: 'poppinsRegular',
        fontSize: 13,
        textAlign: 'center',
        includeFontPadding: false,
        width: 'auto',
    },
    subTitleText: {
        ...F1_12_500_18,
        color: '#000000',
        textAlign: 'center',
    },
    subTitleImage: {
        height: scaleVertical(15),
        resizeMode: 'contain',
        tintColor: VERDE_LINDO,
    },
    isDelivery: {
        width: '100%',
        height: scaleVertical(27 + 10),
        marginVertical: scaleVertical(5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    TakeawayDeliveryDetail: {
        height: scaleVertical(51),
        justifyContent: 'center',
    },
    deliveryContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    deliveryText: {
        ...F1_12_300_18,
        ...TEXT_CENTER,
        color: NEGRO,
        height: 'auto',
    },
    priceText: {
        ...F1_12_500_18,
        ...TEXT_CENTER,
        color: NEGRO,
        height: 'auto',
    },
    takeAwayBottomContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    infoImage: {
        width: 20,
        height: 20,
        tintColor: GREEN,
    },
    infoText: {
        color: GRAY_DARK,
        fontFamily: 'poppinsRegular',
        paddingStart: 5,
        textAlign: 'center',
        includeFontPadding: false,
        fontSize: 13,
    },
    markerImage: {
        width: 12,
        height: 15,
        tintColor: GREEN,
    },
    markerText: {
        color: GRAY_DARK,
        fontFamily: 'poppinsMedium',
        paddingStart: 5,
        textAlign: 'center',
        textDecorationLine: 'underline',
        includeFontPadding: false,
        width: 'auto',
    },

});