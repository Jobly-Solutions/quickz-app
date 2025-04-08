import AdapterLista from '@/components/atoms/adapter-lista-horizontal';
import { NEGRO } from '@/styles/colors';
import { ShopInformation } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

interface ShopsHomeProps {
    tiendas: Array<ShopInformation>;
}

export const ShopsHome: React.FC<ShopsHomeProps> = ({ tiendas }) => {
    return (
        <>
            <Text style={{
                color: NEGRO,
                fontFamily: 'poppinsSemiBold',
                fontSize: 16,
                height: 'auto',
                marginHorizontal: 15,
                padding: 0,
                marginBottom: 0,
                includeFontPadding: false,
                width: 'auto',
            }}>
                {'Tiendas'}
            </Text>
            <View style={{
                flex: 1,
                height: '100%',
                width: '100%',
            }}>
                {AdapterLista(tiendas)}
            </View>
        </>
    );
};
