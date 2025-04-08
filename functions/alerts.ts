import { Alert } from 'react-native';
import { STANDARD_ERROR_MESSAGE } from '@/constants/Configurations';
export const showError = () => {
    const { title, body } = STANDARD_ERROR_MESSAGE;
    Alert.alert(title, body);
};
