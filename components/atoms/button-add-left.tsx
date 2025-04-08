import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ICONO_MAS } from '@/assets/iconos';
import { F1_15_500_22  } from '@/styles/typography';
import { GRAY_6, GRIS_CLARO } from '@/styles/colors';

interface ButtonAddLeftProps {
    text: string;
    onPress: () => void;
    style?: any;
}

export const ButtonAddLeft: React.FC<ButtonAddLeftProps> = ({ text, onPress, style }) => {
    const styles = { ...ButtonAddLeftStyles, ...style };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <Image
                style={styles.image}
                source={ICONO_MAS} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const ButtonAddLeftStyles = StyleSheet.create({
    container: {
        /*
        position: absolute;
        width: 179px;
        height: 27px;
        left: 124px;
        top: 402px;
        */
        // width: 179,
        height: 27,
        borderRadius: 100,
        // borderWidth: 2,
        // borderColor: GRAY_6,
        backgroundColor: GRIS_CLARO,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        alignSelf: 'center',
        gap: 10,
    },
    text: {
        /*
        position: absolute;
        width: 152px;
        height: 27px;
        left: 151px;
        top: 402px;
        
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        
        color: #717171;
        */
        ...F1_15_500_22,
        color: GRAY_6,
    },
    image: {
        /*
        position: absolute;
        width: 18px;
        height: 18px;
        left: 124px;
        top: 406px;
        
        background: url(.png);
        */
        width: 18,
        height: 18,
        alignSelf: 'center',
        alignItems: 'center'
    },
});