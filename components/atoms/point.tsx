import { ICONO_PUNTO } from '@/assets/iconos';
import { BLUE, GRIS_CLARO } from '@/styles/colors';
import { Image, StyleSheet, View } from 'react-native';

interface PointProps {
    active: boolean;
    style?: object;
}

export const Point: React.FC<PointProps> = ({active, style}) => {
    let styles = PointStyles;
    if (style) styles = StyleSheet.flatten([styles, style]);
    
    return (<View style={styles.container}>
        <View style={styles.imageContainer}>
            {active &&<Image style={styles.image} source={ICONO_PUNTO} />}
        </View>
    </View>);
}

const PointStyles = StyleSheet.create({
    container: {},
    imageContainer: {
        height: 20,
        width: 20,
        backgroundColor: GRIS_CLARO,
        marginLeft: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 14,
        width: 14,
        tintColor: BLUE,
    },
});