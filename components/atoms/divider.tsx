import React, { FC } from 'react';
import { View } from 'react-native';
type Props = {
    vertical?: number;
    horizontal?: number;
};
export const Divider: FC<Props> = ({ vertical, horizontal }) => (
    <View
        style={{
            width: horizontal ? horizontal : 5,
            height: vertical ? vertical : 5,
        }}
    />
);
