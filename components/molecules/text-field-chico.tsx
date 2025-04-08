import { SIZE_TYPE } from '@/styles/typography';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BEIGE, BLACK, RED } from '@/styles/colors';
import { TextFieldFormikParamList } from '@/types';

export const TextFieldChico = ({
    valueError,
    value,
    topText,
    placeholder,
    icon,
    secureTextEntry,
    autoCompleteType,
    onChangeText,
    keyboardType,
    maxLength,
}: TextFieldFormikParamList) => {
    return (
        <> 
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    underlineColorAndroid='transparent'
                    secureTextEntry={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />
                {icon && (
                    <Ionicons
                        name={icon.name}
                        size={icon.size}
                        color={icon.color}
                        style={styles.inputIcon}
                    />
                )}
                {!icon && (
                    <Ionicons
                        name={'card'}
                        size={15}
                        color={'red'}
                        style={styles.inputIcon}
                    />
                )}
            </View>
            <Text style={styles.textError}>{valueError}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    topInputText: {
        color: BLACK,
        fontWeight: 'bold',
        fontSize: SIZE_TYPE.small,
        marginBottom: 1,
    },
    textError: {
        color: RED,
        fontSize: SIZE_TYPE.small,
        marginLeft: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputSection: {
        borderColor: BEIGE,
        backgroundColor: '#ccffff',
        borderWidth: 0.9,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 55,
        paddingRight: 55,
        height: 50,
        width: '100%',
        maxHeight: 50,
        flexDirection: 'row',
    },
    inputIcon: {
        paddingLeft: 55,
        color: BEIGE,
    },
    input: {
        backgroundColor: 'transparent',
        height: 50,
        width: '100%',
        fontSize: 15,
        color: '#424242',
    },
});
