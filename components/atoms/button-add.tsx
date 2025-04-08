import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { F1_18_600_24, F1_20_400_30 } from '@/styles/typography';
import { GREEN, GREEN_3 } from '@/styles/colors';

interface ButtonAddProps {
    text: string;
    onPress: () => void;
    style?: any;
}

export const ButtonAdd: React.FC<ButtonAddProps> = ({ text, onPress, style }) => {
    const styles = { ...ButtonAddStyles, ...style };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.right}>
                <Text style={styles.rightText}>{'+'}</Text>
            </View>
        </TouchableOpacity>
    );
}

const ButtonAddStyles = StyleSheet.create({
    container: {
        /*
        width: 392px;
        height: 56px;
        top: 436px;
        left: 20px;
        gap: 0px;
        border-radius: 100px 0px 0px 0px;
        border: 2px 0px 0px 0px;
        opacity: 0px;
        
        background: #D7FCDD;
        
        border: 2px solid #4BB280
        */
        // width: '100%',
        height: 56,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: GREEN,
        backgroundColor: GREEN_3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        /*
        width: 168.2px;
        height: 27px;
        top: 450px;
        left: 40px;
        gap: 0px;
        opacity: 0px;
        
        font-family: Poppins;
        font-size: 18px;
        font-weight: 600;
        line-height: 27px;
        text-align: left;
        
        background: #4BB280;
        */
        ...F1_18_600_24,
        color: GREEN
    },
    right: {
        /*
        width: 32px;
        height: 32px;
        top: 448px;
        left: 360px;
        gap: 0px;
        opacity: 0px;
        */
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: GREEN,
        alignSelf: 'center',
    },
    rightText: {
        ...F1_20_400_30,
        lineHeight: 28,
        color: GREEN,
        alignSelf: 'center',
    }
});