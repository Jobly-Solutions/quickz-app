import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Text,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';
import {  GRIS_CLARO, NEGRO, WHITE } from '@/styles/colors';
import { ICONO_SUPPORT, ICONO_CARRO, ICONO_HOME, ICONO_USER, ICONO_COMPRAR, ICONO_PUNTO, ICONO_VOLVER} from '@/assets/iconos';
import { IMAGEN_CORRECT } from '@/assets/images';

import { estilos } from '@/styles/tema_general';
import { VERDE_CLARO, VERDE_LINDO } from '@/styles/colors';
import { UI_BANNERINF } from '@/assets/ui';
import { Modal } from '@/components/molecules/modal';
import { CancelarPedido } from '@/firebase-js/api';

const { width: viewportWidth } = Dimensions.get('window');

export const MotivoCancelacion = () => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [uiduser, setuiduser] = useState('0');
    const [redirec, setRedirec] = useState(false);
    const handleRedirec = () => { setRedirec(() => !redirec)}
    const [cancel, setCancel] = useState(false);
    const handleCancel = () => { setCancel(() => !cancel)}
    const checked1 = () => {
        if(check1){ 
            setCheck1(false);
         } else{
            setCheck1(true);
            setCheck2(false);
            setCheck3(false);
        }
    }

    const checked2 = () => {
        if(check2){ 
            setCheck2(false);
         } else{
            setCheck2(true);
            setCheck1(false);
            setCheck3(false);
        }
    }

    const checked3 = () => {
        if(check3){ 
            setCheck3(false);
         } else{
            setCheck3(true);
            setCheck2(false);
            setCheck1(false);
        }
    }

    const processCancel = async () => {
        const id = await AsyncStorage.getItem('@orderid');
       
        var today = new Date();
        var time = '' + today.getDay() + '/' + today.getMonth() + '/' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes().toPrecision(2);
        handleCancel();
        CancelarPedido(
            uiduser,
            id,
            time,
            async () => {
                //TODO
            },
            () => {
                setVisible(false);
            }
        );
    }


    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };


    useEffect(() => {
        setVisible(true);
        (async () => {
            const values = await AsyncStorage.getItem('@useruid');
            const valueOrder = await AsyncStorage.getItem('@orderid')
            if (values !== null) {
                await setuiduser(values);
            } else {
                setVisible(false);
                setAlert(true);
                setMessageAlert('error al cargar el usuario');
            }
        })();
    }, []);

    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title='Error'
                titleStyle={styles.titleStyle}
                message={messageAlert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                onDismiss={() => _cleanAlert()}
                showConfirmButton={false}
            />


            <View style={{ alignItems: 'center', height: '100%' }}>
                <View style={{
                    backgroundColor: 'rgba(73, 201, 139, 1)',
                    width: '100%',
                    height: '100%'
                }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    ><ScrollView endFillColor={WHITE}
                        style={{
                            position: 'relative',
                        }}>


                        <View style={{
                            height: 55,
                            marginTop: 45,
                            alignContent: 'stretch',
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            paddingVertical: 7,
                        }}>
                            <Text style={{

                                fontSize: 20,
                                flex: 1,
                                textAlign: 'center',
                                color: WHITE,
                                alignSelf: 'center',
                                fontFamily: 'poppinsBold',
                            }}>Pedidos</Text>
                            <TouchableOpacity onPress={() => {handleRedirec()}}>
                                <Image style={estilos.iconosSuperior} source={ICONO_SUPPORT} />
                            </TouchableOpacity>


                            <TouchableOpacity style={{
                                height: 33,
                                width: 33, marginStart: 15,
                                position: 'absolute',
                                alignContent: 'center',
                                alignSelf: 'center',
                            }} onPress={() => { navigation.navigate('Home') }}>
                                <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                            </TouchableOpacity>
                        </View>

                        <View style={estilos.contenedorPantalla}>

                                <View style={{
                                    flexDirection: 'column',
                                    width: '100%', height: '100%',
                                    justifyContent: 'center',
                                    flex: 1,
                                    paddingHorizontal: 15,
                                    paddingVertical: 5,
                                }}>
                                    <Text style={{
                                        fontFamily: 'poppinsSemiBold',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        color: NEGRO,
                                        alignSelf: 'center',
                                        width: '100%'
                                    }}>Contanos el motivo de la cancelación</Text>

                                    <View style={{
                                        flexDirection: 'column',
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignSelf: 'center'
                                    }}>
                                        <View style={{marginLeft: 12, marginTop: 10}}>
                                            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => { checked1() }}>
                                                {check1 ?
                                                    <Image style={{
                                                        height: 20,
                                                        margin: 4,
                                                        width: 20,
                                                        tintColor: VERDE_CLARO,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_PUNTO} />
                                                    :
                                                    <Image style={{
                                                        height: 20,
                                                        margin: 4,
                                                        width: 20,
                                                        tintColor: GRIS_CLARO,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_PUNTO} />
                                                }

                                                <Text style={{
                                                    color: NEGRO,
                                                    fontFamily: 'poppinsLight',
                                                    fontSize: 16,
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    alignContent: 'center',
                                                    textAlign: 'left',
                                                    marginHorizontal: 8,
                                                    padding: 0,
                                                    includeFontPadding: false,
                                                }}>{'Tengo inconvenientes con la tienda'}</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{marginLeft: 12, marginTop: 10}}>
                                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => { checked2() }}>
                                                {check2 ?
                                                    <Image style={{
                                                        height: 20,
                                                        margin: 4,
                                                        width: 20,
                                                        tintColor: VERDE_CLARO,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_PUNTO} />
                                                    :
                                                    <Image style={{
                                                        height: 20,
                                                        margin: 4,
                                                        width: 20,
                                                        tintColor: GRIS_CLARO,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_PUNTO} />
                                                }

                                                <Text style={{
                                                    color: NEGRO,
                                                    fontFamily: 'poppinsLight',
                                                    fontSize: 16,
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    alignContent: 'center',
                                                    textAlign: 'left',
                                                    marginHorizontal: 8,
                                                    padding: 0,
                                                    includeFontPadding: false,
                                                }}>{'Hay un error en el pedido'}</Text>

                                            </TouchableOpacity>
                                        </View>
                                        <View style={{marginLeft: 12, marginTop: 10}}>
                                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => { checked3() }}>
                                                {check3 ?
                                                    <Image style={{
                                                        height: 20,
                                                        margin: 4,
                                                        width: 20,
                                                        tintColor: VERDE_CLARO,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_PUNTO} />
                                                    :
                                                    <Image style={{
                                                        height: 20,
                                                        margin: 4,
                                                        width: 20,
                                                        tintColor: GRIS_CLARO,
                                                        alignContent: 'center',
                                                        alignSelf: 'center',
                                                    }} source={ICONO_PUNTO} />
                                                }

                                                <Text style={{
                                                    color: NEGRO,
                                                    fontFamily: 'poppinsLight',
                                                    fontSize: 16,
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    alignContent: 'center',
                                                    textAlign: 'left',
                                                    marginHorizontal: 8,
                                                    padding: 0,
                                                    includeFontPadding: false,
                                                }}>{'Otro:'}</Text>

                                            </TouchableOpacity>
                                            <View
                                                style={{
                                                    backgroundColor: GRIS_CLARO,
                                                    borderRadius: 20,
                                                    width: '95%',
                                                    margin: 10
                                                }}>
                                                    <TextInput
                                                        editable
                                                        multiline
                                                        numberOfLines={8}
                                                        maxLength={150}
                                                        style={{padding: 10}}
                                                        placeholder="Contanos tu motivo..."
                                                    />
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#5ED69C',
                                        height: 50,
                                        paddingVertical: 10,
                                        borderRadius: 15,
                                        marginTop: 150,
                                        marginBottom: 130,
                                    }} onPress={()=> {processCancel()}}>
                                        <Text style={{
                                           fontSize: 20,
                                           flex: 1,
                                           textAlign: 'center',
                                           color: WHITE,
                                           alignSelf: 'center',
                                           fontFamily: 'poppinsBold', 
                                        }}>Cancelar pedido</Text>
                                    </TouchableOpacity>

                                </View>

                                  
                        </View>
                        
                    

                    <View style={estilos.barra_inferior}>
                        <ImageBackground
                            source={UI_BANNERINF}
                            resizeMode='stretch'
                            style={estilos.backgroundiferior}
                        >


                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('Home')}>
                                <Image style={estilos.iconosInferior} source={ICONO_HOME} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('Pedidos')}>
                                <Image style={{
                                    height: 40,
                                    width: 40,
                                    resizeMode: 'contain',
                                    tintColor: VERDE_LINDO,
                                    alignContent: 'center',
                                    alignSelf: 'center',
                                }} source={ICONO_COMPRAR} />
                                <Image style={estilos.puntoInferior} source={ICONO_PUNTO} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('MiCarro')}>
                                <Image style={estilos.iconosInferior} source={ICONO_CARRO} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    marginBottom: 1,
                                }}
                                onPress={() => navigation.navigate('MisDatos')}>
                                <Image style={estilos.iconosInferior} source={ICONO_USER} />
                            </TouchableOpacity>


                        </ImageBackground>


                    </View>
                
                    <Modal isVisible={redirec}>
                        <Modal.Container>
                            <Modal.HeaderCarrito title="Consulta" onPress={() => handleRedirec()} />
                            <Modal.Body>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    width: '100%',
                                    color: NEGRO,
                                    height: 'auto',
                                    fontFamily: 'poppinsRegular',
                                    alignSelf: 'flex-start',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    justifyContent: 'center',
                                    includeFontPadding: false,
                                    textAlignVertical: 'bottom',
                                }}>
                                    ¿Necesesitas hablar con un representante de la tienda?
                                </Text>
                                

                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

                                    <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                                       <TouchableOpacity style={{
                                        height: 40,
                                        paddingHorizontal: 30,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                        backgroundColor: WHITE,
                                        borderWidth: 1,
                                        borderColor: '#5ED69C'
                                       }} onPress={() => { navigation.navigate('SoporteGeneral')}}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                color: '#5ED69C'
                                            }}>
                                                Aceptar
                                            </Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity style={{
                                        height: 40,
                                        paddingHorizontal: 30,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                        backgroundColor: '#5ED69C',
                                       }} onPress={() => handleRedirec()}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                color: WHITE
                                            }}>
                                                Cancelar
                                            </Text>
                                       </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>

                    <Modal isVisible={cancel}>
                        <Modal.Container>
                            <Modal.HeaderCarrito title="Aviso" onPress={() => handleCancel()} />
                            <Modal.Body>
                                <Image source={IMAGEN_CORRECT} style={{width: 90, height: 90, justifyContent: 'center', margin: 15, marginLeft: 105}}/>
                                <Text style={{
                                    fontSize: 17,
                                    textAlign: 'center',
                                    width: '100%',
                                    color: NEGRO,
                                    height: 'auto',
                                    fontFamily: 'poppinsSemiBold',
                                    alignSelf: 'flex-start',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    justifyContent: 'center',
                                    includeFontPadding: false,
                                    textAlignVertical: 'bottom',
                                }}>
                                    Tu pedido fue cancelado de manera exitosa
                                </Text>
                                

                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

                                    <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                            
                                       <TouchableOpacity style={{
                                        height: 40,
                                        paddingHorizontal: 30,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                        backgroundColor: '#5ED69C',
                                       }} onPress={() => navigation.navigate('Home')}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                color: WHITE
                                            }}>
                                                Volver al inicio
                                            </Text>
                                       </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>

                    </ScrollView></KeyboardAvoidingView>
                    
                </View>
                
            </View>
            
        </>
    );
};
const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: 'poppinsRegular',
    },
});