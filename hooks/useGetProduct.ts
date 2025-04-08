import { useLazyListMyProductsQuery } from '@/services/product-api';
import { useState } from 'react';
import { setProductList } from '@/redux/slices/product-slice';
import { useAppDispatch } from '@/redux';

export const useGetProduct = () => {
    const [listMyProducts] = useLazyListMyProductsQuery();

    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMyProductList = async (params) => {
        setIsLoading(true);
        await listMyProducts(params)
            .unwrap()
            .then((res) => {
                const { data } = res;
                dispatch(setProductList(data));
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        getMyProductList,
        isLoading,
        error,
    };

};
