import { ICONO_MAP_CUSTOM, ICONO_SUPPORT } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { guardarUbicacion } from '@/firebase-js/api';
import { setAddressValue } from '@/redux/slices/address-slice';
import { GRIS_CLARO, NEGRO, RED, WHITE } from '@/styles/colors';
import { FONT_FAMILY, FONT_WEIGHT_BOLD } from '@/styles/typography';
import { Store } from '@/types';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { LatLng, Marker as MKR, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

type latlong = { latitude: number; longitude: number };

export const MapaIntro = () => {
  type Coordinates = {
    loading: boolean;
    location: LatLng;
  };

  const userLocation = useRef<Coordinates>({
    loading: true,
    location: { longitude: 0, latitude: 0 },
  });
  const [screenIsLoading, setScreenLoading] = useState<boolean>(false);
  const uid = useSelector((state: Store) => state.auth.user?.uid);
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [idTienda, setidTienda] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [direccion, setdireccion] = useState('');
  const [provincia, setprovincia] = useState('');
  const [localidad, setlocalidad] = useState('');
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState<undefined | latlong>();
  const [ubicaacion, setubicaacion] = useState<LocationGeocodedAddress>();
  let map_view: any;

  const _cleanAlert = () => {
    setAlert(false);
    setMessageAlert('');
  };
  const guardarUbicacionx = async (lat: number, long: number, dir: string) => {
    dispatch(setAddressValue({
      map: {
        lat: lat,
        long: long,
        dir: dir,
      }
    }));
    guardarUbicacion(
      uid,
      lat,
      long,
      dir,
      () => { navigation.navigate('TipoBarrio') },
    );
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
        setdireccion(dire + ' ' + number);
      } catch {

      }
    }

  };
  useEffect(() => {
    (async () => {
      let requestPermissions = true;
      while (requestPermissions) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          requestPermissions = false;
        } else {
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
    })();
  }, []);
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
      <ImageBackground
        source={IMAGE_BACKGROUND}
        resizeMode='stretch'
        style={estilos.backgroundimage}>
        <>
          <View style={estilos.barra_superiod}>
            <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
              <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
            </TouchableOpacity>

            <Text style={{

              fontSize: 20,
              flex: 1,
              textAlign: 'center',
              color: WHITE,
              alignSelf: 'flex-end',
              fontFamily: 'poppinsBold',
            }}> </Text>


          </View>

          <View style={estilos.contenedorPantalla}>

            {userLocation.current.location && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
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
                      onDragEnd={(coord) => getLocationData(coord.nativeEvent.coordinate)}
                      anchor={{ x: 0.5, y: 1 }}
                    >
                      <Image
                        resizeMode='contain'
                        source={ICONO_MAP_CUSTOM}
                        style={{
                          height: 86,
                          width: 86,
                        }}
                      />
                    </MKR>
                  )}
                </MapView>
              </View>)}

            <View style={{
              backgroundColor: WHITE,
              bottom: 0,
              borderTopLeftRadius: 16,
              elevation: 3,
              borderTopRightRadius: 16,
              width: '100%',
              paddingHorizontal: 10,
              paddingBottom: 20,
              paddingTop: 15,
              position: 'absolute'
            }}>
              <Text style={styles.titleText}>{'¿Nos confirmas tu dirección?'}</Text>
              {/* <Text style={styles.topInputText}>{'Direccion'}</Text> */}
              <View style={styles.inputSectionDisable}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    onBlur={() => { }}
                    placeholder={'placeholder'}
                    value={direccion}
                    onChangeText={setdireccion}
                    underlineColorAndroid='transparent'
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                {location && (
                  // <Button
                  // style={{color: '#5ED69C'}}
                  // title={'Confirmar dirección'}
                  // onPressed={() =>  {guardarUbicacionx(location?.latitude,location?.longitude)}}
                  // />
                  <TouchableOpacity style={{
                    backgroundColor: '#5ED69C',
                    borderRadius: 40,
                    width: '100%',
                    paddingVertical: 10,
                    height: 50,
                    alignItems: 'center'
                  }}
                    onPress={() => { guardarUbicacionx(location?.latitude, location?.longitude, direccion) }}>
                    <Text style={styles.buttonText}>{'Confirmar dirección'}</Text>
                  </TouchableOpacity>
                )}




              </View>



            </View>
          </View>
        </>
      </ImageBackground>

    </>
  );
};
const styles = StyleSheet.create({
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
  textInput: {
    // marginStart: 13,
    // height: 'auto',
    // alignContent: 'center',
    // alignSelf: 'center',
    width: '100%',
    fontFamily: FONT_FAMILY,
    fontWeight: '500',
    fontSize: 16,
    // textAlign: 'auto',
    // textAlignVertical: 'bottom',
    // alignItems: 'flex-start',
    color: NEGRO
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 40, // Aquí se aplica el borde redondeado
    overflow: 'hidden', // Esto es necesario para que el borde redondeado se aplique al MapView
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  titleText: {
    color: NEGRO,
    fontFamily: 'poppinsMedium',
    fontSize: 20,
    // marginHorizontal: 15,
    // marginTop: 10,
    marginBottom: 10,
    // letterSpacing: 0,
    // textAlignVertical: 'center',
    // width: 'auto',
    // height: 'auto',
  },
  inputSectionDisable: {
    borderRadius: 40,
    fontSize: 20,
    letterSpacing: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: GRIS_CLARO,
    marginBottom: 10
  },
  textInputContainer: {
    flex: 1,
    width: 'auto',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: {
    color: WHITE,
    fontSize: 20,
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT_BOLD,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});
