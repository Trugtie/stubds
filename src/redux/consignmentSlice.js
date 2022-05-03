import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getConsignments = createAsyncThunk(
    'consignment/getConsignments',
    async () => {
        const { data } = await axios.get(`${API_URL}hopdongkygui`, config)
        return data;
    }
)

export const deleteConsignment = createAsyncThunk(
    'consignment/deleteConsignment',
    async (value) => {
        const { data } = await axios.delete(`${API_URL}hopdongkygui/${value}`, config)
        return data;
    }
);

export const addConsignment = createAsyncThunk(
    'consignment/addConsignment',
    async (value) => {
        const { data } = await axios.post(`${API_URL}hopdongkygui`, value, config)
        return data;
    }
);

export const consignmentSlice = createSlice({
    name: "consignment",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // addConsignment
        [addConsignment.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addConsignment.fulfilled](state, { payload }) {
            state.list.push(payload)
            state.status = HTTP_STATUS.INSERTED
        },
        [addConsignment.rejected](state) {
            state.status = HTTP_STATUS.INSERT_FAILED
        },

        // deleteConsignment
        [deleteConsignment.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteConsignment.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.kgid !== payload.kgid)
            state.status = HTTP_STATUS.DELETED
            return state
        },
        [deleteConsignment.rejected](state, { payload }) {
            state.status = HTTP_STATUS.DELETE_FAILED
        },

        // getConsignments
        [getConsignments.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getConsignments.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getConsignments.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default consignmentSlice.reducer;