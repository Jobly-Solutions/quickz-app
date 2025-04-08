import { RadioButton } from '@/components/atoms/radio-button';
import { Titles } from '@/components/atoms/titles';
import { Screen } from '@/components/templates/screen';
import { BLACK, GREEN, GRIS_CLARO } from '@/styles/colors';
import { F1_18_600_24 } from '@/styles/typography';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const NOTA_TEXT = "En caso de elegir “dejar en la entrada/recepción” asegurarse de que alguien pueda recibirlo a la brevedad.";

export default function Entrega() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(1); 
  
  const handleRadioButtonPress = (value: number) => {
    setSelected(value);
  };

  return (<>
  <Screen title="Entrega" >
    {/* <View style={styles.container}>
       <View style={estilos.barra_superiod}>
         <Text style={{marginRight: 135, fontFamily: 'poppinsBold', fontSize: 23, color: WHITE}}>Entrega</Text>
         <TouchableOpacity style={{marginLeft: 10}} onPress={() => { navigation.goBack() }}>
           <Image style={estilos.iconosSuperior} source={ICONO_VOLVER}/>
         </TouchableOpacity>
       </View> 
      <View style={{width: '100%', height: '100%', backgroundColor: '#fff', borderTopEndRadius: 30, borderTopStartRadius: 30}}>*/}

        {/* <Text style={{fontFamily: 'poppinsBold', fontSize: 20, marginBottom: 20}}>Detalle de entrega</Text> */}
        <Titles title="Detalle de entrega" subTitle='Seleccionar método'/>

        {/* <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 20}}>
            <Image style={{width: 25, height: 28}} source={ICONO_BOLSA_2} />
            <Text style={{fontFamily: 'poppinsRegular', 
                color: '#6FC06E', 
                fontSize: 18, 
                marginLeft: 15, 
                marginBottom: 5}}>Dejar en mi puerta</Text>
            <Image style={{width: 30, height: 30, marginLeft: 140}} source={ICONO_OKEY}/>
        </View> */}
        <RadioButton label1="Recibir personalmente" label2="Dejar en la entrada/recepción" selected={selected} onPress={handleRadioButtonPress} vertical/>

        <Text style={{fontFamily: 'poppinsMedium', 
            fontSize: 13, 
            width: '100%', 
            // alignSelf: 'center', 
            marginBottom: 10, }}>¿Te gustaría sugerirnos alguna recomendación de entrega?</Text>

        {/* <View style={{width: '90%', alignSelf: 'center', marginBottom: 45}}> */}
            {/* <Text style={{fontFamily: 'poppinsSemiBold', color: BLACK, fontSize: 16}}>Dejar instrucciones de entrega</Text> */}
            <TextInput style={{width: '100%', 
                borderRadius: 10, 
                height: 50, 
                backgroundColor: GRIS_CLARO, 
                padding: 8, 
                fontFamily: 'poppinsRegular', 
                fontSize: 13,
              marginBottom:10}} 
                placeholder={'Ej: Dejar al lado del garage'}/>
        {/* </View> */}
        <Text style={{fontFamily: 'poppinsBold', 
            color: BLACK, 
            fontSize: 15, 
            marginBottom: 10}}>Nota: 
            <Text style={{
              fontFamily: 'poppinsRegular', color: BLACK, fontSize: 15}}>{NOTA_TEXT}</Text></Text>

        <TouchableOpacity style={{
            height: 50,
            borderRadius: 25,
            backgroundColor: GREEN,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            }}>
          <Text style={{
            color: '#fff', 
            ...F1_18_600_24,
          }}>Confirmar</Text>
        </TouchableOpacity>
    {/*  </View>
     </View> */}
  </Screen>
    </>);
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#48c288',
    width: '100%',
    height: '100%'
  }
});