import { ICONO_MAP_MARKER, ICONO_SUPPORT, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import { GRIS_CLARO, NEGRO, RED, WHITE } from '@/styles/colors';
import { Store } from '@/types';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView, { LatLng, Marker as MKR, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

type latlong = { latitude: number; longitude: number };

export const MapaTienda = () => { 
  type Coordinates = {
    loading: boolean;
    location: LatLng;
};

const userLocation = useRef<Coordinates>({
    loading: true,
    location: { longitude: 0, latitude: 0 },
});  
const [screenIsLoading, setScreenLoading] = useState<boolean>(false);
const nav = useNavigation();
const uid = useSelector((state: Store) => state.auth.user?.uid);
const [alert, setAlert] = useState(false);
const [messageAlert, setMessageAlert] = useState('');
const [idTienda, setidTienda] = useState('');
const navigation = useNavigation(); 
const [direccion, setdireccion] = useState(''); 
const [provincia, setprovincia] = useState(''); 
const [localidad, setlocalidad] = useState(''); 
const [visible, setVisible] = useState(false);
const [location, setLocation] = useState<undefined | latlong>();
const [ubicaacion, setubicaacion] = useState<LocationGeocodedAddress>();
let map_view: any;
if (!uid) throw new Error('no hay informacion del usuario');  
 
const _cleanAlert = () => {
  setAlert(false);
  setMessageAlert('');
}; 
const getUserLocation = async (): Promise<LatLng> => {
    let requestPermissions = true;
    while (requestPermissions) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') { 
            requestPermissions = false; 
        } else { 
            ToastAndroid.show('Necesita los permisos para continuar',ToastAndroid.LONG);
        }
    }
    let { coords: { latitude, longitude }, } = await Location.getCurrentPositionAsync(); 
    return { latitude, longitude };
    
};
  
const getLocationData = async (cords:LatLng) => { 
  setprovincia('');
  setlocalidad('');
  setdireccion('');
  let locaation = await Location.reverseGeocodeAsync(cords);  
  setubicaacion(locaation[0]); 
  if(locaation !== null){ 
    var prov = locaation[0].region?.toString();
    var loca = locaation[0].city?.toString();
    var dire = locaation[0].street?.toString();
    var number = locaation[0].name?.toString();
    try{
      setLocation({latitude: cords.latitude,
        longitude: cords.longitude
      });
      setprovincia(prov + '');
      setlocalidad(loca + '');
      setdireccion(dire + ' ' + number);
    }catch{

    }
  }
  
};
useEffect(() => { 
  setVisible(true);
  (async () => { 
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
                        <TouchableOpacity onPress={() =>navigation.navigate('SoporteGeneral')}>
                                   <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} /> 
                                </TouchableOpacity>
                            
                            <Text style={{
                                
        fontSize: 20,
        flex:1,
        textAlign: 'center',
        color:WHITE,
        alignSelf:'flex-end',
        fontFamily: 'poppinsBold',
                            }}> </Text>  
                            <TouchableOpacity  onPress={() =>{navigation.goBack()} }>
                            <Image style={{ height:33,
        width:33,start:3,
        tintColor:WHITE,
        alignContent: 'center',
        alignSelf: 'center',}} source={ICONO_VOLVER} />
                                </TouchableOpacity>            
                            
                        </View>

                <View style={estilos.contenedorPantalla}>
                <Text style={{color: NEGRO, 
        fontFamily:'poppinsMedium', 
        fontSize: 20,    
        marginHorizontal:15,
        marginTop:10,
        marginBottom:10, 
        letterSpacing:0,
        textAlignVertical:'center',
        width:'auto',  
        height:'auto', }}>{'Confirma la dirección de tu tienda'}</Text>
                {userLocation.current.location && (  
                <MapView
                style={{  
                  flex:1,
                  paddingBottom:20,
                    width: '100%',
                    height: '80%',
                }}
                provider = {PROVIDER_GOOGLE }  
                initialRegion={
                  location
                      ? {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta:0.01,
                            longitudeDelta:0.01,
                        }
                      : undefined
              } 
                loadingEnabled 
            > 
                {location && (
                         <MKR coordinate={location}  
                         draggable={true} 
                         onDragEnd={(coord) => getLocationData(coord.nativeEvent.coordinate)} >
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
                </MapView>)}  
                <View style={{backgroundColor:WHITE,
        bottom:0,
        borderTopLeftRadius:16,
        elevation:3,
        borderTopRightRadius:16,
        width:'100%',
        paddingHorizontal:10,
        paddingBottom:20,
        paddingTop:15,
        position:'absolute'}}>
                <Text style={styles.topInputText}>{'Direccion'}</Text>
                <View style={styles.inputSectionDisable}> 
                
                    
                    <View style={{ flex:1, width:'auto',height:'auto',flexDirection:'row',justifyContent:'flex-start',
            alignContent: 'center',
            alignSelf: 'center',}}>
                    <TextInput
                        style={styles.input}
                        onBlur={() =>{} } 
                        placeholder={'placeholder'}
                        value={direccion}
                        onChangeText={setdireccion}
                        underlineColorAndroid='transparent' 
                    />

                    </View>
                  

                </View> 
                <View style={{flexDirection:'row',flex:1,marginTop:10,}}>
                <Button
                                    title={'Confirmar dirección'}
                                    onPressed={() =>  {navigation.navigate('EditarTienda',{
                                      lat:location?.latitude,
                                      long:location?.longitude,
                                      prov:provincia,
                                      loca:localidad,
                                      dire:direccion,
                                    })}}
                                />
                   
                  

                </View> 



                </View>
                </View> 
                    </> 
                </ImageBackground> 
        
</>
);
};
const styles = StyleSheet.create({
  contenedorTexto:{
      flexDirection: 'row',
      alignItems: 'center',},
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
titleStyle: {
    color: RED,
    fontFamily:'poppinsRegular',
},
topInputText: {
        color: NEGRO,
        fontSize: 15,
        marginBottom:1,
        fontFamily:'poppinsMedium',
        marginTop: 8,
    },
    
    inputSectionDisable: {
      marginBottom: 5, 
      borderRadius: 10, 
      fontSize: 20, 
      letterSpacing:0,
      paddingVertical:10,
      paddingRight: 10,
      height: 'auto', 
      width: '100%', 
      flexDirection: 'row', 
      alignItems:'flex-start', 
      backgroundColor:GRIS_CLARO,
  }, 
  input: {
      marginStart:13, 
      height: 'auto',
      alignContent: 'center',
      alignSelf: 'center', 
      width: '100%',
      fontFamily:'poppinsRegular',
      fontSize:15, 
      textAlign:'auto',
      textAlignVertical:'bottom',
      alignItems: 'flex-start',
      color: NEGRO,
  }, 
});
