import React, { FC } from 'react';
import { ToastAndroid } from 'react-native';
import { Button as Btn } from 'react-native-paper';
import { GRIS_CLARO, VERDE_OSCURO, WHITE } from '@/styles/colors';

type props = {
    title: string;
    onPressed: () => void; 
    disabled?: boolean;
    loading?: boolean;
};
export const ButtonItems: FC<props> = ({
    title,
    onPressed, 
    disabled,
    loading,
}) => {
    let btnColor = WHITE; 
    if (disabled) btnColor = GRIS_CLARO;

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
                alignItems: 'center',  
                borderRadius: 12, 
                borderColor: VERDE_OSCURO,
                borderWidth: 1.2,
                justifyContent: 'center',
                backgroundColor: btnColor,
            }}
            labelStyle={{ 
                color: VERDE_OSCURO,
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
