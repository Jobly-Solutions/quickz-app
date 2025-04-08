import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CouponState {
    list: [];
    value: any;
    selected: any;
}

// const emptyCoupon: Coupon = {
//     coupon_id: '',
//     coupon_code: '',
//     coupon_description: '',
//     coupon_img: '',
//     coupon_amount: '',
//     coupon_quantity: 0,
//     coupon_expires_at: 0,
//     coupon_created_at: 'string',
// };

const initialState: CouponState = {
    list: [],
    value: {},
    selected: {},
};

export const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCouponList: (state, action: PayloadAction<[]>) => {
            state.list = action.payload;
        },
        setCouponValue: (state, action: PayloadAction<any>) => {
            state.value = action.payload;
        },
        setCouponSelected: (state, action: PayloadAction<any>) => {
            state.selected = action.payload;
        },
    },
});

export const { setCouponList, setCouponValue, setCouponSelected } = couponSlice.actions;

export const selectCouponList = (state: RootState) => state.coupon.list;
export const selectCouponValue = (state: RootState) => state.coupon.value;
export const selectCouponSelected = (state: RootState) => state.coupon.selected;

export const couponReducer = couponSlice.reducer;
