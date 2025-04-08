import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AlertState {
    list: [];
    value: any;
    selected: any;
}

const initialState: AlertState = {
    list: [],
    value: {},
    selected: {},
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlertList: (state, action: PayloadAction<[]>) => {
            state.list = action.payload;
        },
        setAlertValue: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        setAlertSelected: (state, action: PayloadAction<any>) => {
            state.selected = action.payload;
        },
    },
});

export const { setAlertList, setAlertValue, setAlertSelected } = alertSlice.actions;

export const selectAlertList = (state: RootState) => state.alert.list;
export const selectAlertValue = (state: RootState) => state.alert.value;
export const selectAlertSelected = (state: RootState) => state.alert.selected;

export const alertReducer = alertSlice.reducer;
