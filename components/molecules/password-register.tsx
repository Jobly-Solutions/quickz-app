import React, { useState } from 'react';
import {
    Image,
    StyleSheet, Text, TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import validate from 'validate.js';
import { ICONO_OJO } from '@/assets/iconos/index';
import { BLANCO_TITANIO, GRIS_CLARO, NEGRO, RED, VERDE_CLARO } from '@/styles/colors';
import { TextRegisterFieldParamList } from '@/types';
import constraints from '../organisms/constraintsValidation';

const PassRegisterField = ({
    valueError,
    value,
    setValueError,
    setValue,
    topText,
    placeholder,
    icon,  
    visible,
    validation,
    secureTextEntry,
    autoCompleteType,
}: TextRegisterFieldParamList) => {
    const [focus, setFocus] = useState(false);
    const [pass, setpass] = useState(true); 
    const handlepass = () => setpass(() => !pass);

    return (
        <>
            <Text style={styles.topInputText}>{topText}</Text>
            <View style={focus ? styles.inputSection : styles.inputSectionDisable}> 
            {visible ? <>  
                <Image style={focus ? styles.inputIcon : styles.inputIconDisabled} source={icon.name} />  
                    </> :<> 
                    <Image style={{width:0,height:0}} source={icon.name} /> 
                    </> }
                
                <View style={{ flex:1, width:'auto',height:'auto',flexDirection:'row',justifyContent:'flex-start',
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
                    secureTextEntry={pass}
                    autoCompleteType={autoCompleteType}
                />

                </View>
                <TouchableOpacity onPress={() =>{handlepass()}}>
                    <Image style={focus ? styles.inputPassIcon : styles.inputPassDisabled} source={ICONO_OJO} />  
                                </TouchableOpacity>

            </View>
            {valueError !== undefined && valueError.length > 0 ? (
                <Text style={styles.textError}>{valueError[0]}</Text>
            ) : null}
        </>
    );
};

export default PassRegisterField;



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
        fontSize: 20, 
        letterSpacing:0,
        paddingVertical:7,
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
        fontSize: 20, 
        letterSpacing:0,
        paddingVertical:7,
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
        marginLeft:13,
        alignContent: 'center',
        alignSelf: 'center',
    },
    inputPassIcon: {  
        height:32,
        width:32,
        tintColor:VERDE_CLARO, 
        alignContent: 'center',
        alignSelf: 'center',
    },
    inputPassDisabled: {    
        height:32,
        width:32, 
        tintColor:'#54565A',
        alignContent: 'center',
        alignSelf: 'center',
    },
    inputIconDisabled: {     
        height:24,
        width:24,
        marginLeft:13,
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
