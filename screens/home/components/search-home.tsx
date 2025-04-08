import { ICONO_CUPON } from '@/assets/iconos';
import SearchField from '@/components/molecules/campo-busqueda';
import { WHITE } from '@/styles/colors';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export function SearchHome({ busquedas, setbusquedas, navigation, filtroTexto }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Cupones')}>
                <Image style={styles.icon} source={ICONO_CUPON} />
            </TouchableOpacity>
            <SearchField
                value={busquedas}
                setValue={setbusquedas}
                pressed={() => { filtroTexto(busquedas) }}
                placeholder={'¿Qué quieres ordenar?'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    icon: {
        height: 29,
        width: 62.5,
        tintColor: WHITE,
        marginRight: 5,
        resizeMode: 'contain',
    },
});