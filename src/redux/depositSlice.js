import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getDeposites = createAsyncThunk(
    'deposit/getDeposites',
    async () => {
        const { data } = await axios.get(`${API_URL}hopdongdatcoc`, config)
        return data;
    }
)

export const getDeposit = createAsyncThunk(
    'deposit/getDeposites',
    async (value) => {
        const { data } = await axios.get(`${API_URL}hopdongdatcoc/${value}`, config)
        return data;
    }
)

export const deleteDeposit = createAsyncThunk(
    'deposit/deleteDeposit',
    async (value) => {
        try {
            const { data } = await axios.delete(`${API_URL}hopdongdatcoc/${value}`, config)
            return data;
        } catch (error) {
            throw new Error(error.response.data)
        }
    }
);

export const addDeposit = createAsyncThunk(
    'deposit/addDeposit',
    async (value) => {
        try {
            const { data } = await axios.post(`${API_URL}hopdongdatcoc`, value, config)
            return data;
        } catch (error) {
            throw new Error(error.response.data)
        }
    }
);

export const depositSlice = createSlice({
    name: "deposit",
    initialState: {
        list: [],
        status: null,
        message: null
    },
    reducers: {
        setState: (state) => {
            state.status = HTTP_STATUS.FULFILLED
            state.message = null
        }
    },
    extraReducers: {
        // addDeposit
        [addDeposit.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addDeposit.fulfilled](state, { payload }) {
            state.list.push(payload)
            state.status = HTTP_STATUS.INSERTED
        },
        [addDeposit.rejected](state,error) {
            state.status = HTTP_STATUS.INSERT_FAILED
            state.message = error.error.message
        },

        // deleteDeposit
        [deleteDeposit.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteDeposit.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.dcid !== payload.dcid)
            state.status = HTTP_STATUS.DELETED
            return state
        },
        [deleteDeposit.rejected](state, error) {
            state.status = HTTP_STATUS.DELETE_FAILED
            state.message = error.error.message
        },

        // getDeposites
        [getDeposites.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getDeposites.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getDeposites.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },

        // getDeposit
        [getDeposit.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getDeposit.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getDeposit.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export const { setState } = depositSlice.actions;
export default depositSlice.reducer;