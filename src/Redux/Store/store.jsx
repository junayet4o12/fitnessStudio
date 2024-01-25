import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from '../FeedbackSlice/FeedbackSlice'
import singleUserReducer from "../SingleUserSlice/singleUserSlice";
const store = configureStore({
    reducer: {
        feedback: feedbackReducer,
        user: singleUserReducer,
    }
})
export default store;