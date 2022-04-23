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

// export const deleteAssignment = createAsyncThunk(
//     'assignment/deleteAssignment',
//     async (value) => {
//         const { data } = await axios.delete(`${API_URL}hopdongchuyennhuong/${value}`,config)
//         return data;
//     }
// );

// export const addAssignment = createAsyncThunk(
//     'assignment/addAssignment',
//     async (value) => {
//         const { data } = await axios.post(`${API_URL}hopdongchuyennhuong`, value,config)
//         return data;
//     }
// );

// export const editAssignment = createAsyncThunk(
//     'assignment/editAssignment',
//     async (value) => {
//         const { data } = await axios.put(`${API_URL}hopdongchuyennhuong`, value,config)
//         return data;
//     }
// );

export const assignmentSlice = createSlice({
    name: "assignment",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // // addAssignment
        // [addAssignment.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [addAssignment.fulfilled](state, { payload }) {
        //     state.list.push(payload)
        //     state.status = HTTP_STATUS.INSERTED
        // },
        // [addAssignment.rejected](state) {
        //     state.status = HTTP_STATUS.INSERT_FAILED
        // },

        // // editAssignment
        // [editAssignment.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [editAssignment.fulfilled](state, { payload }) {
        //     state.status = HTTP_STATUS.EDITED
        //     const index = state.list.findIndex((item) => item.khid === payload.khid)
        //     if (index >= 0) {
        //         state.list[index] = payload;
        //     }
        // },
        // [editAssignment.rejected](state) {
        //     state.status = HTTP_STATUS.EDIT_FAILED
        // },

        // // deleteAssignment
        // [deleteAssignment.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [deleteAssignment.fulfilled](state, { payload }) {
        //     state.list = state.list.filter((item) => item.khid !== payload.khid)
        //     state.status = HTTP_STATUS.DELETED
        //     return state
        // },
        // [deleteAssignment.rejected](state, { payload }) {
        //     state.status = HTTP_STATUS.DELETE_FAILED
        //     state.message = payload.message
        // },

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
    }
})
export default assignmentSlice.reducer;