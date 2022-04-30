import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

export const getCities = createAsyncThunk(
    'property/getCities',
    async () => {
        const { data } = await axios.get(`https://provinces.open-api.vn/api`)
        return data;
    }
)

export const getDistricts = createAsyncThunk(
    'property/getDistricts',
    async (value) => {
        const { data } = await axios.get(`https://provinces.open-api.vn/api/p/${value}?depth=2`)
        return data;
    }
)

export const getWards = createAsyncThunk(
    'property/getWards',
    async (value) => {
        const { data } = await axios.get(`https://provinces.open-api.vn/api/d/${value}?depth=2`)
        return data;
    }
)


export const citySlice = createSlice({
    name: "city",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // getCities
        [getCities.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getCities.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getCities.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default citySlice.reducer;