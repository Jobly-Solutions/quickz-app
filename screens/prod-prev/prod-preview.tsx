
import { VERDE_CLARO } from '@/styles/colors';
import React from 'react';
import { LayoutAnimation, Platform, SafeAreaView, StyleSheet, UIManager } from 'react-native';

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut, 
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const data = [
    {  
      order_id: "1",
      order_code: "13123",
      order_address: "qweqwe",
      order_created_at: "113",
      order_finished_at: "232",
      order_status: "entregado",
      order_feedback: "adadadasdas",
      order_products_json: "naaa"
    }
  ];

export default function VerProducto() {
  const [persons, setPersons] = React.useState(data);
  
  
    return (
      <SafeAreaView style={styles.container}>
     
     
      </SafeAreaView>
      );
     }
     
    const styles = StyleSheet.create({
      container: {
        backgroundColor:VERDE_CLARO,
        flex: 1, display:'flex',width: '100%',  
        height: '100%',alignContent:'center', justifyContent:'center'
      }, 
    });
