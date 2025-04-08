import { BLUE, GRAY_7 } from '@/styles/colors';
import { F1_15_400_22 } from '@/styles/typography';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RadioButtonProps {
    label1: string;
    label2: string;
    selected: number;
    onPress: (value: number) => void;
    vertical?: boolean;
    style?: any;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ label1, label2, selected, onPress, vertical, style }) => {
    const styles = { ...RadioButtonStyles, ...style };
    const [selectedValue, setSelectedValue] = React.useState(selected);
    const handleOnPress = (index) => {
        setSelectedValue(index);
        onPress(index);
    };

    const Item = ({ label, index }) => (
        <View style={vertical ? styles.itemVertical : styles.item}>
            <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleOnPress(index)}>
                <View
                    style={index === selectedValue ? styles.check : styles.unCheck}
                />
            </TouchableOpacity>
            <Text style={[
                styles.text,
                index === selectedValue && styles.textCheck
            ]}>{label}</Text>
        </View>
    );

    useEffect(() => {
        setSelectedValue(selected);
    }, [selected]);

    return (
        <View style={vertical ? styles.containerVerical : styles.container}>
            <Item label={label1} index={1} />
            <Item label={label2} index={2} />
        </View>
    );
};

const RadioButtonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        alignSelf: 'center',
        marginBottom: 20,
    },
    containerVerical: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 20,
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    itemVertical: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        gap: 10,
    },
    radioButton: {
        height: 22,
        width: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: GRAY_7,
    },
    textCheck: {
        color: BLUE,
    },
    check: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: GRAY_7,
        backgroundColor: BLUE,
    },
    unCheck: {
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    text: {
        ...F1_15_400_22,
    }
});
