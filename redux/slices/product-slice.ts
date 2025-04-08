import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
    myProductList: [],
    productListSelected: [],
    product: {},
    productSelected: {},
    loading: false,
    error: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // getProductList: (state) => {
        //     state.loading = true;
        // },
        setProductList: (state, action: PayloadAction<[]>) => ({
            // state.loading = false;
            // state.productList = action.payload;
            ...state,
            myProductList: action.payload,
        }),
        setProductListSelected: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.productListSelected = action.payload;
        },
        // getProduct: (state) => {
        //     state.loading = true;
        // },
        setProduct: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.product = action.payload;
        },
        setError: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
    // extraReducers: {
    //     [getProducts.pending]: (state) => {
    //         state.loading = true;
    //     }
    // }
});

export const { 
    // getProductList, 
    setProductList,
    setProductListSelected,
    // getProduct,
    setProduct,
    setError
} = productSlice.actions;

export const selectProductList = (state: RootState) => state.product.myProductList;

export const productReducer = productSlice.reducer;
