import { ICONO_SUPPORT } from '@/assets/iconos';
import { NEGRO, RED, VERDE_CLARO } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { F1_20_600_24, F1_20_700_20, FONT_SIZE_15 } from '@/styles/typography';
import { Store } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';

export const BarrioPrivadoScreen = () => {

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

          <View style={styles.contenedorPantalla}>

              {/* <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => cambiarPantalla()}>
                  <Text style={styles.registerNow}>{'Omitir'}</Text>
                </TouchableOpacity>
              </View> */}

              <View style={styles.titleContainer}>

                <Text style={{
                  fontSize: 25,
                  fontFamily: 'poppinsBold',
                  color: NEGRO
                }}>Datos de tu dirección</Text>

                <Text
                  style={styles.subTitleText}>
                  Datos del barrio privado
                </Text>

              </View>

              <View style={styles.bodyContainer}>
                <View style={styles.selectorContainer}>
                  <Text style={{ fontSize: 16, fontFamily: 'poppinsMedium' }}>Provincia</Text>
                  <Picker
                    style={styles.selector}
                    mode="dropdown"
                    selectedValue={null} // Valor seleccionado (null inicialmente)
                    onValueChange={(itemValue, itemIndex) => { }}
                  >
                    <Picker.Item label="Ingresar provincia" value={null} />
                  </Picker>
                </View>
                <View style={styles.selectorContainer}>
                  <Text style={{ fontSize: 16, fontFamily: 'poppinsMedium' }}>Partido</Text>
                  <Picker
                    style={styles.selector}
                    mode="dropdown"
                    selectedValue={null} // Valor seleccionado (null inicialmente)
                    onValueChange={(itemValue, itemIndex) => { }}
                  >
                    <Picker.Item label="Ingresar partido" value={null} />
                  </Picker>
                </View>
                <View style={styles.selectorContainer}>
                  <Text style={{ fontSize: 16, fontFamily: 'poppinsMedium' }}>Localidad</Text>
                  <Picker
                    style={styles.selector}
                    mode="dropdown"
                    selectedValue={null} // Valor seleccionado (null inicialmente)
                    onValueChange={(itemValue, itemIndex) => { }}
                  >
                    <Picker.Item label="Ingresar localidad" value={null} />
                  </Picker>
                </View>
                <View style={styles.selectorContainer}>
                  <Text style={{ fontSize: 16, fontFamily: 'poppinsMedium' }}>Country</Text>
                  <Picker
                    style={styles.selector}
                    mode="dropdown"
                    selectedValue={null} // Valor seleccionado (null inicialmente)
                    onValueChange={(itemValue, itemIndex) => { }}
                  >
                    <Picker.Item label="Ingresar country" value={null} />
                  </Picker>
                </View>
              </View>

              <TouchableOpacity
                style={styles.buttonTouchableOpacity}
                onPress={() => navigation.navigate('DataAddress')}>
                <Text style={styles.buttonText}>{'Confirmar datos'}</Text>
              </TouchableOpacity>

            </View>
          </View>
        {/* </View> */}
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
  contenedorPantalla: {
    ...estilos.contenedorPantalla,
    paddingHorizontal: 15,
  },
  titleContainer: { 
    marginTop: 40,
    marginBottom: 20 },
  registerNow: {
    fontSize: 15,
    fontFamily: 'poppinsRegular',
    textDecorationLine: 'underline',
  },
  buttonTouchableOpacity: {
    backgroundColor: VERDE_CLARO,
    borderRadius: 40,
    // paddingHorizontal: 90,
    // paddingVertical: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    ...F1_20_700_20,
    color: '#fff',
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
  subTitleText: {
    ...F1_20_600_24,
    color: VERDE_CLARO
  },
  bodyContainer: {
    marginBottom: 20,
  },
  selectorContainer: {
    marginBottom: 20,
  },
  selector: {
    height: 50,
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: FONT_SIZE_15,
    // lineHeight: 16,
    color: '#ADADAD',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
  },
});