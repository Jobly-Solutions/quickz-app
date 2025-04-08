import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface PaidMethodState {
    list: [];
    value: any;
    selected: any;
}

const initialState: PaidMethodState = {
    list: [],
    value: {},
    selected: {},
};

export const paidMethodSlice = createSlice({
    name: 'paidMethod',
    initialState,
    reducers: {
        setPaidMethodList: (state, action: PayloadAction<[]>) => {
            state.list = action.payload;
        },
        setPaidMethodValue: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        setPaidMethodSelected: (state, action: PayloadAction<any>) => {
            state.selected = action.payload;
        },
    },
});

export const { setPaidMethodList, setPaidMethodValue, setPaidMethodSelected } = paidMethodSlice.actions;

export const selectPaidMethodList = (state: RootState) => state.paidMethod.list;
export const selectPaidMethodValue = (state: RootState) => state.paidMethod.value;
export const selectPaidMethodSelected = (state: RootState) => state.paidMethod.selected;

export const paidMethodReducer = paidMethodSlice.reducer;
