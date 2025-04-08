import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ParkOptionParams } from '@/types';
import { Button } from 'react-native-paper';
import { WATERCOLOR } from '@/styles/colors';
import { TimeLeftBetween } from './time-left-beteween';
import { DateTime } from 'luxon';
export const ParkOption: React.FC<ParkOptionParams> = ({
    distance,
    postEnd,
    compliance,
    onSelect,
}) => {
    const [contactBtnIsLoading, setContactLoading] = React.useState(
        false
    );
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <View style={styles.row}>
                    <Text style={styles.key}>Distancia</Text>
                    <Text style={styles.value}>
                        {distance} metros
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.key}>Tiempo</Text>

                    <TimeLeftBetween
                        inMinutes
                        from={DateTime.now().toSeconds()}
                        to={postEnd}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.key}>Cumplimiento</Text>
                    <Text style={styles.value}>{compliance}%</Text>
                </View>
            </View>
            <View style={styles.column2}>
                <Button
                    mode='contained'
                    color={WATERCOLOR}
                    labelStyle={{ color: 'white', fontSize: 12 }}
                    style={{
                        borderRadius: 19,
                        width: '65%',
                    }}
                    onPress={() => onSelect(setContactLoading)}
                    loading={contactBtnIsLoading}
                >
                    Contactar
                </Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140,
        flexDirection: 'row',
        borderColor: '#d3d0d0',
        elevation: 2,
        marginBottom: 13,
    },
    column: {
        flex: 2,
        justifyContent: 'center',
        paddingLeft: 19,
    },

    column2: {
        justifyContent: 'center',
        flex: 2,
        alignItems: 'flex-end',
        marginRight: '5%',
    },
    row: { flexDirection: 'row', marginBottom: 5 },
    key: {
        marginRight: 9,
        fontWeight: 'bold',
    },
    value: {},
});
