import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerDatosTienda, obtenerDocuBanners } from '@/firebase-js/api';
import { TiendasBanner } from '@/types';

export default function useShop() {
    // const [id, setId] = useState('');
    const [shop, setShop] = useState({
        id: "",
        nombre: "",
        nombreError: "",
        direccion: "",
        provincia: "",
        localidad: "",
        imagen: "",
        latitud: 0,
        longitud: 0,
        cuit: "",
        telef: "",
        pagos: false,
        delivery: false,
        pagosPrecio: "",
        deliveryPrecio: "",
    });
    const [banners, setBanners] = useState<Array<TiendasBanner> | []>([]);

    const getShop = async (id: string) => {
        obtenerDatosTienda(id,
            (doc) => {
                if (doc) setShop({
                    ...shop,
                    id: id,
                    nombre: doc.shop_name,
                    cuit: doc.shop_cuit,
                    telef: doc.shop_phone,
                    pagos: doc.shop_pago,
                    pagosPrecio: doc.shop_pago_precio,
                    delivery: doc.shop_envio,
                    deliveryPrecio: doc.shop_envio_precio,
                    direccion: doc.shop_address,
                    provincia: doc.shop_provincia,
                    localidad: doc.shop_localidad,
                    imagen: doc.shop_img,
                    latitud: doc.shop_lat,
                    longitud: doc.shop_long
                });
            });
    }

    const updateBanners = async (id: string) => {
        const newBanners = await obtenerDocuBanners(id);
        if (newBanners) setBanners(newBanners);
    }

    useEffect(() => {
        (async () => {
            const _id = await AsyncStorage.getItem('@shopid');
            if (_id) {
                await getShop(_id);
                await updateBanners(_id);
            }
        })();
    }, []);

    return {
        shop,
        banners
    }
}
