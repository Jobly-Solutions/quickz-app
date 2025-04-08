import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import validate from 'validate.js';
import constraints from '@/components/organisms/constraintsValidation';
import { BLANCO_TITANIO, GRIS_CLARO, NEGRO, RED, VERDE_CLARO } from '@/styles/colors';
import { TextFieldParamList } from '@/types';

const TextField = ({
    valueError,
    value,
    setValueError,
    setValue,
    topText,
    placeholder,
    icon,
    validation,
    secureTextEntry,
    autoCompleteType,
}: TextFieldParamList) => {
    const [focus, setFocus] = useState(false);
    

    return (
        <>
            <Text style={styles.topInputText}>{topText}</Text>
            <View style={focus ? styles.inputSection : styles.inputSectionDisable}> 
                <Image style={focus ? styles.inputIcon : styles.inputIconDisabled} source={icon.name} /> 
                <View style={{ width:'100%',height:'auto',flexDirection:'row',justifyContent:'flex-start',
        alignContent: 'center',
        alignSelf: 'center',}}>
                <TextInput
                    style={styles.input}
                    onBlur={() =>
                        setValueError(
                            validate.single(
                                value,
                                constraints[validation]
                            ),setFocus(false)
                        ) 
                    }
                    onFocus={() => setFocus(true)}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    underlineColorAndroid='transparent'
                    secureTextEntry={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                />

                </View>
            </View>
            {valueError !== undefined && valueError.length > 0 ? (
                <Text style={styles.textError}>{valueError[0]}</Text>
            ) : null}
        </>
    );
};

export default TextField;



const styles = StyleSheet.create({
    topInputText: {
        color: NEGRO,
        fontSize: 15,
        marginBottom:1,
        fontFamily:'poppinsMedium',
        marginTop: 15,
    },
    textError: {
        color: RED,
        fontSize: 12,
        marginLeft: 10,
        fontFamily:'poppinsRegular',
        fontWeight: 'bold',
    },
    inputSection: {
        marginBottom: 5,
        borderColor: VERDE_CLARO,
        borderWidth: 1.5,
        borderRadius: 10,
        elevation:6, 
        paddingLeft: 13,
        fontSize: 20, 
        letterSpacing:0,
        paddingVertical:10,
        paddingRight: 10,
        height: 'auto', 
        width: '100%', 
        flexDirection: 'row', 
        alignItems:'flex-start', 
        backgroundColor:BLANCO_TITANIO,
    },
    inputSectionDisable: {
        marginBottom: 5, 
        borderRadius: 10,
        elevation:6, 
        paddingLeft: 13,
        fontSize: 20, 
        letterSpacing:0,
        paddingVertical:10,
        paddingRight: 10,
        height: 'auto', 
        width: '100%', 
        flexDirection: 'row', 
        alignItems:'flex-start', 
        backgroundColor:GRIS_CLARO,
    },
    inputIcon: { 
        height:24,
        width:24,
        tintColor:VERDE_CLARO,
        alignContent: 'center',
        alignSelf: 'center',
    },
    inputIconDisabled: {    
        height:24,
        width:24,
        tintColor:'#54565A',
        alignContent: 'center',
        alignSelf: 'center',
    },
      
    input: {
        marginStart:13, 
        height: 'auto',
        alignContent: 'center',
        alignSelf: 'center',
        width: '100%',
        fontFamily:'poppinsRegular',
        fontSize:15, 
        textAlign:'auto',
        textAlignVertical:'bottom',
        alignItems: 'flex-start',
        color: NEGRO,
    }, 
});
