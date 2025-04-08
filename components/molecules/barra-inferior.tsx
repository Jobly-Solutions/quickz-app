import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import RNModal from 'react-native-modal';
import { ICONO_CARRO, ICONO_COMPRAR, ICONO_HOME, ICONO_PUNTO, ICONO_USER } from '@/assets/iconos';
import { ALERT, VERDE_LINDO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';

type ModalProps = {  
  //presionado:() => void;   
  [x: string]: any;
};
export const BarraInferior = ({ 
  ...props
}: ModalProps) => {
  const navigation = useNavigation(); 
  const [numero, setnumero] = useState('');


  

  return (
    <RNModal 
    {...props}>
      <View style={styles.body}>
        
       
<TouchableOpacity
style={{flex:1,margin:10,backgroundColor:ALERT}}
    onPress={() =>{navigation.navigate('Home'),setnumero('1')}}>

   <Image style={{
        height:40,
        width:40,
        resizeMode:'contain',
        tintColor:VERDE_LINDO,
        alignContent: 'center',
        alignSelf: 'center',}} source={ICONO_HOME} />
   <Image style={estilos.puntoInferior} source={ICONO_PUNTO} />
</TouchableOpacity>
<TouchableOpacity
style={{flex:1,margin:10}}
    onPress={() =>{navigation.navigate('Cupones'),setnumero('2')}}>
   <Image style={estilos.iconosInferior} source={ICONO_COMPRAR} />
</TouchableOpacity>
<TouchableOpacity
style={{flex:1,margin:10}}
    onPress={() =>{navigation.navigate('MiCarro'),setnumero('3')}}>
   <Image style={estilos.iconosInferior} source={ICONO_CARRO} />
</TouchableOpacity>
<TouchableOpacity
style={{flex:1,margin:10}}
    onPress={() =>{navigation.navigate('MisDatos'),setnumero('4')}}>
   <Image style={estilos.iconosInferior} source={ICONO_USER} />
</TouchableOpacity>
 
         
        </View>
    </RNModal>
  );
}; 

const styles = StyleSheet.create({
   
  body: {
    flex:1,
    margin:5,
    elevation:6,
    backgroundColor:WHITE,
    borderRadius:18,
  },
   
});
 