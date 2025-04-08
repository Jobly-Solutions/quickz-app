import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageSourcePropType,
} from 'react-native';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { BEIGE, WHITE } from '@/styles/colors';

type Props = {
    onPress: () => void;
    image: ImageSourcePropType;
    text: string;
};

export const HomeButton: React.FC<Props> = ({
    onPress,
    image,
    text,
}) => {
    return (
        <TouchableOpacity
            style={styles.touchableWrapper}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <ImageBackground
                imageStyle={styles.withRadius}
                source={image}
                style={styles.container}
            >
                <View style={styles.textWrapper}>
                    <Text style={styles.textWhite}>{text}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    textWhite: {
        color: WHITE,
        alignSelf: 'center',
        paddingVertical: 8,
        fontSize: 18,
    },
    textWrapper: {
        backgroundColor: BEIGE, 
        height: '30%',
        width: '100%',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
    },
    container: { 
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
    },
    touchableWrapper: {
        height: '20%',
        borderRadius: 10,
        width: '90%',
        elevation: 4,
        backgroundColor: '#ffff',
        marginTop: 15,
    },
    withRadius: {
        borderRadius: 10,
    },
});
