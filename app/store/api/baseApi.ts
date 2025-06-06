
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./fatchBaseQuery";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQuery,
    endpoints: () => ({}),
    tagTypes: ['user'],
});