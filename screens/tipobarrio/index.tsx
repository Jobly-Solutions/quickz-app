import { ICONO_AVANZAR, ICONO_SUPPORT } from '@/assets/iconos';
import { NEGRO, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { Store } from '@/types';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

export const TipoBarrioScreen = () => {
  const nav = useNavigation();

  const uid = useSelector((state: Store) => state.auth.user?.uid);
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  if (!uid) throw new Error('no hay informacion del usuario');

  const _cleanAlert = () => {
    setAlert(false);
    setMessageAlert('');
  };

  const cambiarPantalla = () => {
    navigation.navigate('Home');
  };

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
      <View style={styles.container}>
        <View style={estilos.backgroundimage}>
          <View style={estilos.barra_superiod}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SoporteGeneral')}>
              <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
            </TouchableOpacity>
          </View>
          <View style={estilos.contenedorPantalla}>
            <View style={styles.aligncenter}>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => cambiarPantalla()}>
                  <Text style={styles.registerNow}>{'Omitir'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{
                  fontSize: 25,
                  fontFamily: 'poppinsBold',
                  color: NEGRO
                }}>Datos de tu dirección</Text>
                <Text style={{
                  fontSize: 22,
                  fontFamily: 'poppinsBold',
                  color: VERDE_CLARO
                }}>¿Es un barrio privado?</Text>
              </View>

              <View style={{ marginTop: 20, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 130,
                    borderRadius: 10,
                    backgroundColor: '#48c288',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => navigation.navigate('Domicilio')}>
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <View>
                      <Text style={{
                        fontSize: 20,
                        fontFamily: 'poppinsBold',
                        color: WHITE
                      }}>No es un barrio privado</Text>
                    </View>
                    <View>
                      <Image style={{ width: 30, height: 30, tintColor: WHITE }} source={ICONO_AVANZAR} />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{
                  marginTop: 20,
                  width: '100%',
                  height: 130,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#48c288',
                  backgroundColor: '#F7FFF2',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                  onPress={() => navigation.navigate('BarrioPrivado')}>
                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <View>
                      <Text style={{
                        fontSize: 20,
                        fontFamily: 'poppinsBold',
                        color: NEGRO
                      }}>Es un barrio privado</Text>
                    </View>
                    <View>
                      <Image style={{ width: 30, height: 30, tintColor: VERDE_CLARO }} source={ICONO_AVANZAR} />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.botonView}>
                  <TouchableOpacity
                    style={styles.boton}
                    onPress={() => navigation.navigate('Domicilio')}>
                    <Text style={{
                      color: '#fff',
                      fontSize: 20,
                      fontFamily: 'poppinsBold',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>{'Confirmar datos'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerNow: {
    fontSize: 15,
    fontFamily: 'poppinsRegular',
    textDecorationLine: 'underline',
  },
  botonView: {
    marginTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
  },
  boton: {
    backgroundColor: VERDE_CLARO,
    borderRadius: 40,
    paddingHorizontal: 100,
    paddingVertical: 10,
    height: 50,
    alignItems: 'center',
  },
  textoBoton: {
    color: WHITE,
    fontSize: 20,
    fontFamily: 'poppinsBold',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contenedorTexto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    color: RED,
    fontFamily: 'poppinsRegular',
  },
  aligncenter: {
    paddingHorizontal: 15,
  }
});