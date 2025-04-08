import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { firestore } from '@/firebase-js/setup';
import { addDocument, AddDocumentParams, deleteDocument, DocumentParams, getDocument, getDocumentList, updateDocument, UpdateDocumentParams } from '@/utils/api-utils';

const db = firestore;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    listMyProducts: builder.query({
      queryFn: async (params) => {
        const data = await getDocumentList(params);
        return { data };
      },
    }),
    getProduct: builder.query({
      query: ({ collection, idCollection, idDoc }: DocumentParams) => getDocument({ collection, idCollection, idDoc }),
    }),
    addProduct: builder.mutation({
      query: ({ collection, idCollection, data }: AddDocumentParams) => addDocument({ collection, idCollection, data })
    }),
    updateProduct: builder.mutation({
      query: ({ collection, idCollection, idDoc, data }: UpdateDocumentParams) => updateDocument({ collection, idCollection, idDoc, data }),
    }),
    deleteProduct: builder.mutation({
      query: ({ collection, idCollection, idDoc }: DocumentParams) => deleteDocument({ collection, idCollection, idDoc })
    }),
  }),
});

export const {
  useLazyListMyProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
