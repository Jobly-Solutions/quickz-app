import { Checkbox as RNPCheckbox} from 'react-native-paper';

export function Checkbox ({checked, onPress}) {
  return (
    <RNPCheckbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={onPress}
      color='#49C98B'
    />
  );
};