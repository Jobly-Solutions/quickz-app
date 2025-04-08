import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addDocument, AddDocumentParams, deleteDocument, DocumentParams, getDocument, getDocumentList, updateDocument, UpdateDocumentParams } from '@/utils/api-utils';

const collection: string = 'usuarios';

export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getCoupon: builder.query({
            //getDoc(doc(db, 'tiendas', idTienda, 'coupons', cuponId));
            queryFn: async ({ collection, idCollection, idDoc }: DocumentParams) => {
                const data = await getDocument({ collection, idCollection, idDoc });
                return { data };
            },
        }),
        getCouponList: builder.query({
            //getDocs(query(collection(db, 'usuarios/' + idUser + '/coupons'), orderBy('coupon_created_at')));
            queryFn: async (params) => {
                const data = await getDocumentList(params);
                return { data };
            },
        }),
        addCoupon: builder.mutation({
            // const tiendasRef = doc(db, 'tiendas', '000001', 'coupons', id);
            // const modificarCuponTienda = setDoc(tiendasRef, { coupon_quantity: quantity }, { merge: true });
            // const usersRef = doc(db, 'usuarios', uid, 'coupons', id);
            // const agregarCuponUser = setDoc(usersRef,
            // {
            //     coupon_id: id,
            //     coupon_code: id,
            //     coupon_description: description,
            //     coupon_img: img,
            //     coupon_amount: amount,
            //     coupon_quantity: 1,
            //     coupon_expires_at: expires_at,
            //     coupon_created_at: created_at,
            // }, { merge: true });
            query: ({ collection, idCollection, data }: AddDocumentParams) => addDocument({ collection, idCollection, data }),
        }),
        updateCoupon: builder.mutation({
            query: ({ collection, idCollection, idDoc, data }: UpdateDocumentParams) => updateDocument({ collection, idCollection, idDoc, data }),
        }),
        deleteCoupon: builder.mutation({
            // deleteDoc(doc(db, 'usuarios', uid, 'coupons', id));
            query: ({ collection, idCollection, idDoc }: DocumentParams) => deleteDocument({ collection, idCollection, idDoc }),
        }),
    }),
});

export const {
    useLazyGetCouponQuery,
    useLazyGetCouponListQuery,
    useAddCouponMutation,
    useUpdateCouponMutation,
    useDeleteCouponMutation
} = couponApi;