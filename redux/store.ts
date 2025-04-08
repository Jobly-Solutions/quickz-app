import { addressApi } from '@/services/address-api';
import { couponApi } from '@/services/coupon-api';
import { productApi } from '@/services/product-api';
import { shopApi } from '@/services/shop-api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, ConfigureStoreOptions, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { addressReducer } from './slices/address-slice';
import { alertReducer } from './slices/alert-slice';
import { authReducer } from './slices/auth-slice';
import { categoryReducer } from './slices/category-slice';
import { couponReducer } from './slices/coupon-slice';
import { paidMethodReducer } from './slices/paid-method-slice';
import { productReducer } from './slices/product-slice';
import { shopReducer } from './slices/shop-slice';
import { subCategoryReducer } from './slices/sub-category-slice';
import { userReducer } from './slices/user-slice';

const PERSISTED_STATE_KEY = '@redux';

const persistenceMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  try {
    await AsyncStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(store.getState()));
  } catch (error) {
    console.error('Failed to save state to AsyncStorage', error);
  }
  return result;
};

const loadPersistedState = async () => {
  try {
    const persistedState = await AsyncStorage.getItem(PERSISTED_STATE_KEY);
    if (persistedState !== null) {
      return JSON.parse(persistedState);
    }
  } catch (error) {
    console.error('Failed to load state from AsyncStorage', error);
  }
  return undefined;
};

const rootReducer = combineReducers({
  address: addressReducer,
  alert: alertReducer,
  auth: authReducer,
  category: categoryReducer,
  coupon: couponReducer,
  paidMethod: paidMethodReducer,
  product: productReducer,
  shop: shopReducer,
  subCategory: subCategoryReducer,
  user: userReducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [couponApi.reducerPath]: couponApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [shopApi.reducerPath]: shopApi.reducer,
});

export const createStore = (preloadedState?: ConfigureStoreOptions['preloadedState']) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat([
        addressApi.middleware,
        couponApi.middleware,
        productApi.middleware,
        shopApi.middleware,
        persistenceMiddleware,
      ]),
  });
};

export const initializeStore = async () => {
  const preloadedState = await loadPersistedState();
  const store = createStore(preloadedState);
  return store;
};

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
