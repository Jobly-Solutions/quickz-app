import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInformation, UserState } from '@/types';

// const Types = {
//     ADD: 'user-data/add',
//     RESET: 'user-data/reset',
//     CHANGE_USER_STATE: 'user-data/change-user-state',
// };

const initialState: UserInformation = {
    // id: '',
    balance: 0,
    lastPaymentDate: 0,
    match_status: {
        state: 'not-paired',
        active: false,
        role: 'park_owner',
    },
    carIsRegistered: undefined,
    balance_collaborate: 0,
    balance_promotional: 0,
    location: undefined,
    customerId: undefined,
    numberOfPairings: undefined,
    pairingsCompleted: undefined,
    friendID: undefined,
    balance_collaborate_expired_date: 0,
    balance_promotional_expired_date: 0,
};

export const userSlice = createSlice({
    name: 'user-data',
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<UserInformation>) => {
            return action.payload;
        },
        resetUserData: (state, action: PayloadAction<UserInformation>) => {
            return initialState;
        },
        changeUserState: (state, action: PayloadAction<UserState>) => {
            return Object.assign({}, initialState, {
                userState: action.payload,
            });
        },
        // setProduct: (state, action: PayloadAction<any>) => {
        //     state.userData = action.payload;
        // },
    },
});

export const { addUserData, resetUserData, changeUserState } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user;

export const userReducer = userSlice.reducer;