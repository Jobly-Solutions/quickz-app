import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUser() {

    const [id, setId] = useState('');
    
    useEffect(() => {
        (async () => {
            const _id = await AsyncStorage.getItem('@useruid');
            if (_id) setId(_id);
        })();
    }, []);

    return {
        id
    }
}