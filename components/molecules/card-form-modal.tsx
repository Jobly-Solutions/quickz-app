import { Button } from '@/components/atoms/button';
import { CREATE_CARD_TOKEN_URL } from '@/constants/Urls';
import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal } from 'react-native-paper';
import { addGaps, removeSpaces } from '@/functions/string-utilities';
import { cardFormValidator } from '@/functions/validators';
import { ALERT, GRAY_LIGHT, WATERCOLOR_TOP, WHITE } from '@/styles/colors';
import { TextField } from './text-field-formik';

type Props = {
    isVisible: boolean;
    setVisibility: (visibe: boolean) => void;
    onTokenGetted: (token: string) => void;
};
//get stripe card token
export const CardFormModal: FC<Props> = ({
    isVisible,
    setVisibility,
    onTokenGetted,
}) => {
    const [btnContinueIsLoading, setBtnContinueLoading] =
        useState(false);
        const [buttonStatus, setButtonStatus] = React.useState(false);  
    return (
        <Portal>
            <Modal
                contentContainerStyle={styles.modal}
                visible={isVisible}
                dismissable={false}
            >
                <Formik
                    initialValues={{
                        cvc: '',
                        exp_date: '',
                        card_number: '',
                    }}
                    onSubmit={({ exp_date, card_number, cvc }) => {
                        Keyboard.dismiss();
                        setBtnContinueLoading(true);
                        setButtonStatus(true)
                        const exp_month = exp_date.split(' ')[0];
                        const exp_year = exp_date.split(' ')[1];
                        CREATE_CARD_TOKEN_URL(
                            exp_month,
                            exp_year,
                            cvc,
                            card_number,
                            (result) => {
                                setBtnContinueLoading(false);
                                setButtonStatus(false);
                                if (!result.error) {
                                    if (result.token) {
                                        setVisibility(false);
                                        onTokenGetted(result.token);
                                    } else {
                                        setButtonStatus(false);
                                        Alert.alert(
                                            'Ha ocurrido un error inesperado',
                                            'Porfavor vuelva a intentar mas tarde.'
                                        );
                                    }
                                } else {
                                    setButtonStatus(false);
                                    Alert.alert(
                                        `Ha ocurrido un error', ${
                                            result.code
                                                ? result.code
                                                : ''
                                        }`
                                    );
                                }
                            }
                        );
                    }}
                    validate={cardFormValidator}
                >
                    {({
                        errors,
                        values,
                        handleChange,
                        handleSubmit,
                    }) => {


                        return (
                            <>
                            
                            <ScrollView
                            
                            >
                            <View
                                style={styles.logoFondo}
                             >

                            <Image
                             style={styles.tinyLogo}
                             source={IMAGE_STRIPE}
                            /> 
                             </View>

                             <Text style={styles.textSubtitle}>
                                     Paga con tu tarjeta de crédito o débito por Stripe. El saldo se sumará una vez el pago sea verificado. 
                                </Text>
                                 <Text style={styles.textSubtitlehint}>
                                     La App no tiene acceso a estos datos. 
                                </Text>

                                
                                <TextField
                                    placeholder='0123 4567 8910 1112'
                                    maxLength={19}
                                    
                                    value={values.card_number}
                                    onChangeText={(text) => {
                                        handleChange('card_number')(
                                            addGaps(
                                                removeSpaces(text),
                                                4
                                            )
                                        );
                                    }}
                                    valueError={errors.card_number}
                                    keyboardType='number-pad'
                                />
                                <View style={styles.buttomForm}>
                                    <View
                                        style={styles.buttomFormLeft}
                                    >
                                        <TextField
                                            placeholder='01/23'
                                            value={values.exp_date}
                                            onChangeText={(text) => {
                                                handleChange(
                                                    'exp_date'
                                                )(
                                                    addGaps(
                                                        removeSpaces(
                                                            text
                                                        ),
                                                        2
                                                    )
                                                );
                                            }}
                                            valueError={
                                                errors.exp_date
                                            }
                                            maxLength={5}
                                            keyboardType='number-pad'
                                        />
                                    </View>
                                    <View
                                        style={
                                            styles.buttomFormRight
                                        }
                                    >
                                        <TextField
                                            value={values.cvc}
                                            placeholder='123'
                                            valueError={errors.cvc}
                                            onChangeText={handleChange(
                                                'cvc'
                                            )}
                                            keyboardType='number-pad'
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    marginTop: '7%', 
                                    flexDirection: 'row', 
                                    justifyContent: 'space-between', 
                                    marginBottom: '7%',
                                    }}> 

                                    <View style={{
                                    width: '40%', 
                                    marginStart:'2%',
                                    }}>
                                       <Button
                                        title='CANCELAR'
                                        onPressed={() =>
                                            setVisibility(false)
                                        }
                                    ></Button> 
                                    </View>
                                    <View style={{
                                    width: '40%',
                                    marginEnd:'2%', 
                                    }}>
                                        <Button
                                        disabled={buttonStatus}
                                        loading={
                                            btnContinueIsLoading
                                        }
                                        watercolor
                                        title='CONTINUAR'
                                        onPressed={() =>{
                                            handleSubmit();   
                                            setButtonStatus(false);
                                        }}
                                    ></Button>
                                    </View>
                                    
                                </View>
                                 
                           
                            </ScrollView>

                            
                            
                            


                           
                            </>
                        );
                    }}
                </Formik>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        paddingRight: 12,
        paddingLeft: 12,
        width: '99%',
        marginLeft: '.5%',
        height: '65%',
        minHeight: 300,
        backgroundColor: WHITE,
        borderRadius: 20,
    },
    buttomForm: {
        width: '100%',
        flexDirection: 'row',
    },
    buttomFormLeft: {
        width: '50%',
        paddingRight: '2%',
    },

    logoFondo:{
        marginTop: '7%',
        backgroundColor: WATERCOLOR_TOP,
        padding: 10, 
        borderRadius: 20,
        width: 90,
        height: 90,
        marginBottom: '7%',
        alignSelf: 'center',
    },

    tinyLogo: { 
        width: 70,
        tintColor: GRAY_LIGHT,
        height: 70,
        resizeMode: 'contain',
    },
    buttomFormRight: {
        width: '50%',
        paddingLeft: '2%',
    },
    btnWrapper: {
        marginTop: '7%',
        width: '40%',    
        flexDirection: 'row',
        alignSelf:'center',
        justifyContent: 'space-between', 
        marginBottom: '7%',
    },
    textSubtitle: {
        textAlign:'center',
        fontSize: 15,
    },
    textNormal: { 
        fontSize: 20,
    },
    textSubtitlehint: {
        textAlign:'center',
        fontSize: 15,
        color:ALERT,
    },
});
