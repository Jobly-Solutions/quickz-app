import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addDocument, AddDocumentParams, deleteDocument, DocumentParams, getDocument, getDocumentList, updateDocument, UpdateDocumentParams } from '@/utils/api-utils';

const collection: string = 'tiendas';
const idCollection: string = '';

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getShop: builder.query({
            //getDoc(doc(db, 'tiendas', idTienda, 'shops', cuponId));
            queryFn: async ({ idCollection, idDoc }: DocumentParams) => {
                const data = await getDocument({ collection, idCollection, idDoc });
                return { data };
            },
        }),
        getShopList: builder.query({
            queryFn: async () => {
                const data = await getDocumentList({ collection, idCollection });
                return { data };
            },
        }),
        addShop: builder.mutation({
            // const tiendasRef = doc(db, 'tiendas', '000001', 'shops', id);
            // const modificarCuponTienda = setDoc(tiendasRef, { shop_quantity: quantity }, { merge: true });
            // const usersRef = doc(db, 'usuarios', uid, 'shops', id);
            // const agregarCuponUser = setDoc(usersRef,
            // {
            //     shop_id: id,
            //     shop_code: id,
            //     shop_description: description,
            //     shop_img: img,
            //     shop_amount: amount,
            //     shop_quantity: 1,
            //     shop_expires_at: expires_at,
            //     shop_created_at: created_at,
            // }, { merge: true });
            query: ({ idCollection, data }: AddDocumentParams) => addDocument({ collection, idCollection, data }),
        }),
        updateShop: builder.mutation({
            query: ({ idCollection, idDoc, data }: UpdateDocumentParams) => updateDocument({ collection, idCollection, idDoc, data }),
        }),
        deleteShop: builder.mutation({
            // deleteDoc(doc(db, 'usuarios', uid, 'shops', id));
            query: ({ idCollection, idDoc }: DocumentParams) => deleteDocument({ collection, idCollection, idDoc }),
        }),
    }),
});

export const {
    useLazyGetShopQuery,
    useLazyGetShopListQuery,
    useAddShopMutation,
    useUpdateShopMutation,
    useDeleteShopMutation
} = shopApi;