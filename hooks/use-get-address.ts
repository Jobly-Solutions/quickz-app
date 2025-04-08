import { setAddressList } from '@/redux/slices/address-slice';
import { useState } from 'react';
import { useLazyGetAddressListQuery } from '@/services/address-api';
import { useAppDispatch } from '@/redux';

export const useGetAddress = () => {
    const [getList] = useLazyGetAddressListQuery();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAddressList = async (params) => {
        setIsLoading(true);
        await getList(params)
            .unwrap()
            .then((res) => {
                const { data } = res;
                dispatch(setAddressList(data));
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        getAddressList,
        isLoading,
        error,
    };
}