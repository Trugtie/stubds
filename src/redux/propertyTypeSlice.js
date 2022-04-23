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

// export const deletePropertyType = createAsyncThunk(
//     'propertyType/deletePropertyType',
//     async (value) => {
//         const { data } = await axios.delete(`${API_URL}loaibd/${value}`,config)
//         return data;
//     }
// );

// export const addPropertyType = createAsyncThunk(
//     'propertyType/addPropertyType',
//     async (value) => {
//         const { data } = await axios.post(`${API_URL}loaibd`, value,config)
//         return data;
//     }
// );

// export const editPropertyType = createAsyncThunk(
//     'propertyType/editPropertyType',
//     async (value) => {
//         const { data } = await axios.put(`${API_URL}loaibd`, value,config)
//         return data;
//     }
// );

export const propertyTypeSlice = createSlice({
    name: "propertyType",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // // addPropertyType
        // [addPropertyType.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [addPropertyType.fulfilled](state, { payload }) {
        //     state.list.push(payload)
        //     state.status = HTTP_STATUS.INSERTED
        // },
        // [addPropertyType.rejected](state) {
        //     state.status = HTTP_STATUS.INSERT_FAILED
        // },

        // // editPropertyType
        // [editPropertyType.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [editPropertyType.fulfilled](state, { payload }) {
        //     state.status = HTTP_STATUS.EDITED
        //     const index = state.list.findIndex((item) => item.khid === payload.khid)
        //     if (index >= 0) {
        //         state.list[index] = payload;
        //     }
        // },
        // [editPropertyType.rejected](state) {
        //     state.status = HTTP_STATUS.EDIT_FAILED
        // },

        // // deletePropertyType
        // [deletePropertyType.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [deletePropertyType.fulfilled](state, { payload }) {
        //     state.list = state.list.filter((item) => item.khid !== payload.khid)
        //     state.status = HTTP_STATUS.DELETED
        //     return state
        // },
        // [deletePropertyType.rejected](state, { payload }) {
        //     state.status = HTTP_STATUS.DELETE_FAILED
        //     state.message = payload.message
        // },

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