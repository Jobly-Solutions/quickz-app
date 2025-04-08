import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RNModal from 'react-native-modal';
import { WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { ICONO_SALIR } from '@/assets/iconos/index';
import { GRIS_OSCURO } from '@/styles/colors';
type ModalProps = { 
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const Modal = ({ 
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={400}
      {...props}>
      {children}
    </RNModal>
  );
}; 
const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title , onPress }: { title: string ,onPress:()=> void }) => (
  <View style={{flexDirection:'column'}}>
    <View style={{
      flexDirection:'row',
    paddingTop:18,
    paddingBottom:5,
    paddingHorizontal:30,}}>
    <Text style={estilos.tituloDialogo}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
                            <Image style={estilos.botonCerrar} source={ICONO_SALIR} />
                                </TouchableOpacity> 
                                
  </View>
    <View style={{width:'100%',height:1,backgroundColor:GRIS_OSCURO,marginVertical:10,}}/>
  </View>
  
);

const ModalHeaderTakeaway = ({ title , onPress }: { title: string ,onPress:()=> void }) => (
  <View style={{flexDirection:'column'}}>
    <View style={{
      flexDirection:'row',
    paddingTop:18,
    paddingBottom:5,
    paddingHorizontal:30,}}>
    <Text style={estilos.tituloDialogo2}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
                            <Image style={estilos.botonCerrar} source={ICONO_SALIR} />
                                </TouchableOpacity> 
                                
  </View>
    <View style={{width:'100%',height:1,backgroundColor:GRIS_OSCURO,marginVertical:10,}}/>
  </View>
  
);

const ModalHeaderDelivery = ({ title , onPress }: { title: string ,onPress:()=> void }) => (
  <View style={{flexDirection:'column'}}>
    <View style={{
      flexDirection:'row',
    paddingTop:18,
    paddingBottom:5,
    paddingHorizontal:30,}}>
    <Text style={estilos.tituloDialogo2}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
                            <Image style={estilos.botonCerrar} source={ICONO_SALIR} />
                                </TouchableOpacity> 
                                
  </View>
    <View style={{width:'100%',height:1,backgroundColor:GRIS_OSCURO,marginVertical:10,}}/>
  </View>
  
);

const ModalHeaderCarrito = ({ title , onPress }: { title: string ,onPress:()=> void }) => (
  <View style={{flexDirection:'column'}}>
    <View style={{
      flexDirection:'row',
    paddingTop:18,
    paddingBottom:5,
    paddingHorizontal:30,}}>
    <Text style={estilos.tituloDialogoCarrito}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
                            <Image style={estilos.botonCerrar} source={ICONO_SALIR} />
                                </TouchableOpacity> 
                                
  </View>
    <View style={{width:'100%',height:1,backgroundColor:GRIS_OSCURO,marginVertical:10,}}/>
  </View>
  
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal:15,
    backgroundColor:WHITE,
    borderRadius: 13, 
  },
  header: {
    flexDirection:'row'
  },
  text: { 
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {  
    marginTop:13,
    marginBottom:10,
    flexDirection: 'row',
  },
});

Modal.Header = ModalHeader;
Modal.HeaderTakeaway = ModalHeaderTakeaway;
Modal.HeaderDeliveryFinalizado = ModalHeaderDelivery;
Modal.HeaderCarrito = ModalHeaderCarrito;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;