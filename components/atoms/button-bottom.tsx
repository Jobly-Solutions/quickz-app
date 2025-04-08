import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { F1_20_700_30 } from '@/styles/typography';
import { scaleModerate, scaleVertical, TEXT_CENTER } from '@/styles/mixins';
import { WHITE } from '@/styles/colors';

interface ButtonBottomProps {
    onPress: () => void;
    text: string;
};

/**
 * @name ButtonBottom
 * @description Componente que renderiza un botón en la parte inferior de la pantalla
 * @prop {() => void} onPress - Función que se ejecuta al presionar el botón
 * @prop {string} text - Texto del botón
 * @returns {JSX.Element} - Retorna un botón
 */
export const ButtonBottom: React.FC<ButtonBottomProps> = ({ onPress, text }): JSX.Element => {

    const handleOnPress = () => {
        onPress();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable} onPress={handleOnPress}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
    },
    touchable: {
        backgroundColor: '#5ED69C',
        height: scaleVertical(50),
        width: '100%',
        borderRadius: scaleModerate(25),
    },
    text: {
        ...F1_20_700_30,
        ...TEXT_CENTER,
        color: WHITE,
    }
});
