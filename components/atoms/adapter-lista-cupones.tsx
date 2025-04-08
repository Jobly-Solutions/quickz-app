import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image, LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  UIManager,
  View
} from 'react-native';
import { IMAGE_VOUCHER_GREEN } from '@/assets/images';
import { ButtonItems } from '@/components/atoms/boton-items';
import { removeUserCupon } from '@/firebase-js/api';
import { GRAY_10, GRAY_2, NEGRO, WHITE } from '@/styles/colors';
import { TiendasCupon } from '@/types';
import { GRIS_OSCURO } from '@/styles/colors';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCouponList, setCouponSelected, setCouponValue } from '@/redux/slices/coupon-slice';
import { RootState } from '@/redux/store';

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

export default function AdapterCupon(uid: string, cupones: Array<TiendasCupon>) {

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const cupon = useAppSelector((state: RootState) => state.coupon.value);

  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: GRIS_OSCURO, marginHorizontal: 10 }} />;
  };

  const myListEmpty = () => {
    return (
      <View style={{
        // width: '100%', height: '100%',
        // alignItems: 'center',
        // flexDirection: 'column', alignContent: 'center', justifyContent: 'center',
      }}>
        <Image style={{
          width: '100%', height: 292, resizeMode: 'contain',
        }}
          source={IMAGE_VOUCHER_GREEN} />
        <Text style={{
          ...F1_18_500,
          color: GRAY_2,
          textAlign: 'center',
          width: '100%',
        }}>
          {'Aún no tienes cupones disponibles'}
        </Text>
      </View>
    );
  };

  const removeItem = async (uid: string, id: string) => {
    dispatch(setCouponSelected(cupon));
    await removeUserCupon(
      uid,
      id,
      () => {
        // setVisible(false);
        // navigation.navigate('Lista');
        dispatch(setCouponValue({}));
        dispatch(setCouponList([]));
      },
      () => {
        // setVisible(false);
        // setAlert(true);
        // setMessageAlert('Error agregando el cupon, intenta nuevamente mas tarde');
      }
    );

    // TODO Implementar descuento

    let arr = cupones.filter(function (item) {
      return item.coupon_id !== id
    })
    cupones = arr;
    LayoutAnimation.configureNext(layoutAnimConfig);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        horizontal={false}
        data={cupones}
        contentContainerStyle={{
          flex: 1,
          // paddingHorizontal: 10, 
          alignSelf: 'stretch', alignContent: 'flex-start'
        }}
        endFillColor={WHITE}
        keyExtractor={(item) => item.coupon_id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          <View style={{
            flex: 1,
            width: 'auto',
            height: 156,
            // elevation: 6,
            marginTop: 3,
            marginBottom: 10,
            backgroundColor: WHITE,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: GRAY_10,
            // flexDirection: 'column',
          }}>
            <View style={{
              // padding: 12,
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
              <Image style={{
                width: 50, height: 50,
              }}
                source={{ uri: item.coupon_img }} />
              <View style={{
                height: '100%',
                justifyContent: 'center',
                marginStart: 5,
              }} >
                <Text style={{
                  /*                  
                  font-family: Poppins;
                  font-size: 13px;
                  font-weight: 600;
                  line-height: 19.5px;
                  text-align: left;
                  */
                  color: NEGRO,
                  fontFamily: 'poppinsSemiBold',
                  fontSize: 13,
                  includeFontPadding: false,
                  padding: 0,
                  width: 'auto',
                  height: 'auto',
                  textAlign: 'left',
                }}>
                  {'Tenes disponible:'}
                </Text>
                {/* <View style={{ flexDirection: 'row', marginVertical: 5, }}> */}
                {/* <Text style={{
                    color: NEGRO,
                    fontFamily: 'poppinsLight',
                    fontSize: 30,
                    includeFontPadding: false,
                    padding: 0,
                    width: 'auto',
                    height: 'auto',
                    textAlign: 'left',
                  }}>
                    {'$'}
                  </Text> */}
                <Text style={{
                  /*
                  font-family: Poppins;
                  font-size: 45px;
                  font-weight: 500;
                  line-height: 67.5px;
                  text-align: left;
                  */
                  color: NEGRO,
                  fontFamily: 'poppinsLight',
                  fontSize: 30,
                  includeFontPadding: false,
                  padding: 0,
                  width: 'auto',
                  height: 'auto',
                  textAlign: 'left',
                }}>
                  ${item.coupon_amount}
                </Text>
                {/* </View> */}

                <Text style={{
                  color: NEGRO,
                  fontFamily: 'poppinsRegular',
                  letterSpacing: 0,
                  marginVertical: 1,
                  fontSize: 11,
                }}>
                  {item.coupon_description}
                </Text>

              </View>

              <View style={{
                height: '100%',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
                <View style={{
                  flexDirection: 'row',
                  // alignItems:'center',
                }}>
                  <Text style={{
                    color: NEGRO,
                    fontFamily: 'poppinsRegular',
                    letterSpacing: 0,
                    // marginVertical: 1,
                    fontSize: 13,
                  }}>
                    {'Vence el '}
                  </Text>
                  <Text style={{
                    color: NEGRO,
                    fontFamily: 'poppinsSemiBold',
                    letterSpacing: 0,
                    // marginVertical: 1,
                    fontSize: 13,
                  }}>
                    {item.coupon_expires_at}
                  </Text>
                </View>
                {/* <View style={{ 
                //flex: 1, 
                width: '100%', 
                // flexDirection: 'row-reverse' 
                }}> */}
                <ButtonItems
                  title={"Usar cupón"}
                  onPressed={() => removeItem(uid, item.coupon_id)} />
                {/* </View> */}
              </View>

            </View>



          </View>
        }
        ListEmptyComponent={myListEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, display: 'flex', width: '100%',
    minHeight: 600,
    height: '100%', alignContent: 'center', justifyContent: 'center'
  },
});
