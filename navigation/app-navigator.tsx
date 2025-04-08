import { StartingSplashScreen } from '@/screens/start-splash';
import { PantallaTiendaScreen } from '@/screens/tienda/pantalla-tienda-screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SearchScreen } from '@/screens/busqueda/search-screen';
import { OrderPlacedScreen } from '@/screens/checkout/order-placed-screen';
import { DetalleScreen } from '@/screens/pedidos/detalle';
import { OpinionScreen } from '@/screens/pedidos/opinion';
import { SoporteGenScreen } from '@/screens/soporte';
import WebBrowser from '@/screens/webs/screens/web-browser';
import { AppStackParamList } from '@/types';
import { MotivoCancelacion } from '@/screens/cancelacion/motivoCancelacion';
import Entrega from '@/screens/checkout/entrega';
import { Checkout } from '@/screens/checkout/index';
import Schedule from '@/screens/checkout/schedule';
import { PantallaEsperaScreen } from '@/screens/espera';
import { ListaDetalle } from '@/screens/lista/lista-detalle';
import { ProductosScreen } from '@/screens/prod-prev/index';
import { PantallaTiendaCategory } from '@/screens/tienda/category';
import CarroStack from './carro-navigator';
import CuponStack from './cupon-navigator';
import MisDatosStack from './datos-navigator';
import { HomeStack } from './home-navigator';
import PedidosStack from './pedidos-navigator';

const Drawer = createDrawerNavigator<AppStackParamList>();
const Stack = createStackNavigator<AppStackParamList>();
const AppStack = () => (
    <Stack.Navigator
        initialRouteName='Splash'
        screenOptions={{ headerShown: false }} >
        <Stack.Screen
            name='Splash'
            component={StartingSplashScreen}

        />
        <Stack.Screen
            name='ListaOrderDetalle'
            component={ListaDetalle}/>
        <Stack.Screen
            name='Opinion'
            component={OpinionScreen}/>
            <Stack.Screen
            name='Detalle'
            component={DetalleScreen}/>
        <Stack.Screen
            name='MotivoCancelacion'
            component={MotivoCancelacion}/>
        <Stack.Screen
            name='Home'
            component={HomeStack}

        />
        <Stack.Screen
            name='WebBrowser'
            component={WebBrowser}
        />

        <Stack.Screen
            name='Cupones'
            component={CuponStack}
        />
        <Stack.Screen
            name='Pedidos'
            component={PedidosStack}
        />
        <Stack.Screen
            name='MisDatos'
            component={MisDatosStack}
        />
        <Stack.Screen
            name='SoporteGeneral'
            component={SoporteGenScreen}
        />
        <Stack.Screen
            name='MiCarro'
            component={CarroStack}
        />
        <Stack.Screen
            name='VerProducto'
            component={ProductosScreen}
        />
        {/* <Stack.Screen
            name='MenuBuscar'
            component={MenuBuscarScreen}
        />
        <Stack.Screen
            name='MenuBuscando'
            component={MenuBusquedaScreen}
        /> */}
        <Stack.Screen
        name='SearchScreen'
        component={SearchScreen}
        />
        <Stack.Screen
            name='PantallaEspera'
            component={PantallaEsperaScreen}
        />
        <Stack.Screen
            name='PantallaTienda'
            component={PantallaTiendaScreen}
        />
        <Stack.Screen
            name='Checkout'
            component={Checkout}
        />
        <Stack.Screen
            name='OrderPlaced'
            component={OrderPlacedScreen}
        />
        <Stack.Screen
            name='Schedule'
            component={Schedule}
        />
        <Stack.Screen
            name='Entrega'
            component={Entrega}
        />
        <Stack.Screen
            name='Categoria'
            component={PantallaTiendaCategory}
        />
    </Stack.Navigator>
);
export default AppStack;
