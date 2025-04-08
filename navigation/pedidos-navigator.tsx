import { CancelarPedidoScreen } from '@/screens/pedidos/cancelar';
import { ListaPedidoScreen } from '@/screens/pedidos/lista';
import { RevisarPedidoScreen } from '@/screens/pedidos/revisar';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PedidosStackParamList } from '@/types';

const Stack = createStackNavigator<PedidosStackParamList>();

const PedidosStack = () => (
        <Stack.Navigator
        initialRouteName='Lista'
        screenOptions={{ headerShown: false }} > 
            <Stack.Screen name='Lista' component={ListaPedidoScreen} /> 
            <Stack.Screen name='Cancelar' component={CancelarPedidoScreen} /> 
            <Stack.Screen name='Revisar' component={RevisarPedidoScreen} />  
        </Stack.Navigator>
);
export default PedidosStack;
