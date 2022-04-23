import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getRequirements = createAsyncThunk(
    'requirement/getRequirements',
    async () => {
        const { data } = await axios.get(`${API_URL}yeucaukhachhang`,config)
        return data;
    }
)

// export const deleteRequirement = createAsyncThunk(
//     'requirement/deleteRequirement',
//     async (value) => {
//         const { data } = await axios.delete(`${API_URL}yeucaukhachhang/${value}`,config)
//         return data;
//     }
// );

// export const addRequirement = createAsyncThunk(
//     'requirement/addRequirement',
//     async (value) => {
//         const { data } = await axios.post(`${API_URL}yeucaukhachhang`, value,config)
//         return data;
//     }
// );

// export const editRequirement = createAsyncThunk(
//     'requirement/editRequirement',
//     async (value) => {
//         const { data } = await axios.put(`${API_URL}yeucaukhachhang`, value,config)
//         return data;
//     }
// );

export const requirementSlice = createSlice({
    name: "requirement",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // // addRequirement
        // [addRequirement.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [addRequirement.fulfilled](state, { payload }) {
        //     state.list.push(payload)
        //     state.status = HTTP_STATUS.INSERTED
        // },
        // [addRequirement.rejected](state) {
        //     state.status = HTTP_STATUS.INSERT_FAILED
        // },

        // // editRequirement
        // [editRequirement.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [editRequirement.fulfilled](state, { payload }) {
        //     state.status = HTTP_STATUS.EDITED
        //     const index = state.list.findIndex((item) => item.khid === payload.khid)
        //     if (index >= 0) {
        //         state.list[index] = payload;
        //     }
        // },
        // [editRequirement.rejected](state) {
        //     state.status = HTTP_STATUS.EDIT_FAILED
        // },

        // // deleteRequirement
        // [deleteRequirement.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [deleteRequirement.fulfilled](state, { payload }) {
        //     state.list = state.list.filter((item) => item.khid !== payload.khid)
        //     state.status = HTTP_STATUS.DELETED
        //     return state
        // },
        // [deleteRequirement.rejected](state, { payload }) {
        //     state.status = HTTP_STATUS.DELETE_FAILED
        //     state.message = payload.message
        // },

        // getRequirements
        [getRequirements.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getRequirements.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getRequirements.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default requirementSlice.reducer;