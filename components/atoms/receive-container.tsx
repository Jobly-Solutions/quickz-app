import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';
//@ts-ignore
// import CircleCheckBox from 'react-native-circle-checkbox';
import {
    WATERCOLOR_LINK,
    WATERCOLOR_BACKSIDE,
} from '@/styles/colors';
import { Card } from 'react-native-paper';
type ReceiveContainerParams = {
    title: string;
    checked: boolean;
    onMorePress: () => void;
    setter: () => void;
};

export const ReceiveContainer: React.FC<ReceiveContainerParams> = ({
    title,
    checked,
    onMorePress,
    setter,
}) => {
    return (
        <Card style={RCs.card} elevation={6}>
            <View style={RCs.container}>
                <View style={RCs.column_one}>
                    <Text style={RCs.title}>{title}</Text>
                    <Pressable
                        onPress={onMorePress}
                        style={RCs.link}
                    >
                        <Text style={RCs.more_text}>
                            Más Información
                        </Text>
                        <AntDesign
                            name='caretdown'
                            size={16}
                            color={WATERCOLOR_BACKSIDE}
                        />
                    </Pressable>
                </View>
                <View style={RCs.column_two}>
                    {/* <CircleCheckBox
                        checked={checked}
                        onToggle={() => {
                            if (!checked) setter();
                        }}
                        label=''
                        outerColor={WATERCOLOR_BACKSIDE}
                        innerColor={WATERCOLOR_BACKSIDE}
                    /> */}
                </View>
            </View>
        </Card>
    );
};
const RCs /*tyles*/ = StyleSheet.create({
    card: {
        width: '90%',
        height: 105,
        borderRadius: 18,
        marginBottom: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    column_one: {
        width: '80%',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: 15,
    },
    column_two: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    more_text: {
        fontSize: 13,
        textDecorationLine: 'underline',
        marginRight: 2,
        color: WATERCOLOR_LINK,
        fontWeight: 'bold',
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
