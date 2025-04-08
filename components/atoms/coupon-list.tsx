import { IMAGE_VOUCHER_GREEN } from '@/assets/images';
import { IMAGE_LM_LOGO } from '@/assets/images/imagenes';
import { setCouponList, setCouponSelected, setCouponValue } from '@/redux/slices/coupon-slice';
import { F1_18_500, F1_45_500_67 } from '@/styles/typography';
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
import { removeUserCupon } from '@/firebase-js/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { RootState } from '@/redux/store';
import { GRAY_10, GRAY_2, GREEN_1, NEGRO, WHITE } from '@/styles/colors';
import { GRIS_OSCURO } from '@/styles/colors';
import { ButtonCustom } from './button-custom';

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

interface CouponListProps {
  uid: string;
}

export const CouponList: React.FC<CouponListProps> = (uid) => {

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const coupons = useAppSelector((state: RootState) => state.coupon.list);
  const coupon = useAppSelector((state: RootState) => state.coupon.value);

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
          {'Aún no tienes coupons disponibles'}
        </Text>
      </View>
    );
  };

  const removeItem = async (uid: string, id: string) => {
    dispatch(setCouponSelected(coupon));
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
        // setMessageAlert('Error agregando el coupon, intenta nuevamente mas tarde');
      }
    );

    // TODO Implementar descuento
    let arr = coupons.filter(function (item) {
      return item.coupon_id !== id
    })
    //coupons = arr;
    dispatch(setCouponList(arr));
    LayoutAnimation.configureNext(layoutAnimConfig);

    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    const imageSource = item?.coupon_img ? { uri: item.coupon_img } : IMAGE_LM_LOGO;

    return (
      <View style={{
        flex: 1,
        // width: 'auto',
        height: 165,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: WHITE,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: GRAY_10,
        padding: 10,
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
            source={imageSource} />
          <View style={{
            marginTop: -10,
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
              ...F1_45_500_67,
              color: GREEN_1,
              includeFontPadding: false,
              padding: 0,
              width: 'auto',
              height: 'auto',
              textAlign: 'left',
              marginVertical:-5,              
            }}>
              ${item.coupon_amount}
            </Text>
            {/* </View> */}

            <Text style={{
              color: NEGRO,
              fontFamily: 'poppinsRegular',
              letterSpacing: 0,
              // marginVertical: 1,
              fontSize: 11,
            }}>
              {item.coupon_description}
            </Text>

          </View>

          <View style={{
            position: 'absolute',
            right: 0,
            // width:'100%',
            height: '100%',
            justifyContent: 'space-between',
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
            {/* <ButtonItems
              title={"Usar cupón"}
              onPressed={() => removeItem(uid, item.coupon_id)} 
              /> */}
            <ButtonCustom
              text={"Usar cupón"}
              onPress={() => removeItem(uid, item.coupon_id)} />
            {/* </View> */}
          </View>

        </View>



      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        horizontal={false}
        data={coupons}
        contentContainerStyle={{
          flex: 1,
          // paddingHorizontal: 10, 
          alignSelf: 'stretch', alignContent: 'flex-start'
        }}
        endFillColor={WHITE}
        keyExtractor={(item) => item.coupon_id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
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
