import { TopBar } from '@/components/organisms/top-bar';
import { RED } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { Store } from '@/types';

interface ScreenProps {
  title:string;
  children: React.ReactNode;
  help?: boolean;
  style?: any;
}

export const Screen: React.FC<ScreenProps> = ({ title, children, help, style }) => {
  let styles = ScreenStyles;
  if (style) styles = { ...styles, ...style };

  const uid = useSelector((state: Store) => state.auth.user?.uid);
  if (!uid) throw new Error('no hay informacion del usuario');
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [visible, setVisible] = useState(false);

  const _cleanAlert = () => {
    setAlert(false);
    setMessageAlert('');
  };

  return (<>
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
      <View style={styles.background}>
        <TopBar title={title} help={help} style={styles.topBarStyles}/>
        <View style={styles.contenedorPantalla}>
            <View style={styles.aligncenter}>
              {children}
            </View>
        </View>
      </View>
    </KeyboardAvoidingView >
  </>);
}

const ScreenStyles = StyleSheet.create({
  background: {
    ...estilos.backgroundimage,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorPantalla: {
    ...estilos.contenedorPantalla,
  },
  // boton: {
  //   backgroundColor: VERDE_CLARO,
  //   borderRadius: 40,
  //   paddingHorizontal: 70,
  //   paddingVertical: 10,
  //   height: 50,
  //   alignItems: 'center',
  //   marginBottom: 20,
  // },
  titleStyle: {
    color: RED,
    fontFamily: 'poppinsRegular',
  },
  aligncenter: {
    paddingHorizontal: 20,
  },
});