import { GRAY_4, GRAY_5, GRIS_CLARO, VERDE_LINDO } from '@/styles/colors';
import { F1_16_400_24, F1_20_600_24 } from '@/styles/typography';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ItemRowTitlesButtonProps {
    item: {
        id: string,
        title: string,
        subTitle: string,
        button: string,
        selected: boolean,
    },
    onPress: () => void,
    style?: any,
}

export const ItemRowTitlesButton: React.FC<ItemRowTitlesButtonProps> = ({ item, onPress, style }) => {
    const styles = { ...ItemRowTitlesButtonStyles, ...style };
    const isSelected = item.selected;

    return (<View style={styles.container} key={item.tite}>
        <View>
            <Text style={[
                styles.titleRowText,
                isSelected && styles.selected
            ]}>
                {item.title}
            </Text>
            <Text style={[
                styles.subTitleRowText,
                isSelected && styles.selected
            ]}>
                {item.subTitle}
            </Text>
        </View>
        <TouchableOpacity onPress={()=>{onPress(item)}}>
            <Text style={styles.buttonText}>{item.button}</Text>
        </TouchableOpacity>
    </View>);
}

const ItemRowTitlesButtonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: GRIS_CLARO,
        paddingVertical: 10,
    },
    titleRowText: {
        /*
        width: 126px;
        height: 30px;
        top: 278px;
        left: 26px;
        gap: 0px;
        opacity: 0px;
        
        font-family: Poppins;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        text-align: left;
        
        background: #48C288;
        
        background: #C2C2C2;
        */
        ...F1_20_600_24,
        color: GRAY_4
    },
    subTitleRowText: {
        /*
        width: 89px;
        height: 24px;
        top: 300px;
        left: 26px;
        gap: 0px;
        opacity: 0px;
        
        font-family: Poppins;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
        
        background: #48C288;
        
        background: #C2C2C2;
        */
        ...F1_16_400_24,
        color: GRAY_4
    },
    buttonRowText: {
        /*
        width: 89px;
        height: 24px;
        top: 300px;
        left: 310px;
        gap: 0px;
        opacity: 0px;
        
        font-family: Poppins;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: right;
        
        background: #6C6C6C;
        */
        ...F1_16_400_24,
        color: GRAY_5,
    },
    selected: { color: VERDE_LINDO },
});