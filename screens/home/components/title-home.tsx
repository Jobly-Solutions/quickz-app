import { WHITE } from '@/styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TitleHomeProps {
    userAddress: string;
    handlePress: () => void;
}

export function TitleHome({ userAddress, handlePress }: TitleHomeProps) {
    return (
        <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
            <FontAwesome
                name="map-marker"
                size={14}
                color={WHITE}
                style={styles.icon}
            />
            <Text style={[styles.text, userAddress.length < 10 && { fontSize: 20 }]}>
                {userAddress}
            </Text>
            <FontAwesome
                name="caret-down"
                size={14}
                color={WHITE}
                style={styles.icon}
            />
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: WHITE,
        fontFamily: 'poppinsBold',
        marginHorizontal: 10,
    },
    icon: {
        // width: 14,
        // height: 14,
        // alignSelf: 'center',
        marginBottom: 5,
    },
});
