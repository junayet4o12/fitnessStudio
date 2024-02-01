import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "../FeedbackSlice/FeedbackSlice";
import singleUserReducer from "../SingleUserSlice/singleUserSlice";
import baseApi from "../../Pages/TrackProgress/api/baseApi";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    user: singleUserReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
export default store;
