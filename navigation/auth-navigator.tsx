import { PantallaRegistro } from '@/screens/registro';
import { SoporteGenScreen } from '@/screens/soporte';
import { StartScreen } from '@/screens/start';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthStackParamList } from '@/types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => (
    <Stack.Navigator
        initialRouteName='Start'
        screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Start' component={StartScreen} />
        <Stack.Screen name='Register' component={PantallaRegistro} />
        <Stack.Screen name='SoporteGeneral' component={SoporteGenScreen} />
    </Stack.Navigator>
);
export default AuthStack;
