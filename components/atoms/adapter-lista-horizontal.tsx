import { ShopInformation } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICONO_ESTRELLA } from '@/assets/iconos';
import { IMAGEN_SUPER } from '@/assets/images';
import { DORADO, GRIS_OSCURO, NEGRO, WHITE } from '@/styles/colors';

// const persons = [
//     {
//         id:"1",
//       imagen: IMAGEN_SUPER, 
//       calle: "Av.Benavidez xxx-xxx",
//       direccion: "Provincia de Buenos Aires",
//       distancia: "12km",
//       estrella: "5.0",
//       modo: "Retiro en tienda",
//     },
//     {
//         id:"2",
//         imagen: IMAGEN_SUPER, 
//         calle: "Av.Benavidez xxx-xxx",
//         direccion: "Provincia de Buenos Aires",
//         distancia: "12km",
//         estrella: "5.0",
//         modo: "Retiro en tienda",
//       },{
//         id:"3",
//         imagen: IMAGEN_SUPER, 
//         calle: "Av.Benavidez xxx-xxx",
//         direccion: "Provincia de Buenos Aires",
//         distancia: "12km",
//         estrella: "5.0",
//         modo: "Retiro en tienda",
//       },{
//         id:"4",
//         imagen: IMAGEN_SUPER, 
//         calle: "Av.Benavidez xxx-xxx",
//         direccion: "Provincia de Buenos Aires",
//         distancia: "12km",
//         estrella: "5.0",
//         modo: "Retiro en tienda",
//       },{
//         id:"5",
//         imagen: IMAGEN_SUPER, 
//         calle: "Av.Benavidez xxx-xxx",
//         direccion: "Provincia de Buenos Aires",
//         distancia: "12km",
//         estrella: "5.0",
//         modo: "Retiro en tienda",
//       },
//   ];

export default function AdapterHorizontal(stores: Array<ShopInformation>) {
  const navigation = useNavigation();
  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10 }} />;
  };
  //PantallaTienda
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const abrir = async (id: string) => {
    await AsyncStorage.setItem('@shopid', id);
    navigation.navigate('PantallaTienda')
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={stores}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          <View style={styles.itemFlatList}>
            <TouchableOpacity
              style={{ flex: 1, paddingVertical: 10, }}
              onPress={() => abrir(item.shop_id)}>
              <View>
                {item.shop_img ?
                  <Image style={{
                    width: 247, 
                    height: 111, 
                    borderRadius: 10, 
                  }}
                    source={item.shop_img} /> :
                  <Image style={{
                    width: '100%', height: 100, borderRadius: 10, marginTop: -10
                  }}
                    source={IMAGEN_SUPER} />}
                <View style={{
                  // flex: 1,
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 'auto',
                }}>
                  <Text style={{
                    color: NEGRO,
                    fontFamily: 'poppinsBold',
                    fontSize: 10,
                    includeFontPadding: false,
                  }}>
                    {item.shop_rated}.0
                  </Text>
                  <Image
                    style={{
                      alignSelf: 'center', tintColor: DORADO, width: 11, height: 11, margin: 2,
                    }}
                    source={ICONO_ESTRELLA} />
                  <Text numberOfLines={1} style={{
                    color: NEGRO,
                    fontFamily: 'poppinsSemiBold',
                    fontSize: 12,
                    flex: 1,
                    includeFontPadding: false,
                    padding: 0,
                    paddingVertical: 0,
                    marginVertical: 0,
                    width: 'auto',
                    height: 'auto',
                    textAlign: 'left',
                  }}>
                    {item.shop_address}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text numberOfLines={1} style={{
                    color: NEGRO,
                    fontFamily: 'poppins',
                    // letterSpacing: 0,
                    fontSize: 10,
                  }}>
                    {item.shop_localidad + " - " + item.shop_provincia}
                  </Text>
                  <Text numberOfLines={1} style={{
                    color: GRIS_OSCURO,
                    fontFamily: 'poppins',
                    fontSize: 10,
                    height: 'auto',
                    // padding: 0,
                    includeFontPadding: false,
                    // width: 'auto',
                  }}>
                    &#x1F55B; 30min
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={(item) => item.shop_id}
        ListEmptyComponent={myListEmpty}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 2,
  },
  itemFlatList: {
    width: 247,
    // height: 'auto',
    // elevation:6,
    marginStart: 15,
    marginBottom: 7,
    backgroundColor: WHITE,
    // borderRadius: 18,
    flexDirection: 'column',
    // borderWidth: 1,
    // borderColor: GRIS_BORDE,
  }
});
