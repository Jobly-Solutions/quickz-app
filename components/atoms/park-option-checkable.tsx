import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ParkOptionCheckableParams } from '@/types';
import { TimeLeftBetween } from './time-left-beteween';
import { DateTime } from 'luxon';
import { Checkbox } from './checkbox';

export const ParkOptionCheckable: React.FC<ParkOptionCheckableParams> =
    ({ checked, distance, postEnd, compliance, onPressed }) => {
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
                        <Text style={styles.value}>
                            {compliance}%
                        </Text>
                    </View>
                </View>
                <View style={styles.column2}>
                    <Checkbox checked={checked} onPress={onPressed} />
                </View>
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 140, 
        flexDirection: 'row',
        borderWidth:2,
        borderColor: '#747474',
        borderRadius:5,
        elevation: 4,
        backgroundColor:'#ffff',
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
