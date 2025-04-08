import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import {
    IMAGE_BACKGROUND_SPLASH_2,
    IMAGE_LOGO_2,
} from '@/assets/images';

export const SplashScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <ImageBackground
                    source={IMAGE_BACKGROUND_SPLASH_2}
                    style={styles.backgroundimage}
                >
                    <Image style={{}} source={IMAGE_LOGO_2} />
                </ImageBackground>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    backgroundimage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
