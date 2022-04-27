import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getAssignments = createAsyncThunk(
    'assignment/getAssignments',
    async () => {
        const { data } = await axios.get(`${API_URL}hopdongchuyennhuong`,config)
        return data;
    }
)

export const getAssignment = createAsyncThunk(
    'assignment/getAssignments',
    async (value) => {
        const { data } = await axios.get(`${API_URL}hopdongchuyennhuong/${value}`,config)
        return data;
    }
)

export const deleteAssignment = createAsyncThunk(
    'assignment/deleteAssignment',
    async (value) => {
        const { data } = await axios.delete(`${API_URL}hopdongchuyennhuong/${value}`,config)
        return data;
    }
);

export const addAssignment = createAsyncThunk(
    'assignment/addAssignment',
    async (value) => {
        const { data } = await axios.post(`${API_URL}hopdongchuyennhuong`, value,config)
        return data;
    }
);

export const assignmentSlice = createSlice({
    name: "assignment",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // addAssignment
        [addAssignment.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addAssignment.fulfilled](state, { payload }) {
            state.list.push(payload)
            state.status = HTTP_STATUS.INSERTED
        },
        [addAssignment.rejected](state) {
            state.status = HTTP_STATUS.INSERT_FAILED
        },

        // deleteAssignment
        [deleteAssignment.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteAssignment.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.cnid !== payload.cnid)
            state.status = HTTP_STATUS.DELETED
            return state
        },
        [deleteAssignment.rejected](state) {
            state.status = HTTP_STATUS.DELETE_FAILED
        },

        // getAssignments
        [getAssignments.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getAssignments.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getAssignments.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },

        // getAssignment
        [getAssignment.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getAssignment.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getAssignment.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default assignmentSlice.reducer;