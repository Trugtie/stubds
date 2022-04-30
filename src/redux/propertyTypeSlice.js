import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getTypes = createAsyncThunk(
    'propertyType/getTypes',
    async () => {
        const { data } = await axios.get(`${API_URL}loaibd`,config)
        return data;
    }
)

export const propertyTypeSlice = createSlice({
    name: "propertyType",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // getTypes
        [getTypes.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getTypes.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getTypes.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default propertyTypeSlice.reducer;