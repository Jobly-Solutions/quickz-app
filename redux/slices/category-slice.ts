import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
    categoryList: [],
    categoryListSelected: [],
    category: {},
    categorySelected: {},
    loading: false,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryList: (state, action: PayloadAction<[]>) => ({
            ...state,
            categoryList: action.payload,
        }),
        setCategoryListSelected: (state, action: PayloadAction<[]>) => {
            state.loading = false;
            state.categoryListSelected = action.payload;
        },
        // setCategory: (state, action: PayloadAction<any>) => {
        //     state.loading = false;
        //     state.category = action.payload;
        // },
        setCategory: (state, action: PayloadAction<any>) => ({
            ...state,
            loading: false,
            category: action.payload,
        }),
        setCategorySelected: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.categorySelected = action.payload;
        },
    },
});

export const { 
    setCategoryList,
    setCategoryListSelected,
    setCategory,
    setCategorySelected
} = categorySlice.actions;

export const selectCategoryList = (state: RootState) => state.category.categoryList;
export const selectCategory = (state: RootState) => state.category.categorySelected;

export const categoryReducer = categorySlice.reducer;
