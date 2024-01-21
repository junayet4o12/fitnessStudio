import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "../FeedbackSlice/feedbackSlice";

const store = configureStore({
    reducer: {
        feedback: feedbackReducer
    }
})
export default store;