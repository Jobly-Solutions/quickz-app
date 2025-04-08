import { ICONO_MINUS_CIRCLE, ICONO_PLUS_CIRCLE } from '@/assets/iconos';
import { GREEN, GREEN_2, WHITE } from '@/styles/colors';
import { FONT_SIZE_15 } from '@/styles/typography';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TiendasProducto } from '@/types';

type UpdateProductStockFn = (product: TiendasProducto, stock: number) => void;

interface ProductStockButtonProps {
  product: TiendasProducto;
  updateProductStock: UpdateProductStockFn;
}

export default function ProductStockButton({ product, updateProductStock }: ProductStockButtonProps) {
  const [stock, setStock] = useState(0);

  const quantity = product.product_cuant;

  const isStock = stock > 0;

  const handleRemove = () => {
    const _stock = stock - 1
    setStock(_stock);
    updateProductStock(product, _stock)
  }

  const handleAdd = () => {
    const _stock = stock + 1
    setStock(_stock);
    updateProductStock(product, _stock);
  }

  useEffect(() => {
    if (quantity > 0) setStock(quantity)
  }, [quantity])

  return (
    <View style={[
      styles.container,
      isStock && styles.containerStock
    ]}>
      <TouchableOpacity
        onPress={isStock ? handleRemove : handleAdd}>
        <Image
          source={isStock ? ICONO_MINUS_CIRCLE : ICONO_PLUS_CIRCLE}
          style={{ 
            width: 25, 
            height: 25,
            tintColor: isStock ? WHITE : GREEN, 
          }}
        />
      </TouchableOpacity>
      <Text style={[
        styles.textButton,
        isStock && styles.textButtonStock
      ]}>
        {isStock ? stock : 'Agregar'}
      </Text>
      {isStock ? <TouchableOpacity
        onPress={handleAdd}>
        <Image
          source={ICONO_PLUS_CIRCLE}
          style={{ 
            width: 25, 
            height: 25,
            tintColor: WHITE, 
          }}
        />
      </TouchableOpacity>
        : <View style={{ width: 22 }} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    borderColor: GREEN,
    borderWidth: 1,
    width: 163,
    height: 32,
    paddingHorizontal: 5,
    backgroundColor: GREEN_2,
    alignItems: 'center',
  },
  containerStock: {
    backgroundColor: GREEN,
  },
  button: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStock: {
    borderColor: WHITE,
  },
  textButton: {
    color: GREEN,
    fontFamily: 'poppinsSemiBold',
    fontSize: FONT_SIZE_15,
    lineHeight: 21,
    alignSelf: 'center',
    paddingTop: 2
  },
  textButtonStock: { color: WHITE }
});