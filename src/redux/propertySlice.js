import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getProperties = createAsyncThunk(
    'property/getProperties',
    async () => {
        const { data } = await axios.get(`${API_URL}batdongsan`,config)
        return data;
    }
)

// export const deleteProperty = createAsyncThunk(
//     'Property/deleteProperty',
//     async (value) => {
//         const { data } = await axios.delete(`${API_URL}batdongsan/${value}`,config)
//         return data;
//     }
// );

// export const addProperty = createAsyncThunk(
//     'Property/addProperty',
//     async (value) => {
//         const { data } = await axios.post(`${API_URL}batdongsan`, value,config)
//         return data;
//     }
// );

// export const editProperty = createAsyncThunk(
//     'Property/editProperty',
//     async (value) => {
//         const { data } = await axios.put(`${API_URL}batdongsan`, value,config)
//         return data;
//     }
// );

export const propertySlice = createSlice({
    name: "property",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // // addProperty
        // [addProperty.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [addProperty.fulfilled](state, { payload }) {
        //     state.list.push(payload)
        //     state.status = HTTP_STATUS.INSERTED
        // },
        // [addProperty.rejected](state) {
        //     state.status = HTTP_STATUS.INSERT_FAILED
        // },

        // // editProperty
        // [editProperty.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [editProperty.fulfilled](state, { payload }) {
        //     state.status = HTTP_STATUS.EDITED
        //     const index = state.list.findIndex((item) => item.khid === payload.khid)
        //     if (index >= 0) {
        //         state.list[index] = payload;
        //     }
        // },
        // [editProperty.rejected](state) {
        //     state.status = HTTP_STATUS.EDIT_FAILED
        // },

        // // deleteProperty
        // [deleteProperty.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [deleteProperty.fulfilled](state, { payload }) {
        //     state.list = state.list.filter((item) => item.khid !== payload.khid)
        //     state.status = HTTP_STATUS.DELETED
        //     return state
        // },
        // [deleteProperty.rejected](state, { payload }) {
        //     state.status = HTTP_STATUS.DELETE_FAILED
        //     state.message = payload.message
        // },

        // getProperties
        [getProperties.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getProperties.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getProperties.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default propertySlice.reducer;