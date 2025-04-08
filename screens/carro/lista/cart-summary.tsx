import { ICONO_DERECHA, ICONO_PROMO } from '@/assets/iconos';
import { useAppSelector } from '@/hooks/redux';
import { GRAY_12, GRAY_8, GRAY_9, GRIS_CLARO, GRIS_OSCURO, NEGRO, RED_1, VERDE_CLARO, WHITE } from '@/styles/colors';
import { scaleHorizontal, scaleModerate, scaleVertical } from '@/styles/mixins';
import { F1_14_500_16, F1_14_600_21, F1_15_300_22, F1_16_500_24 } from '@/styles/typography';
import { isEmptyObject } from '@/utils/object-utils';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SUMMARY = 'Resumen:';
const PROMOTIONAL_CODE = 'CÓDIGO PROMOCIONAL';
const SUBTOTAL = 'Subtotal productos';
const SERVICE_COST = 'Costo de servicio';
const SHIPPING_COST = 'Costo de envío';
const TOTAL = 'Total';
const PAYMENT_METHOD = 'Método de pago';
const ADD = 'Agregar';
const CASH = 'Efectivo';
const DISCOUNT = 'Descuento';

interface CartSummaryProps {
  delivery: boolean;
  coupon: number;
  subTotal: number;
  total: number;
  totalServ: number;
  totalDeliv: number;
  navigation: any;
  style?: any;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ delivery, coupon, subTotal, total, totalServ, totalDeliv, navigation, style }) => {
  let styles = CartSummaryStyles;
  if (style) styles = { ...styles, ...style };

  const paidMethodSelected = useAppSelector((state) => state.paidMethod.selected)?.title || CASH;

  const handleAddCodePress = () => {
    navigation.navigate('Cupones')
  }

  const ItemRow = ({ label, value, isTotal, isDiscount }) => (
    <View style={[styles.itemRow, isTotal && styles.itemRowTotal]}>
      <Text style={[styles.itemLabel, isTotal && styles.itemLabelTotal]}>{label}</Text>
      <Text style={[styles.itemValue, isTotal && styles.itemValueTotal, isDiscount && { color: RED_1 }]}>{value}</Text>
    </View>
  );

  const PromoCode = () => (
    <View style={styles.promoCodeContainer}>
      <View style={styles.promoCodeInputContainer}>
        <Image source={ICONO_PROMO} style={styles.promoIcon} />
        <TextInput style={styles.promoInput} placeholder={PROMOTIONAL_CODE} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCodePress}>
        <Text style={styles.addButtonText}>{ADD}</Text>
      </TouchableOpacity>
    </View>
  );

  const Summary = ({ subTotal, total, totalServ, totalDeliv }) => (
    <View style={styles.resumenContainer}>
      <Text style={styles.resumenTitle}>{SUMMARY}</Text>
      <PromoCode />
      <View style={styles.separator} />
      <ItemRow label={SUBTOTAL} value={`$${subTotal}`} />
      <ItemRow label={SERVICE_COST} value={`$${totalServ}`} />
      {totalDeliv > 0 &&
        <ItemRow label={SHIPPING_COST} value={`$${totalDeliv}`} />}
      {coupon > 0 &&
        <ItemRow label={DISCOUNT} value={`-$${coupon}`} isDiscount />}
      <View style={styles.separator} />
      <ItemRow label={TOTAL} value={`$${total}`} isTotal />
    </View>
  );

  return (
    <View style={styles.container}>
      <Summary subTotal={subTotal} total={total} totalServ={totalServ} totalDeliv={delivery ? totalDeliv : 0} />
      <View style={styles.separator} />
      <View style={styles.paymentMethodContainer}>
        <Text style={styles.paymentMethodTitle}>{PAYMENT_METHOD}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Pregunta', { tipo: 'takeaway' })}>
          <View style={styles.paymentMethodRow}>
            <Text style={styles.paymentMethodText}>{paidMethodSelected}</Text>
            <Image source={ICONO_DERECHA} style={styles.paymentMethodIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CartSummaryStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  resumenContainer: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
  resumenTitle: {
    color: NEGRO,
    fontFamily: 'poppinsSemiBold',
    fontSize: 16,
    marginHorizontal: 15,
    marginBottom: 5,
    includeFontPadding: false,
  },
  promoCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: scaleHorizontal(15),
    marginBottom: scaleVertical(5),
  },
  promoCodeInputContainer: {
    flexDirection: 'row',
    gap: scaleHorizontal(10),
  },
  promoIcon: {
    width: 18,
    height: 18,
    tintColor: GRIS_OSCURO,
    alignSelf: 'center',
  },
  promoInput: {
    width: scaleHorizontal(194),
    ...F1_15_300_22,
    color: GRAY_9,
  },
  addButton: {
    backgroundColor: VERDE_CLARO,
    height: scaleVertical(32),
    width: scaleHorizontal(121),
    borderRadius: scaleModerate(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    ...F1_14_500_16,
    color: WHITE,
  },
  itemRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  itemRowTotal: {
    // borderTopWidth: 1,
    // borderColor: GRIS_OSCURO,
  },
  itemLabel: {
    color: GRAY_8,
    fontFamily: 'poppinsLight',
    fontSize: 16,
    marginHorizontal: 15,
    includeFontPadding: false,
  },
  itemLabelTotal: {
    color: NEGRO,
    fontFamily: 'poppinsSemiBold',
  },
  itemValue: {
    color: GRAY_8,
    fontFamily: 'poppinsLight',
    fontSize: 16,
    marginHorizontal: 5,
    includeFontPadding: false,
  },
  itemValueTotal: {
    color: NEGRO,
    fontFamily: 'poppinsSemiBold',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: GRIS_CLARO,
    marginVertical: 10,
  },
  paymentMethodContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  paymentMethodTitle: {
    ...F1_16_500_24,
    color: GRAY_12,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    gap: 5,
  },
  paymentMethodText: {
    ...F1_14_600_21,
    color: GRAY_12,
  },
  paymentMethodIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginLeft: 15,
  },
});
