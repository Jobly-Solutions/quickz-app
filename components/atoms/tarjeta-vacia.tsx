import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import RNModal from 'react-native-modal';
import { WHITE } from '@/styles/colors';
type ModalProps = { 
  children: React.ReactNode; 
};
export const TarjetaVacia = ({ 
  children, 
}: ModalProps) => {
  return (
    <RNModal >
      <View style={styles.body}>{children}</View>
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
 