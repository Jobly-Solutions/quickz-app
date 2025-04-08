import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
    subCategoryList: [],
    subCategoryListSelected: [],
    subCategory: {},
    subCategorySelected: {},
    loading: false,
};

export const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState,
    reducers: {
        setSubCategoryList: (state, action: PayloadAction<[]>) => ({
            ...state,
            subCategoryList: action.payload,
        }),
        setSubCategoryListSelected: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.subCategoryListSelected = action.payload;
        },
        setSubCategory: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.subCategory = action.payload;
        },
        setSubCategorySelected: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.subCategorySelected = action.payload;
        }
    },
});

export const { 
    setSubCategoryList,
    setSubCategoryListSelected,
    setSubCategory,
} = subCategorySlice.actions;

export const selectSubCategoryList = (state: RootState) => state.subCategory.subCategoryList;
export const selectSubCategory = (state: RootState) => state.subCategory.subCategoryListSelected;

export const subCategoryReducer = subCategorySlice.reducer;
