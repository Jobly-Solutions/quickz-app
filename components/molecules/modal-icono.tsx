import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode; 
  [x: string]: any;
};
export const ModalIcono = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
    backdropOpacity={0.2} 
    
      isVisible={isVisible}
      animationInTiming={400}
      animationOutTiming={400} 
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({cosas}: {cosas: React.ReactNode }) => (
  <View style={styles.header}>
    <View>{cosas}</View>
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
    backgroundColor: '#D7FCDD',
    borderColor: '#38CB89',
    top:10,
    borderWidth: 1.5,
    elevation:5,
    position:'absolute',
    borderRadius: 25,   
    flexDirection:'row',
    width:'100%',
    height:'auto',
    borderStyle: "solid",
  },
  header: {
    backgroundColor: '#38CB89', 
    marginStart:16,
    marginTop:16,
    marginBottom:46,
    alignItems: "center",
    elevation:10,
    borderRadius:20,width:'auto',height:'auto',
    padding:18,
    justifyContent: "center",
  },
  text: { 
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
  },
  body: {
    textAlign: "center",
    justifyContent: "center",width:'auto',height:'auto',
    flex:1,
    flexDirection: "column", 
    paddingStart: 13,
    paddingEnd:5, 
  },
  footer: {
    marginTop:10,
    marginEnd:5,
    justifyContent: 'flex-start',width:'auto',height:'auto',
    alignItems:'flex-start',
    flexDirection: "row",
  },
  tinyLogo: { 
    width: 70, 
    height: 70,
    resizeMode: 'contain',
},
});

ModalIcono.Header = ModalHeader;
ModalIcono.Container = ModalContainer;
ModalIcono.Body = ModalBody;
ModalIcono.Footer = ModalFooter;