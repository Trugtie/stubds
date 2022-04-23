import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getDeposites = createAsyncThunk(
    'deposit/getDeposites',
    async () => {
        const { data } = await axios.get(`${API_URL}Hopdongdatcoc`,config)
        return data;
    }
)

// export const deleteDeposit = createAsyncThunk(
//     'deposit/deleteDeposit',
//     async (value) => {
//         const { data } = await axios.delete(`${API_URL}Hopdongdatcoc/${value}`,config)
//         return data;
//     }
// );

// export const addDeposit = createAsyncThunk(
//     'deposit/addDeposit',
//     async (value) => {
//         const { data } = await axios.post(`${API_URL}Hopdongdatcoc`, value,config)
//         return data;
//     }
// );

// export const editDeposit = createAsyncThunk(
//     'deposit/editDeposit',
//     async (value) => {
//         const { data } = await axios.put(`${API_URL}Hopdongdatcoc`, value,config)
//         return data;
//     }
// );

export const depositSlice = createSlice({
    name: "deposit",
    initialState: {
        list: [],
        status: null
    },
    extraReducers: {
        // // addDeposit
        // [addDeposit.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [addDeposit.fulfilled](state, { payload }) {
        //     state.list.push(payload)
        //     state.status = HTTP_STATUS.INSERTED
        // },
        // [addDeposit.rejected](state) {
        //     state.status = HTTP_STATUS.INSERT_FAILED
        // },

        // // editDeposit
        // [editDeposit.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [editDeposit.fulfilled](state, { payload }) {
        //     state.status = HTTP_STATUS.EDITED
        //     const index = state.list.findIndex((item) => item.khid === payload.khid)
        //     if (index >= 0) {
        //         state.list[index] = payload;
        //     }
        // },
        // [editDeposit.rejected](state) {
        //     state.status = HTTP_STATUS.EDIT_FAILED
        // },

        // // deleteDeposit
        // [deleteDeposit.pending](state) {
        //     state.status = HTTP_STATUS.PENDING
        // },
        // [deleteDeposit.fulfilled](state, { payload }) {
        //     state.list = state.list.filter((item) => item.khid !== payload.khid)
        //     state.status = HTTP_STATUS.DELETED
        //     return state
        // },
        // [deleteDeposit.rejected](state, { payload }) {
        //     state.status = HTTP_STATUS.DELETE_FAILED
        //     state.message = payload.message
        // },

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
    }
})
export default depositSlice.reducer;