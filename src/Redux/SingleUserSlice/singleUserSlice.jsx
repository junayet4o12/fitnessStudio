import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


export const fetchSingleUser = createAsyncThunk('users/fetchUser', async (email) => {
    const axiosPublic = useAxiosPublic()
    const res = await axiosPublic.get(`/users/${email}`)
    return res?.data;
})

const singleUserSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        user: {},
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSingleUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchSingleUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        })
        builder.addCase(fetchSingleUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = {};
            state.error = action.error.message
        })
    }
})



export default singleUserSlice.reducer;