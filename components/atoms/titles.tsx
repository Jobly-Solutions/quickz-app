import { VERDE_LINDO } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { F1_18_600_24 } from '@/styles/typography';
import { StyleSheet, Text, View } from 'react-native';

interface TitlesProps {
    title: string;
    subTitle: string;
    style?: any;
}

export const Titles: React.FC<TitlesProps> = ({ title, subTitle, style }) => {
    const styles = { ...TitlesStyles, ...style };

    return (<View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subTitleText}>{subTitle}</Text>
    </View>);
}

const TitlesStyles = StyleSheet.create({
    container:{
        // marginBottom: 20
    },
    titleText: {
        /*
        width: 295px;
        height: 38px;
        top: 185px;
        left: 22px;
        gap: 0px;
        opacity: 0px;
        
        font-family: Poppins;
        font-size: 25px;
        font-weight: 700;
        line-height: 37.5px;
        text-align: left;
        
        background: #000000;
        */
        ...estilos.textTitulo,
    },
    subTitleText: {
        /*
        width: 161px;
        height: 24px;
        top: 227px;
        left: 26px;
        gap: 0px;
        opacity: 0px;
        
        font-family: Poppins;
        font-size: 20px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0.01em;
        text-align: left;
        
        background: #48C288;
        */
        ...F1_18_600_24,
        // marginLeft: 10,
        color: VERDE_LINDO
    },
});