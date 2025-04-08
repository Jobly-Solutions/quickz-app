import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DatosStackParamList } from '@/types';
import { DatosUserScreen } from '@/screens/usuario/datos';
import { EditarUserScreen } from '@/screens/usuario/editar';
import { NotifUserScreen } from '@/screens/usuario/notifi';
import { QuejasUserScreen } from '@/screens/usuario/queja';
import { TerminosUserScreen } from '@/screens/usuario/terminos';
import { PoliticsUserScreen } from '@/screens/usuario/politicas';
import { SoporteGenScreen } from '@/screens/soporte';

const Stack = createStackNavigator<DatosStackParamList>();

const MisDatosStack = () => (
    <Stack.Navigator
        initialRouteName='Datos'
        screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Datos' component={DatosUserScreen} />
        <Stack.Screen name='Editar' component={EditarUserScreen} />
        <Stack.Screen name='Notifica' component={NotifUserScreen} />
        <Stack.Screen name='Queja' component={QuejasUserScreen} />
        <Stack.Screen name='SoporteGeneral' component={SoporteGenScreen} />
        <Stack.Screen name='Terminos' component={TerminosUserScreen} />
        <Stack.Screen name='Politicas' component={PoliticsUserScreen} />
    </Stack.Navigator>
);
export default MisDatosStack;
