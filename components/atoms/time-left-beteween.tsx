import React, { useState, useEffect, FC } from 'react';
import { Text } from 'react-native';

type TimeLeftProps = {
    from: number;
    to: number;
    inMinutes: true;
};

export const TimeLeftBetween: FC<TimeLeftProps> = ({
    from,
    to,
    inMinutes,
}) => {
    const initialTime = Math.trunc(-(from - to) / 60);
    const [timeEnd, setTimeEnd] = useState(false);
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (time < 0 || time == 0) {
                setTimeEnd(true);
                return;
            }
            if (!timeEnd && time - 1 !== 0 && !(time < 0)) {
                setTime(time - 1);
            } else {
                clearInterval(timerId);
                setTimeEnd(true);
            }
        }, 60 * 1000);
        return () => clearInterval(timerId);
    }, [time]);

    if (inMinutes)
        return (
            <Text style={{
                fontSize: 20,}}>
                {!timeEnd ? `${time} minutos` : '(ha terminado)'}
            </Text>
        );
    return <Text>No soportado</Text>;
};
