import { MARKER_IMAGE } from '@/assets/images';
import React from 'react';
import { Image } from 'react-native';
import { Marker as MKR, LatLng, Point } from 'react-native-maps';

type Props = {
    coordinate: LatLng;
    anchor?: Point;
};

const size = {
    height: 35,
    width: 35,
};
export const Marker: React.FC<Props> = ({ coordinate, anchor }) => {
    return (
        <MKR coordinate={coordinate} anchor={anchor}>
            <Image
                resizeMode='center'
                source={MARKER_IMAGE}
                style={size}
            />
        </MKR>
    );
};
