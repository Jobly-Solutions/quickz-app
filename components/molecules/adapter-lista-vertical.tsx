
import { TiendasProducto } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GRIS_BORDE, GRIS_OSCURO, NEGRO } from '@/styles/colors';
import ProductStockButton from './product-stock-button';


export default function AdapterVertical(
  shopId: string,
  products: Array<TiendasProducto>,
  alcarro: (product: TiendasProducto, quantity: number, shopId: string) => void
) {
  const navigation = useNavigation();
  const myItemSeparator = () => {
    return <View style={{
      height: 1, backgroundColor: "grey",
      marginHorizontal: 10
    }} />;
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  const abrir = async (idprod: string) => {
    await AsyncStorage.setItem('@prodid', idprod);
    navigation.navigate('VerProducto')
  };

  const updateProductStock = (product: TiendasProducto, quantity: number) => {
    alcarro(product, quantity, shopId);
  }

  return (
    <SafeAreaView style={styles.container}>
      {!!products &&
        <FlatList
          horizontal={true}
          data={products}
          contentContainerStyle={{ alignContent: 'flex-start', paddingHorizontal: 5, }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item?.product_id}
          ListEmptyComponent={myListEmpty}
          renderItem={({ item }) => <View style={styles.itemFlatList}>
            {!!item?.product_id && <>
              <TouchableOpacity
                style={{ 
                  flex: 1, 
                  // height: 200,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // paddingVertical: 5, 
                }}
                onPress={() => abrir(item.product_id)}>
                {/* <View
                style={{
                  height: 200,
                }}
                > */}
                  <View style={{
                    width: 132,
                    height: 122,
                    // backgroundColor: WHITE,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: GRIS_BORDE,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image
                      style={{
                        width: 86,
                        height: 100,
                        resizeMode: 'cover'
                      }}
                      source={{ uri: item.product_sku }} />
                  </View>
                  {/* <View style={{
                    paddingHorizontal: 10,
                    width: 150,
                    height: 21,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 0
                  }}> */}
                    <Text style={{
                      color: NEGRO,
                      fontFamily: 'poppinsSemiBold',
                      fontSize: 14,
                      // padding: 0,
                      textAlign: 'center',
                      // marginBottom: 1
                    }}>
                      {item.product_name}
                    </Text>
                    <Text style={{
                      color: GRIS_OSCURO,
                      fontFamily: 'poppinsRegular',
                      fontSize: 11,
                      textAlign: 'center'
                    }}>
                      {item.product_unit}
                    </Text>
                    <Text style={{
                      color: NEGRO,
                      fontFamily: 'poppinsSemiBold',
                      fontSize: 18,
                      textAlign: 'center'
                    }}>
                      $ {item.product_price}
                    </Text>
                  {/* </View> */}
                {/* </View> */}
              </TouchableOpacity>
              <ProductStockButton
                product={item}
                updateProductStock={updateProductStock}
              />
            </>}
          </View>
          }
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 3,
  },
  itemFlatList: {
    flex: 1,
    // width: 170,
    // height: 'auto',
    // elevation: 6,
    marginHorizontal: 10,
    // paddingTop: 15,
    // marginBottom: 9,
    // marginTop: 50,
    // backgroundColor: WHITE,
    // borderRadius: 18,
    // borderWidth: 1,
    // borderColor: GRIS_BORDE,
    // flexDirection: 'column',
    // position: 'relative'
  },
  item: {}
});
