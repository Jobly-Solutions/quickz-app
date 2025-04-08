import { GRIS_CLARO, GRIS_OSCURO, NEGRO, WHITE } from '@/styles/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function AdapterProductosDetalle(products: Array<TiendasProductoCheck>) {
export function AdapterProductosDetalle({ products }) {
  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: GRIS_CLARO, marginHorizontal: 10 }} />;
  };
  const navigation = useNavigation();
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center", marginVertical: 15, }}>
        <Text style={{
          color: NEGRO,
          fontFamily: 'poppinsMedium',
          fontSize: 18,
          includeFontPadding: false,
          padding: 0,
          width: 'auto',
          height: 'auto',
          textAlign: 'left',
        }}>Cargando lista...</Text>

      </View>
    );
  };

  const Price = ({ value }) => {
    return (value &&
      <View style={{
        alignSelf: 'flex-end',
        flexDirection: 'row',
      }}>
        <Text style={{
          color: NEGRO,
          fontFamily: 'poppinsMedium',
          fontSize: 16,
          includeFontPadding: false,
          padding: 0,
          width: 'auto',
          height: 'auto',
          textAlign: 'center',
        }}>
          {'ARS'}
        </Text>
        <Text style={{
          color: NEGRO,
          fontFamily: 'poppinsMedium',
          fontSize: 16,
          includeFontPadding: false,
          padding: 0,
          width: 'auto',
          height: 'auto',
          textAlign: 'center',
        }}>
          {value}
        </Text>
      </View>)
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        horizontal={false}
        data={products}
        contentContainerStyle={{ paddingHorizontal: 5, }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          <View style={{
            flex: 1,
            width: '100%',
            height: 'auto',
            backgroundColor: WHITE,
            flexDirection: 'column',
          }}>
            <TouchableOpacity
              style={{ flex: 1, }}
              onPress={() => { false }}>
              <View style={{ padding: 5, flexDirection: 'row' }}>
                <Image style={{
                  width: 80, height: 80,
                  resizeMode: 'center',
                }}
                  source={{ uri: item.product_sku }} />
                <View style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  width: 'auto',
                  height: 'auto',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                  <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 15 }}>

                    <Text style={{
                      color: NEGRO,
                      fontFamily: 'poppinsMedium',
                      fontSize: 18,
                      includeFontPadding: false,
                      padding: 0,
                      width: 'auto',
                      height: 'auto',
                      textAlign: 'center',
                    }}>
                      {item.product_name}
                    </Text>

                    <Text style={{
                      color: NEGRO,
                      fontFamily: 'poppinsMedium',
                      fontSize: 18,
                      includeFontPadding: false,
                      padding: 0,
                      width: 'auto',
                      height: 'auto',
                      textAlign: 'center',
                    }}>
                      {" x" + item.product_cuant}
                    </Text>

                  </View>
                  <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                  }}>

                    <Text style={{
                      color: GRIS_OSCURO,
                      fontFamily: 'poppinsLight',
                      alignItems: 'center', alignContent: 'center',
                      width: 'auto',
                      height: 'auto', fontWeight: '500',
                      letterSpacing: 0,
                      fontSize: 16,
                    }}>
                      {'Tamaño: '}
                    </Text>
                    <Text style={{
                      color: GRIS_OSCURO,
                      fontFamily: 'poppinsLight',
                      alignItems: 'center', alignContent: 'center',
                      width: 'auto',
                      height: 'auto', fontWeight: '500',
                      letterSpacing: 0,
                      fontSize: 16,
                    }}>
                      {item.product_unit}
                    </Text>
                  </View>
                </View>
                <Price value={item?.product_price} />
              </View>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={(item) => item.product_id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 3,
  },
  aligncenter: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});