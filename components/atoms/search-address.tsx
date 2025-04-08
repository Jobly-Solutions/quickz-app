import { GOOGLE_PLACES_API_KEY } from '@/constants/Configurations';
import React from 'react';
import {
    GooglePlaceData,
    GooglePlaceDetail,
    GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

export const GooglePlacesInput: React.FC<{
    onRouteSelected: (
        data: GooglePlaceData,
        details: GooglePlaceDetail | null
    ) => void;
}> = ({ onRouteSelected }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Ej: Calle Las Mercedes'
            onPress={onRouteSelected}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'es',
            }}
            fetchDetails
            numberOfLines={4}
            enablePoweredByContainer={false}
            styles={{
                container: {
                    width: '100%',
                    position: 'absolute',
                    height: '100%',
                    paddingTop: 80,
                },
                textInputContainer: {
                    backgroundColor: 'transparent',
                    width: '90%',
                    marginLeft: '5%',
                },
                textInput: {
                    elevation: 3,
                    borderColor: '#ebebeb',
                    borderRadius: 12,
                },
                separator: {
                    height: 0,
                },
            }}
        />
    );
};
