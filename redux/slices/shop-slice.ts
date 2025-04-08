import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ShopState {
    list: [];
    value: {};
    selected: any;
}

const DEFAULT_STATE: ShopState = {
    list: [],
    value: {},
    selected: {},
};

const initialState: ShopState = DEFAULT_STATE;

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShopList: (state, action: PayloadAction<[]>) => {
            state.list = action.payload;
        },
        setShopValue: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        setShopSelected: (state, action: PayloadAction<any>) => {
            state.selected = action.payload;
        },
    },
});

export const { setShopList, setShopValue, setShopSelected } = shopSlice.actions;

export const selectShopList = (state: RootState) => state.shop.list;
export const selectShopValue = (state: RootState) => state.shop.value;
export const selectShopSelected = (state: RootState) => state.shop.selected;

export const shopReducer = shopSlice.reducer;
