import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

export const getStaffs = createAsyncThunk(
    'staff/getStaffs',
    async () => {
        const { data } = await axios.get(`${API_URL}nhanvien`)
        return data;
    }
)

export const staffSlice = createSlice({
    name: "staff",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        [getStaffs.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getStaffs.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getStaffs.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default staffSlice.reducer;