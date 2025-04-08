import { ICONO_SUPPORT } from '@/assets/iconos';
import { setAddressValue } from '@/redux/slices/address-slice';
import { RootState } from '@/redux/store';
import { GRIS_CLARO, NEGRO, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { F1_20_600_24 } from '@/styles/typography';
import { Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

const GREEN = '#5ED69C';

export const DataAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ADDRESS = useSelector((state: RootState) => state.address?.value);
  const uid = useSelector((state: Store) => state.auth.user?.uid);
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [depto, setDepto] = useState('');
  const [entrega, setEntrega] = useState('');
  const [telef, setTelef] = useState('');

  const [sector, setSector] = useState('');
  const [lote, setLote] = useState('');
  const [calle, setCalle] = useState('');
  const [casa, setCasa] = useState('');

  const [visible, setVisible] = useState(false);
  if (!uid) throw new Error('no hay informacion del usuario');

  const _cleanAlert = () => {
    setAlert(false);
    setMessageAlert('');
  };
  const guardarDomiciliox = async (
    user_depto = '',
    user_entrega = '',
    user_telef = ''
  ) => {
    await AsyncStorage.setItem('@useruid', uid);    
    dispatch(setAddressValue({
      ...ADDRESS,
      depto: user_depto, entrega: user_entrega, telef: user_telef
    }));
    cambiarPantalla();
  };

  const cambiarPantalla = () => {
    navigation.navigate('ConfirmDataAddress');
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
          <View style={estilos.contenedorPantalla}
          >
            <ScrollView style={styles.aligncenter}>
              <View style={{ alignItems: 'flex-end', height: 20 }}>
                {/* <TouchableOpacity onPress={() => cambiarPantalla()}>
                  <Text style={styles.registerNow}>{'Omitir'}</Text>
                </TouchableOpacity> */}
              </View>
              <View>

                <Text style={estilos.textTitulo}>
                  {'Datos de tu dirección'}
                </Text>

                <Text style={styles.subTitleText}>
                  {'Datos del domicilio'}
                </Text>

                <Text style={styles.topInputText}>{"Indica sector"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Ingresar sector"}
                    value={sector}
                    onChangeText={setSector}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{"Indica lote"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Ingresar lote"}
                    value={lote}
                    onChangeText={setLote}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{"Indica la calle"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Ingresar calle"}
                    value={calle}
                    onChangeText={setCalle}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{"Indica la casa"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Ingresar country"}
                    value={casa}
                    onChangeText={setCasa}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{"Observaciones/Instrucción de entrega"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Ej: dejar en la entrada"}
                    value={entrega}
                    onChangeText={setEntrega}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{"Telefono de contacto"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    onBlur={() => { }}
                    placeholder={"Ingresar nro de contacto"}
                    value={telef}
                    onChangeText={setTelef}
                    underlineColorAndroid="transparent"
                  />
                </View>

              </View>
            </ScrollView>
          </View>
          <View style={styles.botonView}>
            {/* {telef ? ( */}
            <TouchableOpacity
              style={styles.boton}
              onPress={() => guardarDomiciliox(depto, entrega, telef)}>
              <Text style={styles.textoBoton}>{'Confirmar dirección'}</Text>
            </TouchableOpacity>
            {/* ) : null} */}
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
    fontSize: 16,
    fontFamily: 'poppins',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  botonView: {
    bottom: 0,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: WHITE,
  },
  boton: {
    backgroundColor: VERDE_CLARO,
    borderRadius: 40,
    paddingHorizontal: 70,
    paddingVertical: 10,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBoton: {
    color: WHITE,
    fontSize: 18,
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
  subTitleText: {
    ...F1_20_600_24,
    color: '#5ED69C',
  },
  topInputText: {
    color: NEGRO,
    fontFamily: 'poppins',
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 1,
    marginTop: 15,
  },
  bottomInputText: {
    color: NEGRO,
    fontSize: 12,
    fontFamily: 'poppins',
    fontWeight: '400',
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
    fontFamily: 'poppins',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'auto',
    textAlignVertical: 'bottom',
    alignItems: 'flex-start',
    color: NEGRO,
  },
  aligncenter: {
    paddingHorizontal: 15,
    marginBottom: 30
  },
});