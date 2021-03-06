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
        try {
            const { data } = await axios.delete(`${API_URL}hopdongkygui/${value}`, config)
            return data;
        } catch (error) {
            throw new Error(error.response.data)
        }
    }
);

export const addConsignment = createAsyncThunk(
    'consignment/addConsignment',
    async (value) => {
        try {
            const { data } = await axios.post(`${API_URL}hopdongkygui`, value, config)
            return data;
        } catch (error) {
            throw new Error(error.response.data)
        }
    }
);

export const consignmentSlice = createSlice({
    name: "consignment",
    initialState: {
        list: [],
        status: null,
        message: null
    },
    reducers: {
        setState: (state) => {
            state.status = HTTP_STATUS.FULFILLED
            state.message = null
        },
        setInserted: (state) => {
            state.status = HTTP_STATUS.INSERTED
        }
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
        [addConsignment.rejected](state, error) {
            state.status = HTTP_STATUS.INSERT_FAILED
            state.message = error.error.message
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
        [deleteConsignment.rejected](state, error) {
            state.status = HTTP_STATUS.DELETE_FAILED
            state.message = error.error.message
        },

        // getConsignments
        [getConsignments.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getConsignments.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
            state.message=null
        },
        [getConsignments.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export const { setState, setInserted } = consignmentSlice.actions;
export default consignmentSlice.reducer;