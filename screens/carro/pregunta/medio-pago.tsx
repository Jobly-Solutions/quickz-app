import { Screen } from '@/components/templates/screen';
import { Formik } from 'formik';
import React from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import { cardFormValidator } from '@/functions/validators';
// import { IMAGE_STRIPE } from '@/assets/images';
import { ButtonBottom } from '@/components/atoms/button-bottom';
import { TextField } from '@/components/molecules/text-field-formik';
import { scaleModerate, scaleVertical } from '@/styles/mixins';
import { F1_16_400_20, F1_22_600_33 } from '@/styles/typography';
import {
    addGaps,
    removeSpaces,
} from '@/functions/string-utilities';
import { useAppDispatch } from '@/hooks/redux';
import { setPaidMethodValue } from '@/redux/slices/paid-method-slice';


export function MedioPago({ route, navigation }) {
    const { onSave } = route.params;
    const dispatch = useAppDispatch();

    const iconCard = {
        name: 'card',
        size: scaleModerate(30),
        color: 'black'
    }

    const handleSubmit = (values) => {
        const { exp_date, card_number, cvc, name } = values;
        Keyboard.dismiss();
        const exp_month = exp_date.split(' ')[0];
        const exp_year = exp_date.split(' ')[1];
        dispatch(setPaidMethodValue(values));
        if (onSave) onSave();
        navigation.goBack();
    }

    return (
        <Screen title=''>
            <Text style={styles.title}>Tarjeta de Débito/Crédito:</Text>
            <Formik
                initialValues={{
                    cvc: '',
                    exp_date: '',
                    card_number: '',
                    name: '',
                }}
                onSubmit={handleSubmit}
                validate={cardFormValidator}
            >
                {({
                    errors,
                    values,
                    handleChange,
                    handleSubmit,
                }) => {
                    return (<>
                        <ScrollView>
                            <View style={styles.cardInformation}>
                                <TextField
                                    icon={iconCard}
                                    topText='Número de tarjeta'
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
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '45%' }}>
                                        <TextField
                                            topText='Vencimiento'
                                            placeholder='01 25'
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
                                    <View style={{ width: '45%' }}>
                                        <TextField
                                            topText='Código de seguridad'
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
                                <TextField
                                    topText='Nombre que figura en la tarjeta'
                                    value={values.name}
                                    placeholder='Ingresa el nombre que figura en tu tarjeta'
                                    // valueError={errors.name}
                                    onChangeText={handleChange(
                                        'name'
                                    )}
                                // keyboardType='number-pad'
                                />
                            </View>
                            <View style={{ marginTop: scaleVertical(90) }}>
                                <ButtonBottom
                                    onPress={handleSubmit}
                                    text={'Agregar metodo'}
                                />
                            </View>
                        </ScrollView>
                    </>);
                }}
            </Formik >
        </Screen >
    )
}

const styles = StyleSheet.create({
    title: {
        ...F1_22_600_33,
        marginTop: scaleVertical(53),
    },
    cardInformation: {
        paddingTop: scaleVertical(20)
    },
    // subtitle: {
    //     ...F1_13_500_16,
    //     marginBottom: scaleVertical(10),
    // },
    // dataContainer: {
    //     height: scaleVertical(50),
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#F1F1F1',
    //     paddingHorizontal: scaleHorizontal(10),
    //     marginBottom: scaleVertical(20),
    //     borderRadius: scaleModerate(8),
    //     borderWidth: 1,
    //     borderColor: '#C4C4C4',
    // },
    textInput: {
        ...F1_16_400_20,
        width: '100%',
    },
    // textInputName: {
    //     ...F1_12_400_20,
    //     width: '100%',
    // },
    // cardIcon: {
    //     height: scaleVertical(20),
    //     width: scaleHorizontal(30),
    // },
    // titleStyle: {
    //     color: GREEN_4,
    //     fontFamily: 'Roboto',
    //     fontWeight: '700',
    //     fontSize: 12,
    //     marginBottom: scaleVertical(10),
    // },
    // messageStyle: {
    //     color: GRAY_11,
    //     fontFamily: 'Roboto',
    //     fontSize: 12,
    // },
    // contentContainerStyle: {
    //     position: 'absolute',
    //     top: 30,
    //     left: 15,
    //     width: 515,
    //     backgroundColor: GREEN_3,        
    //     borderRadius: 16,
    //     borderColor: GREEN_5,
    //     borderWidth: 1,
    // },
})