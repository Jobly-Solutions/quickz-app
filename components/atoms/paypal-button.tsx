import { BEIGE, WATERCOLOR } from '@/styles/colors';
import { SIZE_TYPE } from '@/styles/typography';
import React, { FC } from 'react';
import { ToastAndroid } from 'react-native';
import { Button as Btn } from 'react-native-paper';

type props = {
    title: string;
    onPressed: () => void;
    watercolor?: boolean;
    disabled?: boolean;
    loading?: boolean;
};

export const PayPalButton: FC<props> = ({
    title,
    onPressed,
    watercolor,
    disabled,
    loading,
}) => {
    let btnColor = BEIGE;
    if (watercolor) btnColor = WATERCOLOR;
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
                height: 50,
                width: '100%',
                alignItems: 'center',  
                borderRadius: 100,
                justifyContent: 'center',
                backgroundColor: btnColor,
            }}
            labelStyle={{ 
                color: 'white',
                width: '100%',
                fontSize: SIZE_TYPE.big,
            }}
            loading={loading}
        >
            {title}
        </Btn>
    );
};
