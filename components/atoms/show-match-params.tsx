import { SIZE_TYPE } from '@/styles/typography';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimeLeftBetween } from './time-left-beteween';

type Props = {
    distance: number;
    time: number;
    complicance: number;
};
export const ShowMatchParams: FC<Props> = ({
    distance,
    time,
    complicance,
}) => {
    return (
        <View>
            
            <View style={styles.row}>
                <Text style={{
        fontWeight: 'bold',
        fontSize: SIZE_TYPE.big,}}>Tiempo Restante: </Text>
                <TimeLeftBetween
                    inMinutes
                    from={DateTime.now().toSeconds()}
                    to={time}
                />
            </View>
            <View style={ {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,}}>
                <View style={{
        flexDirection: 'row',
        width:'47%'}}>
                <Text style={styles.key}>Distancia: </Text>
                <Text style={styles.value}>{distance} metros</Text> 
                </View>
                <View style={{
        flexDirection: 'row',
        width:'47%'}}>
                <Text style={styles.key}>Cumplimiento: </Text>
                <Text style={styles.value}>{complicance}%</Text>
                </View>
            </View>
            <View style={styles.row}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    key: {
        fontWeight: 'bold',
        fontSize: SIZE_TYPE.big,
    },
    value: {
        fontSize: 16,
    },
});
