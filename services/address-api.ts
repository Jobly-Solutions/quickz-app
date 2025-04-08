import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { addDocument, AddDocumentParams, deleteDocument, DocumentParams, getData, getDocumentList, updateDocument, UpdateDocumentParams } from '@/utils/api-utils';

const collection: string = 'usuarios';

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAddress: builder.query({
            queryFn: async (id) => {
                const data = await getData(collection, id);
                return { data };
            },
        }),
        getAddressList: builder.query({
            queryFn: async (params) => {
                const data = await getDocumentList(params);
                return { data };
            },
        }),
        addAddress: builder.mutation({
            query: ({ collection, idCollection, data }: AddDocumentParams) => addDocument({ collection, idCollection, data }),
        }),
        updateAddress: builder.mutation({
            query: ({ collection, idCollection, idDoc, data }: UpdateDocumentParams) => updateDocument({ collection, idCollection, idDoc, data }),
        }),
        deleteAddress: builder.mutation({
            query: ({ collection, idCollection, idDoc }: DocumentParams) => deleteDocument({ collection, idCollection, idDoc }),
        }),
    }),
});

export const {
    useLazyGetAddressQuery,
    useLazyGetAddressListQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation
} = addressApi;