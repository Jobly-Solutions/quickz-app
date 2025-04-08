import { ICONO_CHECK } from '@/assets/iconos';
import { TopBar } from '@/components/organisms/top-bar';
import { RED, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { F1_16_600_24, F1_24_700_24 } from '@/styles/typography';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { Store } from '@/types';

interface ScreenCustomProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  help?: boolean;
  style?: any;
}

export const ScreenCustom: React.FC<ScreenCustomProps> = ({ title, subTitle, children, help, style }) => {
  let styles = ScreenCustomStyles;
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
        <View style={{marginBottom: 20}}>
          <TopBar title={''} help={help} />
        </View>
        <View style={styles.header}>
          <View style={styles.titles}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={ICONO_CHECK} style={styles.image} />
          </View>
        </View>

        <View style={styles.contenedorPantalla}>
          <View style={styles.aligncenter}>
            {children}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView >
  </>);
}

const ScreenCustomStyles = StyleSheet.create({
  background: {
    ...estilos.backgroundimage,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorPantalla: {
    ...estilos.contenedorPantalla,
  },
  titleStyle: {
    color: RED,
    fontFamily: 'poppinsRegular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  titles: {
    width: '80%'
  },
  title: {
    ...F1_24_700_24,
    color: WHITE,
  },
  subTitle: {
    ...F1_16_600_24,
    color: WHITE,
  },
  aligncenter: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderColor: WHITE,
    borderWidth: 4,     
    // padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 37,
    height: 32,
    tintColor: WHITE,
    resizeMode: 'contain',
  },
});