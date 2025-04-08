import { ICONO_SUPPORT } from '@/assets/iconos';
import { setAddressValue } from '@/redux/slices/address-slice';
import { RootState } from '@/redux/store';
import { GRIS_CLARO, NEGRO, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { INGRESA_TELEF, TELEF_TEXT } from '@/styles/textos';
import { F1_20_600_24 } from '@/styles/typography';
import { Store } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

export const DomicilioScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ADDRESS = useSelector((state: RootState) => state.address?.value);
  const uid = useSelector((state: Store) => state.auth.user?.uid);
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [depto, setDepto] = useState('');
  const [deptoError, setDeptoError] = useState('');
  const [entrega, setEntrega] = useState('');
  const [entregaError, setEntregaError] = useState('');
  const [telef, setTelef] = useState('');
  const [telefError, setTelefError] = useState('');
  const [add, setAdd] = useState('');

  const [visible, setVisible] = useState(false);
  if (!uid) throw new Error('no hay informacion del usuario');

  const _cleanAlert = () => {
    setAlert(false);
    setMessageAlert('');
  };

  const cambiarPantalla = () => {
    navigation.navigate('ConfirmDataAddress');
  };

  const guardarDomiciliox = async (
    user_depto: string,
    user_entrega: string,
    user_telef: string
  ) => {
    await AsyncStorage.setItem('@useruid', uid);
    dispatch(setAddressValue({
      ...ADDRESS,
      depto: user_depto, entrega: user_entrega, telef: user_telef
    }));
    cambiarPantalla();
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={estilos.backgroundimage}>
          <View style={estilos.barra_superiod}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SoporteGeneral')}>
              <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.contenedorPantalla}>
            <View style={styles.aligncenter}>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => cambiarPantalla()}>
                  <Text style={styles.registerNow}>{'Omitir'}</Text>
                </TouchableOpacity>
              </View>
              <View>

                <Text style={estilos.textTitulo}>
                  {'Datos de tu dirección'}
                </Text>

                <Text style={styles.subTitleText}>
                  {'Datos del barrio'}
                </Text>

                <Text style={styles.topInputText}>{"Dirección"}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Ingresar calle y nro."}
                    value={add}
                    onChangeText={setAdd}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{DEPTO_TEXT}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    placeholder={INGRESA_DEPTO}
                    value={depto}
                    onChangeText={setDepto}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{ENTREGA_TEXT}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    onBlur={() => { }}
                    placeholder={INGRESA_ENTREGA}
                    value={entrega}
                    onChangeText={setEntrega}
                    underlineColorAndroid="transparent"
                  />
                </View>

                <Text style={styles.topInputText}>{TELEF_TEXT}</Text>
                <View style={styles.inputSectionDisable}>
                  <TextInput
                    style={styles.input}
                    onBlur={() => { }}
                    placeholder={INGRESA_TELEF}
                    value={telef}
                    onChangeText={setTelef}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <Text style={styles.bottomInputText}>{"Asegúrate de que esté asociado a la dirección"}</Text>

              </View>
            </View>

            <View style={styles.botonView}>
              <TouchableOpacity
                style={styles.boton}
                onPress={() => {
                  guardarDomiciliox(depto, entrega, telef);
                }}>
                <Text style={styles.textoBoton}>{'Confirmar dirección'}</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>

        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
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
    paddingTop: 18,
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    backgroundColor: '#FFFF',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  registerNow: {
    fontSize: 16,
    fontFamily: 'poppins',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  botonView: {
    marginTop: 20,
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
    color: VERDE_CLARO
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
  },
});