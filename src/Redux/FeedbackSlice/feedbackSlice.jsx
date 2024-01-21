import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


export const fatchFeedback = createAsyncThunk('FEEDBACKS/fetchFeedback', async () => {
    const axiosPublic = useAxiosPublic()
    const res = await axiosPublic.get('/feedback')
    return res?.data;
})

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        isLoading: false,
        feedback: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fatchFeedback.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fatchFeedback.fulfilled, (state, action) => {
            state.isLoading = false;
            state.feedback = action.payload;
            state.error = null;
        })
        builder.addCase(fatchFeedback.rejected, (state, action) => {
            state.isLoading = false;
            state.feedback = [];
            state.error = action.error.message
        })
    }
})



export default feedbackSlice.reducer;