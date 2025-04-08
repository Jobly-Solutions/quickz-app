import { ButtonAdd } from '@/components/atoms/button-add';
import { ItemRowTitlesButton } from '@/components/atoms/item-row-titles-button';
import { Titles } from '@/components/atoms/titles';
import { Confirm } from '@/components/organisms/confirm';
import { Screen } from '@/components/templates/screen';
import { setAddressValue } from '@/redux/slices/address-slice';
import { RootState } from '@/redux/store';
import { useLazyGetAddressQuery } from '@/services/address-api';
import { Store } from '@/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const TITLE = '¿Dónde te encuentras?';
const SUBTITLE = 'Mis direcciones';
const ELIMINAR = 'Eliminar';
const ADD_ADDRESS = 'Agregar dirección';
const MY_ADDRESSES = 'Mis direcciones';

export function AddressesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [getAddress] = useLazyGetAddressQuery();
  const user = useSelector((state: Store) => state.auth.user);
  const address = useSelector((state: RootState) => state.address.value);
  const addresses = [
    address,
    { id: '0', address: 'Dirección agregada', depto: 'Country' }
  ]
  const BODY = `¿Estás seguro que deseas eliminar la dirección “${selectedAddress.title}”?`;

  const handleAddAddress = () => navigation.navigate('TipoBarrio');
  const handleDeleteAddress = () => {
    // TODO: delete address
    setConfirmVisible(false)
  };

  const handleItemPress = (item: any) => {
    setSelectedAddress(item);
    setConfirmVisible(true);
  };

  const renderItem = ({ item }) => {
    const address = {
      id: item.id,
      title: item.address,
      subTitle: item.depto,
      button: ELIMINAR,
      selected: item.id !== '0'
    }
    return (<ItemRowTitlesButton
      item={address}
      onPress={handleItemPress}
    />
    );
  }

  useFocusEffect(
    useCallback(() => {
      getAddress(user.uid)
        .unwrap()
        .then(data =>
          dispatch(setAddressValue({
            id: data?.id,
            address: data?.user_address,
            depto: data?.user_depto
          }))
        );
    }, [])
  );
  
  return (<Screen title={MY_ADDRESSES} help>
    <Titles title={TITLE} subTitle={SUBTITLE} />
    <FlatList
      style={{ marginBottom: 20 }}
      data={addresses}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.address + index}
    />
    <ButtonAdd text={ADD_ADDRESS} onPress={handleAddAddress} />
    <Confirm
      isVisible={confirmVisible}
      title={'Consulta'}
      body={BODY}
      onAccept={handleDeleteAddress}
      onCancel={() => setConfirmVisible(false)}
    />
  </Screen>
  );
}
