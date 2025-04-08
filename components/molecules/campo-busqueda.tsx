import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ICONO_LUPA } from '@/assets/iconos';
import { BLACK, NEGRO, WHITE } from '@/styles/colors';
import { SearchFieldParamList } from '@/types';

export default function SearchField({
    value,
    setValue,
    placeholder,
    pressed
}: SearchFieldParamList) {
    const [focus, setFocus] = useState(false);
    const navigation = useNavigation();

    const handle = () => {
        // () => setFocus(true)
        navigation.navigate('SearchScreen');
    }

    return (
        <View
            style={styles.container}>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                    setValue(''), pressed()
                }}>
                <Image style={styles.icon} source={ICONO_LUPA} />
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                onBlur={() => setFocus(false)}
                onFocus={handle}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                underlineColorAndroid='transparent'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderRadius: 100,
    },
    iconContainer: {
        height: 45,
        width: 45,
        justifyContent: 'center',
    },
    icon: {
        height: 25,
        alignSelf: 'center',
        width: 25,
        tintColor: BLACK,
    },
    textInput: {
        width: '70%',
        fontFamily: 'poppinsRegular',
        fontSize: 14,
        color: NEGRO,
    },
});
