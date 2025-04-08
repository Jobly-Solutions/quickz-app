import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export const ShowMoney = ({
    value,
    type,
}: {
    value?: number;
    type: string;
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.value}>{value ? value : 0}$</Text>
            <Text style={styles.type}>{type}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    value: {
        color: 'gray',
        fontSize: 50,
    },
    type: {
        fontSize: 0,
    },
});
