import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AddressState {
    list: [];
    value: any;
    selected: any;
}

const initialState: AddressState = {
    list: [],
    value: {},
    selected: {},
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddressList: (state, action: PayloadAction<[]>) => {
            state.list = action.payload;
        },
        setAddressValue: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        setAddressSelected: (state, action: PayloadAction<any>) => {
            state.selected = action.payload;
        },
    },
});

export const { setAddressList, setAddressValue, setAddressSelected } = addressSlice.actions;

export const selectAddressList = (state: RootState) => state.address.list;
export const selectAddressValue = (state: RootState) => state.address.value;
export const selectAddressSelected = (state: RootState) => state.address.selected;

export const addressReducer = addressSlice.reducer;
