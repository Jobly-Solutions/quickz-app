import { setShopList } from '@/redux/slices/shop-slice';
import { useState } from 'react';
import { useLazyGetShopListQuery } from '@/services/shop-api';
import { useAppDispatch } from './redux';

export const useGetShops = () => {
    const [getList] = useLazyGetShopListQuery();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getShopList = async () => {
        setIsLoading(true);
        await getList()
            .unwrap()
            .then((res) => {
                const { data } = res;
                dispatch(setShopList(data));
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        getShopList,
        isLoading,
        error,
    };
}