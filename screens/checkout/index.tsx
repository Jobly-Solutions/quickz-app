import { ICONO_DERECHA, ICONO_MAP_MARKER, ICONO_PUNTO, ICONO_SUPPORT, ICONO_VOLVER } from '@/assets/iconos';
import { Point } from '@/components/atoms/point';
import { agregarPedido, agregarProdPedido, obtenerContentCarro, obtenerDatosTienda, obtenerDatosUser, obtenerDocuCarro } from '@/firebase-js/api';
import { useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import { GRAY_12, GRAY_13, GRAY_3, GRIS_CLARO, GRIS_OSCURO, NEGRO, RED, VERDE_LINDO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { F1_14_400_21, F1_14_600_21, F1_16_500_24 } from '@/styles/typography';
import { Store, TiendasProductoCheck } from '@/types';
import { handleMpCheckout } from '@/utils/paymentUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { LatLng, Marker as MKR, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import Schedule from './schedule';

type latlong = { latitude: number; longitude: number };

const PAYMENT_METHOD = 'Método de pago';
const CASH = 'Efectivo';
const MP = 'MercadoPago';

export const Checkout = ({ route, navigation }) => {
  const { idPedido, total } = route.params;
  type Coordinates = {
    loading: boolean;
    location: LatLng;
  };

  const userLocation = useRef<Coordinates>({
    loading: true,
    location: { longitude: 0, latitude: 0 },
  });
  const isMapReady = (userLocation) => userLocation;
  const [standard, setStandard] = useState(true);
  const nav = useNavigation();
  const uid = useSelector((state: Store) => state.auth.user?.uid);
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [idTienda, setidTienda] = useState('');
  // const navigation = useNavigation();
  const [direccion, setdireccion] = useState('');
  const [provincia, setprovincia] = useState('');
  const [localidad, setlocalidad] = useState('');
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState<undefined | latlong>();
  const [ubicaacion, setubicaacion] = useState<LocationGeocodedAddress>();
  const [subTotal, setSubTotal] = useState(0);
  const [tieneDel, settieneDel] = useState(false);
  const [delivery, setdelivery] = useState(true);
  const [totalDeliv, setsubtotalDeliv] = useState(0);
  const [nota, setNota] = useState('');
  const [userNombre, setuserNombre] = useState('');
  const [userAddres, setuserAddres] = useState('');
  const [shopName, setShopName] = useState('Las Marías Supermercado');
  const [carroCont, setcarroCont] = useState<Array<TiendasProductoCheck> | []>([]);
  const [uiduser, setuiduser] = useState('0');
  const [user, setUser] = useState({});
  // const [idPedido, setIdPedido] = useState();
  const [ishandlecreado, sethandlecreado] = useState(false);
  const [horarioEntrega, setHorarioEntrega] = useState('24 de enero, 15:00hs-17:00hs');
  const [program, setProgram] = useState(false);
  let map_view: any;
  if (!uid) throw new Error('no hay informacion del usuario');

  const couponSelected = useAppSelector((state: RootState) => state.coupon.selected);
  const couponAmount = couponSelected?.coupon_amount || 0;

  const paidMethodSelected = useAppSelector((state) => state.paidMethod.selected)?.title || CASH;

  const deepLink = Linking.useURL();

  const _cleanAlert = () => {
    setAlert(false);
    setMessageAlert('');
  };

  const getLocationData = async (cords: LatLng) => {
    setprovincia('');
    setlocalidad('');
    setdireccion('');
    let locaation = await Location.reverseGeocodeAsync(cords);
    setubicaacion(locaation[0]);
    if (locaation !== null) {
      var prov = locaation[0].region?.toString();
      var loca = locaation[0].city?.toString();
      var dire = locaation[0].street?.toString();
      var number = locaation[0].name?.toString();
      try {
        setLocation({
          latitude: cords.latitude,
          longitude: cords.longitude
        });
        setprovincia(prov + '');
        setlocalidad(loca + '');
        setdireccion(dire + ' ' + number + ', ' + loca);
      } catch {

      }
    }

  };

  function makeid(length: number) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  };

  const activarA = async (uid: string) => {
    obtenerDocuCarro(uid, (doc) => {
      if (!doc) {
        setVisible(false);
        setSubTotal(0);
        setNota('');
        obtenerCarro(uid);
      } else {
        setSubTotal(doc.order_total);
        setNota(doc.order_feedback);
        obtenerCarro(uid);
      }
    });

  };

  const obtenerCarro = async (uid: string) => {
    var totalejemplo = 0;
    const carroContx = await obtenerContentCarro(uid);
    if (carroContx != null) {
      carroContx.forEach((d: TiendasProductoCheck) => {
        var multi = (d.product_price * d.product_cuant);
        var exee = Math.round(d.product_price * d.product_cuant) + totalejemplo;
        totalejemplo = exee;
        setSubTotal(totalejemplo);

        //ToastAndroid.show(multi + 'rest',ToastAndroid.LONG);
      })
      setcarroCont(carroContx);
      setVisible(false);
    } else {
      setVisible(false);
      setAlert(true);
      setMessageAlert('error al cargar las listas');
    }
  };

  const setestadodeli = async (uid: string) => {
    // let id = self.crypto.randomUUID();//makeid(6);
    // setIdPedido(id);
    if (idTienda) {
      obtenerDatosTienda(
        idTienda,
        (doc) => {
          if (doc) {
            const envio = doc.shop_envio;
            const precioEnvio = parseInt(doc.shop_envio_precio);
            settieneDel(envio);
            setsubtotalDeliv(precioEnvio);
            if (!envio) {
              setdelivery(false);
            }
            activarA(uid);
          } else {
            setVisible(false);
            setAlert(true);
            setMessageAlert('Error al obtener los datos de la tienda1');
          }
        });
    }
  };

  const setdatosUser = async (uid: string) => {
    obtenerDatosUser(
      uid,
      (doc) => {
        if (!doc) {
          setVisible(false);
          setAlert(true);
          setMessageAlert('Error al obtener los datos del usuario');
        } else {
          setUser(doc);
          const location = {
            latitude: doc.user_lat,
            longitude: doc.user_long,
          };
          setuserNombre(doc.user_lastname + ' ' + doc.user_firstname);
          getLocationData(location);
          setestadodeli(uid);
        }
      })
  };

  const handlecreado = async () => {
    sethandlecreado(() => !ishandlecreado);
    setVisible(false);
    await AsyncStorage.setItem('@del', "true");
  };

  const handleSchedule = value => {
    setHorarioEntrega(value);
    setProgram(!value);
  }

  const countProducts = (p) => p.reduce((a, b) => a + Number(b.product_cuant), 0);

  const crearPedido = () => {
    var numerito = 1;
    setVisible(true);
    agregarPedido(
      idTienda,
      uiduser,
      idPedido,
      total,
      userNombre,
      userAddres,
      nota,
      // products,
      numerito,
      delivery,
      async () => {
        await handlecreado();
        await crearprodPedido();
      },
      () => {
        setVisible(false);
        setAlert(true);
        setMessageAlert('error al crear el pedido');
      }
    );
  };

  const crearprodPedido = async () => {
    setVisible(false);
    const carroContx = await obtenerContentCarro(uiduser);
    if (carroContx) {
      carroContx.forEach(async (d: TiendasProductoCheck) => {
        await agregarProdPedido(
          idTienda,
          uiduser,
          idPedido,
          d.product_id,
          d.product_sku,
          d.product_name,
          d.product_details,
          parseInt(d.product_unit),
          d.product_unit_value,
          d.product_price,
          false,
          d.product_cuant,
          () => { 
            setVisible(false);
            navigation.navigate('OrderPlaced', {
            id: idPedido,
            shopId: idTienda,
            address: delivery ? direccion : shopName,
            delivery: delivery,
            total: total,
            created: '11:35 a.m.',
            products: countProducts(carroContx),
            deliveryTime: '24 de enero , 15:00hs-17:00hs'
          }
          );
        },
          () => {
            setVisible(false);
            setAlert(true);
            setMessageAlert('error al crear el pedido');
          });
      })
    }
    setVisible(false);
    // setAlert(true);
    // setMessageAlert('error al crear el pedido');
  };

  const programarDia = () => {
    setProgram(true);
  }

  useEffect(() => {
    (async () => {
      try {
        setidTienda(await AsyncStorage.getItem('@shopid'));
        let requestPermissions = true;
        while (requestPermissions) {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            requestPermissions = false;
          } else {
            console.error("Necesita los permisos para continuar")
            ToastAndroid.show('Necesita los permisos para continuar', ToastAndroid.LONG);
          }
        }
        setVisible(true);
        let location = await Location.getCurrentPositionAsync();
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setVisible(false);
        getLocationData(location.coords);
        const values = await AsyncStorage.getItem('@useruid');
        if (values !== null) {
          await setdatosUser(values);
          await setuiduser(values);
        } else {
          setVisible(false);
          setAlert(true);
          setMessageAlert('error al cargar el usuario');
        }

      } catch (err) {
        console.error(err)
      }

    })();
  }, []);

  useEffect(() => {
    if (deepLink) {
      const { hostname, path, queryParams } = Linking.parse(deepLink);
      if (hostname === 'mp-checkout-pro' && path === 'success') {
        crearPedido();
      }
    }
  }, [deepLink]);

  return (
    <>
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title='Error'
        titleStyle={styles.titleStyle}
        message={messageAlert}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        onDismiss={() => _cleanAlert()}
        showConfirmButton={false}
      />
      <Spinner visible={visible} />
      {!program &&
        <View style={{
          with: '100%',
          height: '100%',
          backgroundColor: 'rgba(73, 201, 139, 1)'
        }}>

          <View style={estilos.barra_superiod}>
            <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
              <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
            </TouchableOpacity>
            <Text style={{
              fontFamily: 'poppinsBold',
              fontSize: 23,
              color: WHITE
            }}>Checkout</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={estilos.iconosSuperior} source={ICONO_VOLVER} />
            </TouchableOpacity>
          </View>
          <View style={styles.contenedorPantalla}>
            <ScrollView style={{
              position: 'relative',
            }}>
              <Text style={{ fontFamily: 'poppinsBold', textAlign: 'center', fontSize: 20, color: NEGRO, marginBottom: 10, }}>Mi pedido</Text>
              <View style={{
                width: '100%',
                height: 130,
                // alignSelf: 'center', 
                borderRadius: 15, overflow: 'hidden',
                // marginTop: 20, 
                marginBottom: 20,
              }}>
                {isMapReady(userLocation) && (
                  <MapView
                    style={{
                      flex: 1,
                      paddingBottom: 20,
                      // width: '100%',
                      height: '100%'
                    }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={
                      location
                        ? {
                          latitude: location.latitude,
                          longitude: location.longitude,
                          latitudeDelta: 0.01,
                          longitudeDelta: 0.01,
                        }
                        : undefined
                    }
                    loadingEnabled
                  >
                    {location && (
                      <MKR coordinate={location}
                        draggable={true}
                        onDragEnd={(coord: any) => getLocationData(coord.nativeEvent.coordinate)} >
                        <Image
                          resizeMode='center'
                          source={ICONO_MAP_MARKER}
                          style={{
                            height: 35,
                            width: 35,
                          }}
                        />
                      </MKR>
                    )}
                  </MapView>
                )}
              </View>

              <View style={{}}>
                {/* <Image style={{ width: 25, height: 25 }} source={ICONO_RELOJ} /> */}
                <Text style={{ fontFamily: 'poppinsSemiBold', fontSize: 17 }}>Horario de entrega:</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
                <Text style={{ fontFamily: 'poppinsRegular', fontSize: 16 }}>{horarioEntrega}</Text>
                {!standard && <TouchableOpacity style={{ alignSelf: 'center', }} onPress={() => { programarDia() }}>
                  <Text style={{ color: VERDE_LINDO, fontFamily: 'poppinsMedium', fontSize: 14, }}>Seleccionar</Text>
                </TouchableOpacity>}
              </View>
              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10,
              }}>
                <TouchableOpacity style={{
                  width: '49%',
                  flexDirection: 'row', borderWidth: 1, borderRadius: 15, paddingHorizontal: 12,
                  paddingVertical: 10, height: 70,
                  borderColor: GRAY_3,
                  alignItems: 'center',
                }}
                  onPress={() => {
                    setStandard(true);
                  }}>
                  {standard ?
                    <><Text style={{
                      color: NEGRO,
                      fontFamily: 'poppinsRegular',
                      fontSize: 16,
                      textAlign: 'left',
                      marginHorizontal: 8,
                      padding: 0,
                      includeFontPadding: false,
                    }}>{'Standard'}</Text>
                      <Point active />
                    </>
                    :
                    <><Text style={{
                      color: GRIS_OSCURO,
                      fontFamily: 'poppinsRegular',
                      fontSize: 16,
                      textAlign: 'left',
                      marginHorizontal: 8,
                      padding: 0,
                      includeFontPadding: false,
                    }}>{'Standard'}</Text>
                      <Image style={{
                        height: 20,
                        width: 20,
                        tintColor: GRIS_CLARO, marginLeft: 5
                      }} source={ICONO_PUNTO} /></>}
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: '49%',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 15,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  height: 70,
                  borderColor: GRAY_3,
                  alignItems: 'center',
                }} onPress={() => {
                  setStandard(false);
                }}>
                  {!standard ?
                    <><Text style={{
                      color: NEGRO,
                      fontFamily: 'poppinsRegular',
                      fontSize: 16,
                      textAlign: 'left',
                      marginHorizontal: 8,
                      padding: 0,
                      includeFontPadding: false,
                    }}>{'Programar'}</Text>
                      <Point active />
                    </>
                    :
                    <><Text style={{
                      color: GRIS_OSCURO,
                      fontFamily: 'poppinsRegular',
                      fontSize: 16,
                      textAlign: 'left',
                      marginHorizontal: 8,
                      padding: 0,
                      includeFontPadding: false,
                    }}>{'Programar'}</Text>
                      <Image style={{
                        height: 20,
                        width: 20,
                        tintColor: GRIS_CLARO,
                      }} source={ICONO_PUNTO} />
                    </>}
                </TouchableOpacity>
              </View>

              <View style={{}}>
                <Text style={{ fontFamily: 'poppinsSemiBold', fontSize: 17 }}>Dirección de entrega:</Text>
              </View>

              <View style={{ width: '100%', flexDirection: 'column', alignSelf: 'center', }}>
                <View style={styles.row}>
                  <View style={{ width: '75%', flexDirection: 'row', }}>
                    <Text style={[styles.textRow, {
                      alignItems: 'center',
                      marginTop: 2
                    }]}>{direccion}</Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'center', }} onPress={() => { navigation.navigate('Addresses'); }}>
                    <Text style={{ color: VERDE_LINDO, fontFamily: 'poppinsMedium', fontSize: 14, }}>Modificar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <View style={{ flexDirection: 'column' }} >
                    <Text style={styles.textRow}>{user?.user_phone}</Text>
                    <Text style={{ fontFamily: 'poppinsRegular', fontSize: 10, color: GRIS_OSCURO, }}>Contacto</Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'center', }} onPress={() => { navigation.navigate('Editar'); }}>
                    <Text style={{ color: VERDE_LINDO, fontFamily: 'poppinsMedium', fontSize: 14, }}>Modificar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <View style={{ flexDirection: 'column', }}>
                    <Text style={styles.textRow}>Recibir personalmente</Text>
                    <Text style={{ fontFamily: 'poppinsRegular', fontSize: 10, color: GRIS_OSCURO }}>Agregar detalles de entrega</Text>
                  </View>
                  <TouchableOpacity style={{ alignSelf: 'center', }} onPress={() => { navigation.navigate('Entrega'); }}>
                    <Text style={{ color: VERDE_LINDO, fontFamily: 'poppinsMedium', fontSize: 14, }}>Modificar</Text>
                  </TouchableOpacity>
                </View>


              </View>

              <View style={[styles.separator, { height: 2, marginBottom: 20 }]} />

              <View style={styles.paymentMethodContainer}>
                <Text style={styles.paymentMethodTitle}>{PAYMENT_METHOD}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Pregunta', { tipo: 'delivery' })}>
                  <View style={styles.paymentMethodRow}>
                    <Text style={styles.paymentMethodText}>{'Mercado pago'}</Text>
                    <Image source={ICONO_DERECHA} style={styles.paymentMethodIcon} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.aligncenter}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    backgroundColor: '#5ED69C',
                    height: 50,
                    paddingVertical: 10,
                    // paddingHorizontal: 120,
                    borderRadius: 40,
                  }}
                  onPress={() => { paidMethodSelected === MP ? () => handleMpCheckout(idPedido, total) : crearPedido() }}>
                  <Text style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: WHITE,
                    alignSelf: 'center',
                    fontFamily: 'poppinsBold',
                  }}>Finalizar pedido</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>


        </View>

      }{program &&
        <Schedule onChange={handleSchedule} />
      }

    </>

  );
}
const styles = StyleSheet.create({
  contenedorPantalla: {
    ...estilos.contenedorPantalla,
    paddingHorizontal: 20,
  },
  contenedorTexto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: RED,
    fontFamily: 'poppinsRegular',
  },
  topInputText: {
    color: NEGRO,
    fontSize: 15,
    marginBottom: 1,
    fontFamily: 'poppinsMedium',
    marginTop: 8,
  },

  inputSectionDisable: {
    marginBottom: 5,
    borderRadius: 10,
    fontSize: 20,
    letterSpacing: 0,
    paddingVertical: 10,
    paddingRight: 10,
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: GRIS_CLARO,
  },
  input: {
    marginStart: 13,
    height: 'auto',
    alignContent: 'center',
    alignSelf: 'center',
    width: '100%',
    fontFamily: 'poppinsRegular',
    fontSize: 15,
    textAlign: 'auto',
    textAlignVertical: 'bottom',
    alignItems: 'flex-start',
    color: NEGRO,
  },
  aligncenter: {
    alignItems: 'center',
    marginBottom: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 65, 
    alignItems: 'center'
  },
  textRow: {
    ...F1_14_400_21,
    color: GRAY_12,
  },
  separator: {
    marginLeft: -15,
    width: '110%',
    height: 1,
    backgroundColor: GRAY_13,
    marginVertical: 10,
  },
  paymentMethodContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethodTitle: {
    ...F1_16_500_24,
    color: GRAY_12,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    gap: 5,
  },
  paymentMethodText: {
    ...F1_14_600_21,
    color: GRAY_12,
  },
  paymentMethodIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
});