import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ICONO_BORRAR } from '@/assets/iconos';
import { ALERT, GRIS_CLARO, GRIS_OSCURO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { TiendasProductoCheck } from '@/types';
import { scaleHorizontal, scaleVertical } from '@/styles/mixins';

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

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  personss: TiendasProductoCheck[];
  quitarProductos: (id: string) => void;
  addProductos: (id: string, cant: number) => void;
  restProductos: (id: string, cant: number) => void;
}

const AdapterCarro: React.FC<Props> = ({ personss, quitarProductos, addProductos, restProductos }) => {
  const renderRightAction = (id: string, progress: Animated.AnimatedInterpolation<number>) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
    });

    return (
      <Animated.View style={[styles.deleteContainer, { transform: [{ translateX: trans }] }]}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => quitarProductos(id)}>
          <Image style={styles.deleteIcon} source={ICONO_BORRAR} />
          <Text style={styles.deleteText}>Quitar del carro</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const myItemSeparator = () => <View style={styles.separator} />;

  const myListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No agregaste ningún item al carrito</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={personss}
        keyExtractor={(item) => item.product_id}
        renderItem={({ item }) => (
          <Swipeable
            friction={1.5}
            rightThreshold={30}
            renderRightActions={(progress) => renderRightAction(item.product_id, progress)}
          >
            <View style={styles.itemContainer}>
              <Image style={estilos.imagenesItems} source={{ uri: item.product_sku }} />

              <View style={estilos.contenedorHorizontal}>
                <View style={estilos.contenedorVerticalRow}>
                  <Text style={estilos.itemProductoCarro}>{item.product_name}</Text>
                </View>
                <View style={estilos.contenedorVerticalRow}>
                  <Text style={estilos.itemSizeCarro}>Tamaño: </Text>
                  <Text style={estilos.itemSizeCarro}>{item.product_unit}</Text>
                </View>
                <View style={estilos.contenedorVerticalRow}>
                  <Text style={estilos.itemPrecioCarro}>$</Text>
                  <Text style={estilos.itemPrecioCarro}>{item.product_price}</Text>
                </View>
              </View>

              <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.deleteSmallButton} onPress={() => quitarProductos(item.product_id)}>
                  <Image style={styles.smallIcon} source={ICONO_BORRAR} />
                </TouchableOpacity>

                <View style={estilos.contenedorSimbolosCarro}>
                  <TouchableOpacity
                    style={estilos.botomSimbolosCarro}
                    onPress={() => addProductos(item.product_id, item.product_cuant)}
                  >
                    <Text style={estilos.itemSimbolosCarro}>+</Text>
                  </TouchableOpacity>
                  <Text style={estilos.itemCantiCarro}>{item.product_cuant}</Text>
                  <TouchableOpacity
                    style={estilos.botomSimbolosCarro}
                    onPress={() => {
                      if (item.product_cuant >= 2) restProductos(item.product_id, item.product_cuant);
                    }}
                  >
                    <Text style={estilos.itemSimbolosCarro}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Swipeable>
        )}
        ListEmptyComponent={myListEmpty}
        ItemSeparatorComponent={myItemSeparator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    minHeight: 150,
    alignContent: 'center',
    justifyContent: 'center',
  },
  deleteContainer: {
    backgroundColor: ALERT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 40,
    height: 45,
    tintColor: WHITE,
    resizeMode: 'center',
  },
  deleteText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: GRIS_CLARO,
    marginHorizontal: 30,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyText: {
    color: GRIS_OSCURO,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    marginVertical: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteSmallButton: {
    width: scaleHorizontal(32),
    height: scaleVertical(30),
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 6,
    borderRadius: 9,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIcon: {
    width: scaleHorizontal(20),
    height: scaleVertical(20),
    tintColor: '#717171',
    resizeMode: 'center',
  },
});

export default AdapterCarro;