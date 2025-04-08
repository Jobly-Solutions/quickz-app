import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';
import { WATERCOLOR_TOP, WHITE } from '@/styles/colors';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode; 
  [x: string]: any;
};
export const WebBrowser = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      style={{
        borderWidth: 0,
        borderColor: WATERCOLOR_TOP,
        margin: 0}}
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
    backgroundColor: WHITE, 
    borderWidth: 2,
    margin: 0,
    borderColor: WATERCOLOR_TOP,
    borderStyle: "solid",
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {  
    textAlign: "center",
    fontSize: 24,
  },
  body: {
    textAlign: "center",
    justifyContent: "center", 
    flexDirection: "row",  
    minHeight: 50,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center", 
    flexDirection: "row",
  },
  tinyLogo: { 
    width: 70, 
    height: 70,
    resizeMode: 'contain',
},
});

WebBrowser.Header = ModalHeader;
WebBrowser.Container = ModalContainer;
WebBrowser.Body = ModalBody;
WebBrowser.Footer = ModalFooter;