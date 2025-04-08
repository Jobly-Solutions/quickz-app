import { ICONO_CARRO, ICONO_COMPRAR, ICONO_HOME, ICONO_PUNTO, ICONO_SEARCH, ICONO_USER } from '@/assets/iconos';
import { WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { estilos } from '@/styles/tema_general';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { UI_BOTTOM_NAVBAR } from '@/assets/ui';

interface BottomBarProps {
    style?: any;
}

const SHADOW = 'rgba(0, 0, 0, 0.1)';

export const BottomBar: React.FC<BottomBarProps> = ({ style }) => {
    let styles = BottomBarStyles;
    if (style) styles = { ...styles, ...style };

    const navigation = useNavigation();

    return (<View style={styles.container}>
        <ImageBackground
            style={styles.imageBackground}
            source={UI_BOTTOM_NAVBAR}>
            <View style={styles.buttons}>
                <View style={styles.twoButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}>
                        <Image style={[styles.imageIcon, styles.imageSelectedIcon]} source={ICONO_HOME} />
                        <Image style={styles.imageDot} source={ICONO_PUNTO} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Pedidos')}>
                        <Image style={styles.imageIcon} source={ICONO_COMPRAR} />
                    </TouchableOpacity>
                </View>
                <View style={styles.middle}></View>
                <View style={styles.twoButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('MiCarro')}>
                        <Image style={styles.imageIcon} source={ICONO_CARRO} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('MisDatos')}>
                        <Image style={[styles.imageIcon, styles.imageUser]} source={ICONO_USER} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
        <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => navigation.navigate('SearchScreen')}>
            <Image style={styles.imageSearch} source={ICONO_SEARCH} />
        </TouchableOpacity>
    </View>);
}

const BottomBarStyles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        bottom: 0,
    },
    buttonsContainer: {
        ...estilos.barra_inferior,
    },
    imageBackground: {        
        justifyContent: 'center',
        alignItems: 'center',
        height: scaleVertical(70),
        width: '100%',
        // zIndex: 0,
    },
    buttons: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
    twoButtons: {
        flexDirection: 'row',
        width: '39%',
        padding: scaleModerate(10),
        alignItems: 'flex-start',
    },
    imageIcon: {
        height: scaleVertical(33),
        width: scaleHorizontal(33),
        resizeMode: 'contain',
        tintColor: '#E1E1E1',
        alignContent: 'center',
        alignSelf: 'center',
    },
    imageSelectedIcon: {
        tintColor: '#48C288',
    },
    imageDot: {
        height: scaleVertical(8),
        width: scaleHorizontal(8),
        resizeMode: 'contain',
        marginTop: scaleVertical(5),
        marginBottom: 0,
        tintColor: '#48C288',
        alignContent: 'center',
        alignSelf: 'center',
    },
    imageUser: {
        height: scaleVertical(35),
        width: scaleHorizontal(35),
    },
    middle: {
        alignSelf: 'flex-end',
        height: '89%',
        width: '22%',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonSearch: {
        flex: 1,
        position: 'absolute',
        left: scaleHorizontal(170),
        bottom: scaleVertical(30),
        width: scaleHorizontal(80),
        height: scaleVertical(80),
        borderRadius: scaleModerate(40),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "#48C288",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 2.5,
        shadowRadius: 4,
        elevation: 4,
    },
    imageSearch: {
        height: scaleVertical(34),
        alignSelf: 'center',
        resizeMode: 'contain',
        width: scaleHorizontal(33),
        tintColor: WHITE,
    },
});