import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),

  endpoints: (builder) => ({
    getTrackPro: builder.query({
      query: () => "../../../../public/track.json",
    }),
  }),
});

export const {useGetTrackProQuery} = baseApi;

export default baseApi;