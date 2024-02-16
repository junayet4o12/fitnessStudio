import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backendUrl } from "../../../BackendUrl/backendUrl";

const baseApiUserGoal = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
  }),

  endpoints: (builder) => ({
    getUserGoal: builder.query({
      query: () => "/user_goal",
    }),
  }),
});

export const { useGetUserGoalQuery } = baseApiUserGoal;

export default baseApiUserGoal;
