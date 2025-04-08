import functions from '@react-native-firebase/functions';
import * as WebBrowser from 'expo-web-browser';

export const handleMpCheckout = (idPedido: string, total: number) => {
    const items = [
        {
            title: `pedido nro. ${idPedido}`,
            quantity: 1,
            unit_price: total
        }
    ];

    const createPreference = functions().httpsCallable('createPreference');

    createPreference({ items })
        .then((result) => {
            const { data } = result;
            if (!data) {
                console.error("Ha ocurrido un error");
                return;
            }
            const { init_point } = data;
            WebBrowser.openBrowserAsync(init_point);
        })/*  */
        .catch((err) => console.error('Error en la compra:', err));
};
