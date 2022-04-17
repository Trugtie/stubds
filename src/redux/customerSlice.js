import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async () => {
        const { data } = await axios.get(`${API_URL}khachhang`)
        return data;
    }
)

export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        [getCustomers.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getCustomers.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getCustomers.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default customerSlice.reducer;