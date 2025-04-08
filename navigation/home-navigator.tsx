import { AddressesScreen } from '@/screens/domicilio/addresses-screen';
import { ConfirmDataAddressScreen } from '@/screens/domicilio/confirm-data-address';
import { DataAddressScreen } from '@/screens/domicilio/data-address';
import { DomicilioScreen } from '@/screens/domicilio/domicilio-screen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { EditarUserScreen } from '@/screens/usuario/editar';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MapaIntro } from '@/screens/mapas-gen/mapa-intro';
import { TipoBarrioScreen } from '@/screens/tipobarrio';
import { BarrioPrivadoScreen } from '@/screens/tipobarrio/bprivado';
import { HomeStackParamList } from '@/types';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {

    return (
        <Stack.Navigator
            // initialRouteName='MapaIntro'
            initialRouteName='Home'//cambiar a MapaIntro en producción
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='MapaIntro' component={MapaIntro} />
            <Stack.Screen name='Domicilio' component={DomicilioScreen} />
            <Stack.Screen name='ConfirmDataAddress' component={ConfirmDataAddressScreen} />
            <Stack.Screen name='DataAddress' component={DataAddressScreen} />
            <Stack.Screen name='TipoBarrio' component={TipoBarrioScreen} />
            <Stack.Screen name='BarrioPrivado' component={BarrioPrivadoScreen} />
            <Stack.Screen name='Addresses' component={AddressesScreen} />
            <Stack.Screen name='Editar' component={EditarUserScreen} />
        </Stack.Navigator>
    );
};
