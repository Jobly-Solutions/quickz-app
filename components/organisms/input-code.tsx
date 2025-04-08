import { ICONO_SUPPORT, ICONO_VERIFICACION, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import { GRIS_CLARO, GRIS_OSCURO, VERDE_LINDO, WHITE } from "@/styles/colors";
import { estilos } from '@/styles/tema_general';
import { FONT_SIZE_15, FONT_SIZE_26 } from "@/styles/typography";
import { useNavigation } from '@react-navigation/native';
import React, { FC, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from "react-native";
// import { FirebaseRecaptchaVerifier, FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'; 

interface InputCodeProps {
    telef: string,
    crearCuenta: () => void,
    cambiarPantalla: () => void
};

export const InputCode: FC<InputCodeProps> = (props) => {
    const { telef, crearCuenta, cambiarPantalla } = props;
    const navigation = useNavigation();

    const digitA = useRef<TextInput | null>(null);
    const digitB = useRef<TextInput | null>(null);
    const digitC = useRef<TextInput | null>(null);
    const digitD = useRef<TextInput | null>(null);
    const digitE = useRef<TextInput | null>(null);
    const digitF = useRef<TextInput | null>(null);

    const [digit1, setDig1] = useState('');
    const [digit2, setDig2] = useState('');
    const [digit3, setDig3] = useState('');
    const [digit4, setDig4] = useState('');
    const [digit5, setDig5] = useState('');
    const [digit6, setDig6] = useState('');

    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                source={IMAGE_BACKGROUND}
                resizeMode='stretch'
                style={estilos.backgroundimage}>
                <View style={estilos.barra_superiod}>
                    <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
                        <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={estilos.iconosSuperior} source={ICONO_VOLVER} />
                    </TouchableOpacity>
                </View>

                <View style={styles.codeContainer}>
                    <View style={styles.codeImageContainer}>
                        <Image source={ICONO_VERIFICACION} />
                    </View>
                    <Text style={styles.codeText}>
                        {'código de verificación'}
                    </Text>

                    <View style={styles.inputCodeContainer}>

                        <Text style={styles.inputCodeTitleText}>
                            {'Te hemos enviado un código de 6 digitos a ' + telef + ' para verificar tu identidad'}
                        </Text>

                        <View style={styles.inputCodeTextInputContainer}>
                            <TextInput
                                style={styles.campodigit}
                                placeholder={''}
                                value={digit1}
                                maxLength={1}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        digitB.current?.focus();
                                    }
                                    setDig1(text);
                                }}
                                onSubmitEditing={() => { digitB.current?.focus(); }}
                                ref={digitA}
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.campodigit}
                                placeholder={''}
                                value={digit2}
                                maxLength={1}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        digitC.current?.focus();
                                    }
                                    setDig2(text);
                                }}
                                onSubmitEditing={() => { digitC.current?.focus(); }}
                                ref={digitB}
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.campodigit}
                                placeholder={''}
                                value={digit3}
                                maxLength={1}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        digitD.current?.focus();
                                    }
                                    setDig3(text);
                                }}
                                onSubmitEditing={() => { digitD.current?.focus(); }}
                                ref={digitC}
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.campodigit}
                                placeholder={''}
                                value={digit4}
                                maxLength={1}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        digitE.current?.focus();
                                    }
                                    setDig4(text);
                                }}
                                onSubmitEditing={() => { digitE.current?.focus(); }}
                                ref={digitD}
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.campodigit}
                                placeholder={''}
                                value={digit5}
                                maxLength={1}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        digitF.current?.focus();
                                    }
                                    setDig5(text);
                                }}
                                onSubmitEditing={() => { digitF.current?.focus(); }}
                                ref={digitE}
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                            />
                            <TextInput
                                style={styles.campodigit}
                                placeholder={''}
                                value={digit6}
                                maxLength={1}
                                onChangeText={setDig6}
                                onSubmitEditing={() => { crearCuenta() }}
                                ref={digitF}
                                keyboardType={'phone-pad'}
                                underlineColorAndroid='transparent'
                            />
                        </View>

                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '100%',
                            marginBottom: 15,
                            marginTop: 5,
                            backgroundColor: '#FFFFFF',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.continuar}>{'Por favor, ingresá el código para continuar.'}</Text>
                        </View>

                        <View style={{
                            justifyContent: 'center',
                            width: '100%',
                            marginBottom: 15,
                            marginTop: 5,
                            backgroundColor: '#FFFFFF',
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                                <Text style={styles.donthaveacc}>
                                    {'¿No haz recibido el código? '}
                                </Text>
                                <TouchableOpacity
                                    onPress={() =>
                                        cambiarPantalla()
                                    }
                                >
                                    <Text style={styles.registerNow}>
                                        Reenviar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    <View style={styles.nextButtonContainer}>
                        <Button
                            title={'Siguiente'}
                            onPressed={() => {
                                crearCuenta();
                            }}
                        />
                    </View>

                </View>

            </ImageBackground>

        </ScrollView>);
};

const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    container: {
        // justifyContent: 'center',
        backgroundColor: WHITE,
    },
    codeContainer: {
        flex: 1,
        borderTopEndRadius: 40,
        paddingHorizontal: 15,
        borderTopStartRadius: 40,
        backgroundColor: '#FFFFFF',
    },
    codeImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    codeText: {
        textAlign: 'center',
        fontSize: FONT_SIZE_26,
        // lineHeight: 39,
        fontFamily: 'poppins',
        fontWeight: '700',
    },
    nextButtonContainer: {
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    campodigit: {
        backgroundColor: GRIS_CLARO,
        marginHorizontal: 5,
        marginVertical: 3,
        textAlign: 'center',
        fontSize: 22,
        padding: 10,
        fontFamily: 'poppinsMedium',
        borderRadius: 11,
        flex: 1,
        width: 'auto',
        height: 'auto',
    },
    continuar: {
        fontSize: 14,
        fontFamily: 'poppinsMedium',
        color: GRIS_OSCURO
    },
    donthaveacc: {
        fontSize: 16,
        fontFamily: 'poppinsRegular',
    },
    registerNow: {
        fontSize: 16,
        fontFamily: 'poppinsBold',
        textDecorationLine: 'underline',
        color: VERDE_LINDO
    },
    inputCodeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    inputCodeTitleText: {
        textAlign: 'center',
        fontSize: FONT_SIZE_15,
        fontFamily: 'poppins',
        fontWeight: '500',
    },
    inputCodeTextInputContainer: {
        height: 'auto',
        // width: 'auto', 
        flexDirection: 'row'
    }
});