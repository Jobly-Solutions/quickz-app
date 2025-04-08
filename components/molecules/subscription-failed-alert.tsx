import { BEIGE, WATERCOLOR } from '@/styles/colors';
import React, { FC } from 'react';
import Alert from 'react-native-awesome-alerts';

type Props = {
    isVisible: boolean;
    setVisible: (visible: boolean) => void;
    onChangePressed: () => void;
};

export const SubscriptionFailedAlert: FC<Props> = ({
    isVisible,
    setVisible,
    onChangePressed,
}) => {
    return (
        <Alert
            show={isVisible}
            title='Suscripción'
            message='No pudimos hacer el último pago de su suscripción, por favor cambie su metodo de pago.'
            closeOnTouchOutside={false}
            showCancelButton
            showConfirmButton
            cancelText='   Luego   '
            messageStyle={{
                textAlign: 'center',
            }}
            titleStyle={{
                fontSize: 19,
            }}
            confirmText='Cambiar'
            confirmButtonColor={WATERCOLOR}
            cancelButtonColor={BEIGE}
            onCancelPressed={() => setVisible(false)}
            onConfirmPressed={() => {
                setVisible(false);
                onChangePressed();
            }}
        />
    );
};
