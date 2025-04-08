import React, { FC } from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Button as Btn } from 'react-native-paper';
import { VERDE_CLARO, VERDE_OSCURO, WHITE } from '@/styles/colors';
type props = {
    title: string;
    onPressed: () => void;
    watercolor?: boolean;
    disabled?: boolean;
    loading?: boolean;
};
export const ButtonDialogos: FC<props> = ({
    title,
    onPressed,
    watercolor,
    disabled,
    loading,
}) => { 
    return (
        <Btn
            uppercase={false}
            onPress={
                !disabled
                    ? onPressed
                    : () => {
                          ToastAndroid.show(
                              'Deshabilitado',
                              ToastAndroid.SHORT
                          );
                      }
            }
            style={watercolor ? styles.botonAzul : styles.botonAzulLineas}
            labelStyle={watercolor ? styles.textoBlanco : styles.textoAzul}
            loading={loading}
        >
            {title}
        </Btn>
    );


};


const styles = StyleSheet.create({
  botonAzul: { 
                height: 'auto',
                width: 'auto', 
                borderRadius: 50,
                justifyContent: 'center',
                backgroundColor: VERDE_CLARO,
  },
  botonAzulLineas: { 
    height:'auto',
    width: 'auto',
    borderColor: VERDE_OSCURO,
    borderWidth: 2.0, 
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: WHITE,
  },
  textoAzul: { 
    color: VERDE_OSCURO,
                width: 'auto',
                height: 'auto',
                fontFamily:'poppinsSemiBold',
                fontSize: 17,
  },
  textoBlanco: {
    color: WHITE,
                width: 'auto',
                height: 'auto',
                fontFamily:'poppinsSemiBold',
                fontSize: 17,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
  },
});
