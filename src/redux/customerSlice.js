import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async () => {
        const { data } = await axios.get(`${API_URL}khachhang`, config)
        return data;
    }
)

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (value) => {
        const { data } = await axios.delete(`${API_URL}khachhang/${value}`, config)
        return data;
    }
);

export const addCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (value) => {
        const { data } = await axios.post(`${API_URL}khachhang`, value, config)
        return data;
    }
);

export const editCustomer = createAsyncThunk(
    'customer/editCustomer',
    async (value) => {
        const { data } = await axios.put(`${API_URL}khachhang`, value, config)
        return data;
    }
);

export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // addCustomer
        [addCustomer.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addCustomer.fulfilled](state, { payload }) {
            state.list.push(payload)
            state.status = HTTP_STATUS.INSERTED
        },
        [addCustomer.rejected](state) {
            state.status = HTTP_STATUS.INSERT_FAILED
        },

        // editCustomer
        [editCustomer.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [editCustomer.fulfilled](state, { payload }) {
            state.status = HTTP_STATUS.EDITED
            const index = state.list.findIndex((item) => item.khid === payload.khid)
            if (index >= 0) {
                state.list[index] = payload;
            }
        },
        [editCustomer.rejected](state) {
            state.status = HTTP_STATUS.EDIT_FAILED
        },


        // deleteCustomer
        [deleteCustomer.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteCustomer.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.khid !== payload.khid)
            state.status = HTTP_STATUS.DELETED
            return state
        },
        [deleteCustomer.rejected](state, { payload }) {
            state.status = HTTP_STATUS.DELETE_FAILED
            state.message = payload.message
        },

        // getCustomer
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