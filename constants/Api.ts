export const STORE_COLLECTION = 'tiendas';
export const IN_STORE_COLLECTION = 'shop_products';
export const USER_COLLECTION = 'usuarios';
export const IN_USER_COLLECTION = 'user_products';

export const COLLECTION_LIST: Record<string, string> = {
  [STORE_COLLECTION]: IN_STORE_COLLECTION,
  [USER_COLLECTION]: IN_USER_COLLECTION
};