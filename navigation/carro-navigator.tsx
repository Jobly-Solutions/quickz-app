import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CarroStackParamList } from '@/types';
import { CarroListaScreen } from '@/screens/carro/lista/CarroListaScreen';
import { PreguntaPagoScreen } from '@/screens/carro/pregunta/pregunta-pago-screen';
import { MedioPago } from '@/screens/carro/pregunta/medio-pago';

const Stack = createStackNavigator<CarroStackParamList>();

const CarroStack = () => (
    <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={{ headerShown: false }} > 
        <Stack.Screen name='Lista' component={CarroListaScreen} />  
        <Stack.Screen name='Pregunta' component={PreguntaPagoScreen} /> 
        <Stack.Screen name='MedioDePago' component={MedioPago} /> 
    </Stack.Navigator>
);
export default CarroStack;
