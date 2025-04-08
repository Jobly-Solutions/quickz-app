import { ICONO_FLECHA_ABAJO } from '@/assets/iconos';
import { F1_15_400_16 } from '@/styles/typography';
import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface SelectProps {
  items: { value: string; label: string }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  style?: any;
}

export const Select: React.FC<SelectProps> = ({
  items,
  placeholder,
  onChange,
}) => {
  const [item, setItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (selected) => {
    setItem(selected);
    setModalVisible(false);
    onChange(selected.value);
  };

  return (
    <View
      style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.selectorText} >{item?.label || placeholder}</Text>
        <Image
          style={styles.icon}
          source={ICONO_FLECHA_ABAJO}
        />
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={styles.modalContainer}>
          <View
            style={styles.items}>
            <Text style={styles.modalTitle} >{placeholder}</Text>
            {Object.keys(items).map((key) => {
              return (
                <TouchableOpacity
                  key={items[key].value}
                  onPress={() => handleSelect(items[key])}>
                  <Text style={styles.itemText}>{items[key].label} </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
  },
  selectorText: {
    ...F1_15_400_16,
    color: '#ADADAD',
    includeFontPadding: false,
  },
  icon: {
    width: 18,
    height: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  modalTitle: {
    ...F1_15_400_16,
    color: '#5ED69C',
  },
  items: {
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '100%',
    borderRadius: 12,
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
  },
  itemText: {
    ...F1_15_400_16,
  }

});
