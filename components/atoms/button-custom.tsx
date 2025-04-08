import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { F1_14_600_21 } from '@/styles/typography';
import { GREEN_1 } from '@/styles/colors';

interface ButtonCustomProps {
    text: string;
    onPress: () => void;
    style?: any;
}

export const ButtonCustom: React.FC<ButtonCustomProps> = ({text, onPress, style}) => {
    let styles = ButtonCustomStyles;
    if (style) styles = { ...styles, ...style};

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const ButtonCustomStyles = StyleSheet.create({
    container: {
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: GREEN_1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        ...F1_14_600_21,
        color: GREEN_1,
        textAlign: 'center',
        includeFontPadding: false,
    }
});
