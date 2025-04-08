import { ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import { Button } from '@/components/atoms/button';
import { BEIGE, BLACK, RED, VERDE_CLARO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { AGREGAR_CUPON, TITULO_CUPONES_AGREGAR } from '@/styles/textos';
import { SIZE_TYPE } from '@/styles/typography';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth } = Dimensions.get('window');

export const RevisarPedidoScreen = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState([]);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    const navigation = useNavigation(); 
    
   
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };
    
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
            <Spinner visible={visible} />

                <View style={styles.container}>
                <ImageBackground
                source={IMAGE_BACKGROUND}
                resizeMode='stretch'
                style={estilos.backgroundimage}>
                         <View style={estilos.barra_superiod}>    
                        <View style={{flex:1,}} />                  
                            <Image style={estilos.iconoVolver} source={ICONO_VOLVER} /> 
                            
                        </View>

                    <View style={estilos.contenedorPantalla}>
                        <Text style={estilos.textTitulo}>{TITULO_CUPONES_AGREGAR}</Text>
                        <View style={{backgroundColor:VERDE_CLARO,flex:1}}>

                        <View style={{backgroundColor:BEIGE,flex:1,}}>

                        
                        </View> 



                        <View style={styles.aligncenter}>
                                <Button
                                    title={AGREGAR_CUPON}
                                    onPressed={() => navigation.navigate('Agregar')}
                                />
                            </View>
                        </View> 

                   

                     
                
                </View>
                



                </ImageBackground>
               
            </View>
                    
        </>
    );
};
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    container: { 
        justifyContent: 'center',
        backgroundColor: WHITE,
    },
    formContainer: { 
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        backgroundColor: '#FFFFFF',
    },
    titleStyle: {
        color: RED,
        fontFamily:'poppinsRegular',
    },
    spinnerTextStyle: {
        color: '#FFFFFF',
    },
    contenedorPantalla: { 
        flexDirection: 'column', 
    },
    containeracc: {  
        width:'100%', 
        backgroundColor:VERDE_CLARO,
        alignItems:'center',
        alignContent: 'center', 
        alignSelf: 'center', 
        flexDirection: 'row',
    },
    textView: { alignItems: 'center', marginBottom: 5,marginTop:30,flex:1,flexDirection:'row' },
    textPrimary: {
        fontSize: SIZE_TYPE.big,
        textAlign: 'center',
        width: '100%',
        marginTop: 30, 
    },
    losePassword: {
        color: BLACK, 
        fontSize:15,
        fontFamily:'poppinsRegular',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        marginBottom: 30,
        marginTop: 5,
    }, 
    aligncenter: {
        marginHorizontal:10,
        alignItems: 'center',
    }, 
    containerBton: { 
        marginBottom: '10%', 
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'column',  
    }, 
    SectionStyle: {
        flex: 3,
        top: 45,
    }, 
    registerbuttonStyle: {
        backgroundColor: BEIGE,
        height: 40,
        width: viewportWidth * 0.65,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        marginBottom: 20,
    },
    loginbuttonTextStyle: {
        color: WHITE,
        paddingVertical: 8,
        fontSize: 18,
    },
    registerbuttonTextStyle: {
        color: WHITE,
        paddingVertical: 8,
        fontSize: 18,
    },
    imgStart: {
        width: '70%',
        height: '70%',
        borderRadius: 7,
    },
    registerNow: { 
        fontSize: 15,
        fontFamily:'poppinsRegular',
        textDecorationLine: 'underline',
    },
    donthaveacc: {
        fontSize: 15,
        fontFamily:'poppinsRegular',
    },
});
