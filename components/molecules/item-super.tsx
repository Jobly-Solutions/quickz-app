import React from 'react';
import { StyleSheet, View, Text,Image, Button, ImageSourcePropType } from 'react-native';
import RNModal from 'react-native-modal';
import { WHITE } from '@/styles/colors';
type ModalProps = {  
  imagen: ImageSourcePropType;
  titulo: string;  
  distancia: string;  
  direccion: string;  
  estrella: string;  
  modo: string;  
};
export const ItemSuper = ({ 
  imagen,
  titulo,  
  distancia,  
  direccion,  
  estrella,  
  modo, 
}: ModalProps) => {
  return (
    <RNModal >
      <View style={styles.body}>
        <View> 
        <Image style={{
          width:40,height:40,
        }} source={imagen} />
        <Text style={{
                color: 'white',
                width: '10%',
                height: '10%',
                fontWeight: 'bold',
                fontSize: 12,}}>{titulo}</Text>
                <Text style={{
                        color: 'white',
                        width: '10%',
                        height: '10%',
                        fontWeight: 'bold',
                        fontSize: 12,}}>{distancia}</Text>
                        <Text style={{
                                color: 'white',
                                width: '10%',
                                height: '10%',
                                fontWeight: 'bold',
                                fontSize: 12,}}>{direccion}</Text>
                                <Text style={{
                                        color: 'white',
                                        width: '10%',
                                        height: '10%',
                                        fontWeight: 'bold',
                                        fontSize: 12,}}>{estrella}</Text>
                                        <Text style={{
                                                color: 'white',
                                                width: '10%',
                                                height: '10%',
                                                fontWeight: 'bold',
                                                fontSize: 12,}}>{modo}</Text>
        </View>

        </View>
    </RNModal>
  );
};  
const styles = StyleSheet.create({
   
  body: {
    width:120,
    height:60,
    margin:5,
    elevation:6,
    backgroundColor:WHITE,
    borderRadius:18,
    flexDirection:'column',
  },
   
});