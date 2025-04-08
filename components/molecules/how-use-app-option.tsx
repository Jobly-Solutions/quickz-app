import React from 'react';
import {
    Text,
    TouchableOpacity,
    Pressable,
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
} from 'react-native';
/* import CircleCheckBox, {
    LABEL_POSITION,
    // @ts-ignore
} from 'react-native-circle-checkbox'; */
import {
    BLACK,
    BEIGE,
    WHITE,
    WATERCOLOR_LINK,
    WATERCOLOR_BACKSIDE,
} from '@/styles/colors';
import { IMAGE_HOW_USE_APP_FIRST_BUTTON } from '@/assets/images';
import { AntDesign } from '@expo/vector-icons';
const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window');

export const HowUseAppOption = ({
    isSelected,
    type,
    onSelect,
    onMorePress,
}: {
    isSelected: boolean;
    type: 'habitual' | 'ocasional';
    onSelect: () => void;
    onMorePress?: () => void;
}) => {
    return (
        <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => {}}
        >
            <ImageBackground
                style={styles.backgroundImage}
                imageStyle={styles.imageBackStyle}
                source={IMAGE_HOW_USE_APP_FIRST_BUTTON}
            />
            <View style={styles.subContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.buttonTextStyle}>
                        Usuario {type}
                    </Text>
                    <Pressable
                        onPress={onMorePress}
                        style={styles.link}
                    >
                        <Text style={styles.more_text}>
                            Más Información
                        </Text>
                        <AntDesign
                            name='caretdown'
                            size={16}
                            color={WATERCOLOR_BACKSIDE}
                        />
                    </Pressable>
                </View>
                {/* <CircleCheckBox
                    checked={isSelected}
                    onToggle={onSelect}
                    color={'red'}
                    labelPosition={LABEL_POSITION.RIGHT}
                    label=''
                    outerColor={WATERCOLOR_BACKSIDE}
                    innerColor={WATERCOLOR_BACKSIDE}
                /> */}
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: viewportHeight * 0.19,
        width: viewportWidth * 0.9,
        justifyContent: 'center',
        borderTopEndRadius: 35,
        borderTopLeftRadius: 35,
        alignItems: 'center',
    },
    imageBackStyle: {
        borderRadius: 25,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle: {
        height: viewportHeight * 0.2,
        width: viewportWidth * 0.9,
        borderRadius: 35,
        borderTopEndRadius: 35,
        borderTopLeftRadius: 35,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextStyle: {
        color: BLACK,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 17,
    },
    subContainer: {
        backgroundColor: WHITE,
        width: '100%',
        height: '36%',
        borderColor: BEIGE,
        flexDirection: 'row',
        borderRadius: 25,
        elevation: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    more_text: {
        fontSize: 12,
        textDecorationLine: 'underline',
        marginRight: 2,
        color: WATERCOLOR_LINK,
        fontWeight: 'bold',
    },
    leftContainer: {
        justifyContent: 'center',
    },
});
