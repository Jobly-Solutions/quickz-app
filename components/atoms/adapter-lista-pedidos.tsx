import { scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { F1_12_400_14, F1_12_400_18, F1_14_500_16, F1_15_400_22, F1_20_600_24 } from '@/styles/typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, Image, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ICONO_CHECK, ICONO_SALIR } from '@/assets/iconos';
import { IMAGEN_CONSULTA } from '@/assets/images';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setAlertValue } from '@/redux/slices/alert-slice';
import { GRIS_OSCURO, NEGRO, VERDE_CLARO, WHITE } from '@/styles/colors';
import { isEmptyObject } from '@/utils/object-utils';
import { Modal } from '../molecules/modal';
import { ModalIcono } from '../molecules/modal-icono';

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AdapterPedidos(props: any) {//(pedidos: Array<TiendasMulti>) {
  const { pedidos, finalized, bLeftPress, bRightPress } = props;
  const [alert, setAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [titleAlert, setTitleAlert] = useState('');
  const [cancel, setCancel] = useState(false);
  const [visible, setVisible] = useState(false);
  const [consulta, setConsulta] = useState(false);
  // const [handleOpinion, sethandleOpinion] = useState(false);
  // const handleAlerta = () => sethandleOpinion(() => !handleOpinion);

  const dispatch = useAppDispatch();

  const opinion = useAppSelector((state) => state.alert.value);
  const shops = useAppSelector((state) => state.shop.list);

  const setOpinion = (value) => dispatch(setAlertValue(value));

  const title = finalized ? 'Pedido realizado' : 'Pedido en proceso';
  const bLeftTitle = finalized ? 'Opinar' : 'Ver detalle';
  const bRightTitle = finalized ? 'Repetir' : 'Cancelar';

  const navigation = useNavigation();
  const _cleanAlert = () => {
    setAlert(false);
    setTitleAlert('');
    setMessageAlert('');
  };

  const cancelar = async (id: any) => {
    try {
      await AsyncStorage.setItem('@orderid', id);
    } catch (e) {
    }
  }

  const handleCancel = () => { setCancel(() => !cancel); setVisible(false) };
  const handleConsulta = () => { setConsulta(() => !consulta); setVisible(false) };
  const handleDetail = (item) => {
    navigation.navigate('Detalle', { order: item });
  };
  const handleCode = (order_code) => {
    setAlert(true);
    setTitleAlert("CODIGO");
    setMessageAlert(order_code); const shops = useAppSelector((state) => state.shop.list);
  };
  const handleItemCancel = (order_id) => {
    cancelar(order_id);
    handleCancel();
    // bRightPress(order_id);
  };

  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey", marginHorizontal: 60 }} />;
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{
          color: GRIS_OSCURO,
          fontFamily: 'poppinsLight',
          fontSize: 20,
          marginHorizontal: 4,
          letterSpacing: 0,
          marginVertical: 10,
          textAlignVertical: 'center',
          width: 'auto',
          height: 'auto', fontWeight: '200'
        }}>No Realizaste ningun pedido</Text>
      </View>
    );
  };
  const myItem = () => {
    return (
      <View style={{ alignItems: "center" }}>

      </View>
    );
  };

  const renderItem = ({ item }) => {
    const unAssigned = true//item.order_status.match('unasigned');
    const leftTitle = unAssigned ? bLeftTitle : 'Ver codigo';
    const handleButtonLeft = () => {
      // unAssigned ? bLeftPress(item)
      //   : handleCode(item.order_code);
      bLeftPress(item);
    };
    const handleButtonRight = () => finalized ? bRightPress() : handleItemCancel(item.order_id);

    const getStore = (shopId) => {
      const shop = shops.filter((shop) => shop.shop_id === shopId);
      return shop[0]?.shop_name;
    };

    return (<>

      <View style={styles.item}>
        <View style={styles.itemTopContainer}>
          <View>
            <Text style={styles.itemTitle}>
              {title}
            </Text>
            <Text style={styles.itemSubtitle}>
              {getStore(item.order_store)}
            </Text>
            <Text style={styles.itemText}>
              {'Realizado: ' + item.order_created_at}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={handleConsulta}>
              <Image style={styles.itemSupportImage} source={IMAGEN_CONSULTA} />
            </TouchableOpacity>
            {finalized && <TouchableOpacity
              onPress={handleDetail}>
              <Text style={styles.detailText}>
                {'Ver detalle'}
              </Text>
            </TouchableOpacity>}
          </View>
        </View>
        <View style={styles.itemButtons}>
          <TouchableOpacity style={styles.itemButton}
            onPress={handleButtonLeft}>
            <Text style={styles.itemButtonText}>
              {leftTitle}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemButton}
            onPress={handleButtonRight}>
            <Text style={styles.itemButtonText}>
              {bRightTitle}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </>)
  }

  const AlertModal = ({ alert, setAlert }) => {
    const handleClose = () => setAlert({});
    return (
      <ModalIcono isVisible={isEmptyObject(alert)}>
        <ModalIcono.Container>
          <ModalIcono.Header cosas={
            <Image
              style={{
                height: 15,
                resizeMode: 'contain',

                width: 15
              }}
              source={ICONO_CHECK}
            />
          } />
          <ModalIcono.Body>
            <Text style={{
              fontSize: 13, width: '100%', height: 'auto',
              color: '#07AA00',
              fontWeight: 'bold'
            }}>
              {alert.title}
            </Text>

            <Text style={{
              fontSize: 12, width: '100%', height: 'auto',
              color: NEGRO,
            }}>
              {alert.subTitle}
            </Text>

          </ModalIcono.Body>
          <ModalIcono.Footer>
            <TouchableOpacity style={{
              width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'center'
            }}
              onPress={handleClose}>
              <Image style={{
                height: 35,
                width: 35,
                tintColor: NEGRO,
                alignContent: 'center',
                alignSelf: 'center',
              }} source={ICONO_SALIR} />
            </TouchableOpacity>

          </ModalIcono.Footer>
        </ModalIcono.Container>
      </ModalIcono>
    )
  };

  // useEffect(() => {
  //   const opinionEnviada = async () => {
  //     const opinion = await AsyncStorage.getItem('@opinion');
  //     if (opinion === 'true') {
  //       sethandleOpinion(true);
  //       await AsyncStorage.removeItem('@opinion');
  //     }
  //   }
  //   opinionEnviada();
  // }, []);

  return (<>
    <AwesomeAlert
      show={alert}
      showProgress={false}
      title={titleAlert}
      titleStyle={styles.titleStyle}
      message={messageAlert}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={false}
      onDismiss={() => _cleanAlert()}
      showConfirmButton={false}
    />

    <SafeAreaView style={styles.container}>

      <FlatList
        horizontal={false}
        data={pedidos}
        // contentContainerStyle={{ alignContent: 'flex-start', }}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        ListEmptyComponent={myListEmpty}
      />
      <Modal isVisible={cancel}>
        <Modal.Container>
          <Modal.HeaderCarrito title="Advertencia" onPress={() => handleCancel()} />
          <Modal.Body>
            <Text style={{
              fontSize: 17,
              textAlign: 'center',
              width: '100%',
              color: NEGRO,
              height: 'auto',
              fontFamily: 'poppinsRegular',
              alignSelf: 'flex-start',
              alignContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              justifyContent: 'center',
              includeFontPadding: false,
              textAlignVertical: 'bottom',
            }}>
              ¿Estás seguro que quieres cancelar tu pedido?
            </Text>

          </Modal.Body>
          <Modal.Footer>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

              <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                <TouchableOpacity style={{
                  height: 40,
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: WHITE,
                  borderWidth: 1,
                  borderColor: '#5ED69C'
                }} onPress={() => { navigation.navigate('MotivoCancelacion') }}>
                  <Text style={{
                    fontFamily: 'poppinsSemiBold',
                    fontSize: 15,
                    textAlign: 'center',
                    color: '#5ED69C'
                  }}>
                    Aceptar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  height: 40,
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: '#5ED69C',
                }} onPress={() => handleCancel()}>
                  <Text style={{
                    fontFamily: 'poppinsSemiBold',
                    fontSize: 15,
                    textAlign: 'center',
                    color: WHITE
                  }}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <Modal isVisible={consulta}>
        <Modal.Container>
          <Modal.HeaderCarrito title="Consulta" onPress={() => handleConsulta()} />
          <Modal.Body>
            <Text style={{
              fontSize: 15,
              textAlign: 'center',
              width: '100%',
              color: NEGRO,
              height: 'auto',
              fontFamily: 'poppinsMedium',
              alignSelf: 'flex-start',
              alignContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              justifyContent: 'center',
              includeFontPadding: false,
              textAlignVertical: 'bottom',
            }}>
              ¿Necesitas hablar con un representante de la tienda?
            </Text>

          </Modal.Body>
          <Modal.Footer>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

              <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                <TouchableOpacity style={{
                  height: 35,
                  paddingHorizontal: 23,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor: WHITE,
                  borderWidth: 1,
                  borderColor: '#5ED69C'
                }} onPress={() => { }}>
                  <Text style={{
                    fontFamily: 'poppinsSemiBold',
                    fontSize: 14,
                    textAlign: 'center',
                    color: '#5ED69C'
                  }}>
                    Aceptar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  height: 35,
                  paddingHorizontal: 20,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor: '#5ED69C',
                }} onPress={() => handleConsulta()}>
                  <Text style={{
                    fontFamily: 'poppinsSemiBold',
                    fontSize: 14,
                    textAlign: 'center',
                    color: WHITE
                  }}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal.Footer>
        </Modal.Container>
      </Modal>
      <AlertModal alert={opinion} setAlert={setOpinion} />
    </SafeAreaView>
  </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: scaleVertical(100),
  },
  item: {
    backgroundColor: WHITE,
    margin: scaleModerate(11),
    height: scaleVertical(165),
    borderRadius: scaleModerate(15),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    paddingTop: scaleVertical(12),
    paddingBottom: scaleVertical(12),
    paddingLeft: scaleHorizontal(24),
    paddingRight: scaleVertical(12),
  },
  itemTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    ...F1_20_600_24,
    height: scaleVertical(46),
    textAlignVertical: 'center',
  },
  itemSubtitle: {
    ...F1_15_400_22,
  },
  itemText: {
    ...F1_12_400_18,
  },
  itemButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scaleHorizontal(19),
    alignItems: 'flex-end',
  },
  itemButton: {
    width: scaleHorizontal(133),
    height: scaleVertical(32),
    borderRadius: scaleModerate(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VERDE_CLARO,
  },
  itemButtonText: {
    ...F1_14_500_16,
    color: 'white',
  },
  rightContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: scaleHorizontal(10),
    paddingRight: scaleHorizontal(10),
  },
  itemSupportImage: {
    width: scaleHorizontal(46),
    height: scaleVertical(46),
    resizeMode: 'contain',
  },
  detailText: {
    ...F1_12_400_14,
  },
});
