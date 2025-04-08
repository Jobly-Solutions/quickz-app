import { AgregarCuponScreen } from '@/screens/cupones/agregar';
import { CuponListaScreen } from '@/screens/cupones/lista';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CuponStackParamList } from '@/types';

const Stack = createStackNavigator<CuponStackParamList>();

const CuponStack = () => (
    <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={{ headerShown: false }} > 
        <Stack.Screen name='Lista' component={CuponListaScreen} /> 
        <Stack.Screen name='Agregar' component={AgregarCuponScreen} />  
    </Stack.Navigator>
);
export default CuponStack;
