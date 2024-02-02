import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const originalDate = new Date();
const formattedDate = `${originalDate.getFullYear()}-${(
  originalDate.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${originalDate.getDate().toString().padStart(2, "0")}`;
console.log(formattedDate);

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.fitbit.com",
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("Authorization");
    //   console.log("Token in prepareHeaders:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        localStorage.removeItem("Authorization");
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTrackPro: builder.query({
      query: () => `/1/user/-/activities/date/${formattedDate}.json`,
    }),
  }),
});

export const { useGetTrackProQuery } = baseApi;

export default baseApi;


