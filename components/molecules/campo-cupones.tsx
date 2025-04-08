import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { GRAY_11, GRIS_CLARO, GRIS_OSCURO, NEGRO, RED, VERDE_CLARO } from '@/styles/colors';
import { TextCuponParamList } from '@/types';
import { ICONO_NUMERAL } from '@/assets/iconos/index';

const TextCupones = ({ 
    value, 
    setValue, 
    placeholder,
    icon, 
}: TextCuponParamList) => {
    

    return (
        <> 
            <View style={styles.inputSection}> 
            <Image style={{
                width:18,
                height:18, 
                resizeMode:'center', 
                tintColor: GRAY_11,
                marginStart:20,
                }} 
                source={ICONO_NUMERAL}/>
                <TextInput
                    style={styles.input} 
                    maxLength={6} 
                    autoCapitalize={'characters'}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    underlineColorAndroid='transparent' 
                />
            </View>
             
        </>
    );
};

export default TextCupones;



const styles = StyleSheet.create({
    inputSection: {
        marginBottom: 5, 
        borderRadius: 100,
        paddingLeft: 15,
        fontSize: 20,
        paddingRight: 15,
        height: 50, 
        width: '100%',
        flexDirection: 'row', 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:GRIS_CLARO,
    },
    topInputText: {
        color: GRIS_OSCURO,
        fontSize: 15,
        marginBottom:5,
        fontFamily:'poppinsSemiBold',
        marginTop: 16,
    },
    textError: {
        color: RED,
        fontSize: 12,
        marginLeft: 10,
        fontFamily:'poppinsRegular',
        fontWeight: 'bold',
    },
    inputSectionDisable: {
        marginBottom: 5, 
        borderWidth: 0,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        paddingRight: 15,
        // height: '100%', 
        width: '100%',
        maxHeight: 45,
        flexDirection: 'row', 
        alignItems:'flex-start',
        justifyContent:'center',
        backgroundColor:GRIS_CLARO,
    },
    inputIcon: {
        marginStart: 13,    
        height:22,
        width:22,
        tintColor:VERDE_CLARO,
        alignContent: 'center',
        alignSelf: 'center',
    },
    inputIconDisabled: {
        marginStart: 13,    
        height:22,
        width:22,
        tintColor:GRIS_OSCURO,
        alignContent: 'center',
        alignSelf: 'center',
    },
    input: {
        marginStart:5,
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        fontFamily:'poppinsRegular',
        fontSize:15,
        alignItems: 'flex-start',
        color: NEGRO,
    }, 
});
