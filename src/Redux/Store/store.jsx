import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from '../FeedbackSlice/FeedbackSlice'
const store = configureStore({
    reducer: {
        feedback: feedbackReducer
    }
})
export default store;