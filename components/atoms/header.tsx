import { Ionicons as Icon } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import { WATERCOLOR_TOP } from '@/styles/colors';
import { HeaderParamList } from '@/types';

export const Header = ({
    navigation,
    title,
    isBackButton,
    disable,
}: HeaderParamList) => {
    const openMenu = () => {
        if (disable) {
            ToastAndroid.show('no disponible', ToastAndroid.SHORT);
            return;
        }
        if (isBackButton) {
            
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            return navigation.goBack();
        }
        
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.openDrawer();
    };
    return (
        <SafeAreaView style={styles.header}>
            <TouchableOpacity
                onPress={openMenu}
                style={styles.icons}
            >
                <Icon
                    name={
                        isBackButton
                            ? 'arrow-back-outline'
                            : 'menu-outline'
                    }
                    size={35}
                    color='#FFFFFF'
                />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: WATERCOLOR_TOP,
    },
    headerTitle: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',

        fontSize: 25,
        color: '#fff',
    },
    icons: {
        marginTop: 10,
        position: 'absolute',
        left: 15,
        top: 15,
    },
});
