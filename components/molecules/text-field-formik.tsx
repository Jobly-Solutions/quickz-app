import { scaleSize } from '@/styles/mixins';
import { F1_13_500_16, F1_14_400_21, F1_16_400_20, SIZE_TYPE } from '@/styles/typography';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { BLACK, RED, VERDE_CLARO } from '@/styles/colors';
import { TextFieldFormikParamList } from '@/types';

export const TextField = ({
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
            <Text style={styles.topInputText}>
                {topText ? topText : ''}
            </Text>
            <View style={styles.inputSection}>
                {icon && (<View style={styles.icon}>
                    <Ionicons
                        name={icon.name}
                        size={icon.size}
                        color={icon.color}
                        style={styles.inputIcon}
                    />
                </View>)}
                <TextInput
                    style={[
                        styles.input,
                        (placeholder.length > 36) && styles.inputSmall,
                    ]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    underlineColorAndroid='transparent'
                    secureTextEntry={secureTextEntry}
                    autoCompleteType={autoCompleteType}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />
            </View>
            <Text style={styles.textError}>{valueError}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    topInputText: {
        ...F1_13_500_16,
        marginBottom: scaleSize(10),
        color: BLACK,
    },
    textError: {
        color: RED,
        fontSize: SIZE_TYPE.small,
        marginLeft: scaleSize(10),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputSection: {
        borderColor: '#C4C4C4',
        backgroundColor: '#F1F1F1',
        borderWidth: scaleSize(1),
        borderRadius: scaleSize(8),
        alignItems: 'center',
        paddingHorizontal: scaleSize(10),
        height: scaleSize(50),
        width: '100%',
        flexDirection: 'row',
        gap: scaleSize(10),
    },
    icon: {
        marginTop: scaleSize(-4),
    },
    inputIcon: {
        color: VERDE_CLARO,
    },
    input: {
        ...F1_16_400_20,
        height: scaleSize(50),
        width: '100%',
        color: '#2E2E2E',
    },
    inputSmall: {
        ...F1_14_400_21,
    }
});
