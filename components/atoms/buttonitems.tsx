import React, { FC } from 'react';
import { ToastAndroid } from 'react-native';
import { Button as Btn } from 'react-native-paper';
import { VERDE_CLARO, WHITE } from '@/styles/colors';

type props = {
    title: string;
    onPressed: () => void;
    watercolor?: boolean;
    disabled?: boolean;
    loading?: boolean;
};
export const ButtonItemsB: FC<props> = ({
    title,
    onPressed,
    watercolor,
    disabled,
    loading,
}) => {
    let btnColor = VERDE_CLARO;
    if (watercolor) btnColor = VERDE_CLARO;
    if (disabled) btnColor = '#cac1c1';

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
            style={{    
                width: 'auto',
                height:35,
                flex:1,
                alignItems: 'center',  
                borderRadius: 12,  
                marginHorizontal:15,
                justifyContent: 'center',
                backgroundColor: btnColor,
            }}
            labelStyle={{ 
                color: WHITE,
                width: 'auto', 
                fontFamily:'poppinsRegular',
                fontSize: 13,
            }}
            loading={loading}
        >
            {title}
        </Btn>
    );
};
