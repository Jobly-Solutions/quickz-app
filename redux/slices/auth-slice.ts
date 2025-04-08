import { AuthParams, FirebaseUser } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthParams = {
    authIsReady: true,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<FirebaseUser>) => {
            return {
                authIsReady: false,
                user: action.payload,
            };
        },
        updateUserNameAndEmail: (state, action: PayloadAction<FirebaseUser>) => {
            return {
                authIsReady: false,
                user: action.payload,
            };
        },
        signOut: () => {
            return {
                authIsReady: false,
                user: null,
            };
        },
        updateUserName: (state, action: PayloadAction<string>) => {
            return {
                authIsReady: false,
                user: Object.assign({}, state.user, {
                    displayName: action.payload,
                }),
            };
        }
    },
});

export const { addUser, updateUserNameAndEmail, updateUserName, signOut } = authSlice.actions;

// export const selectToken = (state: RootState) => state.auth.token;

export const authReducer = authSlice.reducer;
