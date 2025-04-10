
import { UserData } from "../features/userSlice";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `/user/${id}`,
            providesTags: ['user'],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/user/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: ['user'],
        }),
        createUser: builder.mutation({
            query: (newUser: UserData) => ({
                url: '/user',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['user'],
        })
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useCreateUserMutation } = userApi;