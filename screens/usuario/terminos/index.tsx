import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Spinner from 'react-native-loading-spinner-overlay';
import { ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import {
    WHITE
} from '@/styles/colors';
import { estilos } from '@/styles/tema_general';

const { width: viewportWidth } = Dimensions.get('window');

export const TerminosUserScreen = () => {
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
                          <ScrollView endFillColor={WHITE}
                 style={{  
                    position: 'relative',
                 }}>

                         <View style={estilos.barra_superiod}>    
                         <View style={{flex:1,}}>     
                            <TouchableOpacity style={estilos.iconoVolver} onPress={() =>{navigation.goBack()} }>
                            <Image style={estilos.iconoVolver} source={ICONO_VOLVER} />
                                </TouchableOpacity> 
                        <Text style={{
                                
                                fontSize: 20,
                                flex:1,
                                textAlign: 'center',
                                color:WHITE,
                                alignSelf:'center',
                                fontFamily: 'poppinsBold',
                                                    }}>Términos y condiciones</Text> 
                            </View>             
                            
                        </View>

                    <View style={estilos.contenedorPantalla}>
                        <View style={estilos.contenedorVerticalRow}> 
                        <View style={{flex:1}}> 
                        </View> 
                        </View>
                        <View style={{flex:1}}>

                        <Text style={{
        fontSize: 21,
        textAlign: 'left',
        width: '100%',
        marginStart:15,
        marginTop: 20,
        fontFamily: 'poppinsBold',}}>{'Términos y condiciones'}</Text> 
                          
                        <View style={{
        marginHorizontal:10,
        alignItems: 'center',
    }}/>
                      
                        </View> 

                   

                     
                
                </View>
                 </ScrollView>

  
               
                



                </ImageBackground>
               
            </View>
                    
                    
        </>
    );
};
const styles = StyleSheet.create({
    
});
