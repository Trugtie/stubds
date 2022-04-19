import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

export const getStaffs = createAsyncThunk(
    'staff/getStaffs',
    async () => {
        const { data } = await axios.get(`${API_URL}nhanvien`)
        return data;
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (value) => {
        const { data } = await axios.delete(`${API_URL}nhanvien/${value}`)
        return data;
    }
);

export const addStaff = createAsyncThunk(
    'staff/addStaff',
    async (value) => {        
        const { data } = await axios.post(`${API_URL}nhanvien`, value)
        return data;
    }
);

export const editStaff = createAsyncThunk(
    'staff/editStaff',
    async (value) => {        
        const { data } = await axios.put(`${API_URL}nhanvien`, value)
        return data;
    }
);

export const staffSlice = createSlice({
    name: "staff",
    initialState: {
        list: [],
        status: null,
        message: null
    },
    extraReducers: {
        // addStaff
        [addStaff.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addStaff.fulfilled](state, { payload }) {            
            state.list.push(payload)
            state.status = HTTP_STATUS.FULFILLED
        },
        [addStaff.rejected](state) {
            state.status = HTTP_STATUS.REJECTED            
        },

        // editStaff
        [editStaff.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [editStaff.fulfilled](state, { payload }) {            
            state.status = HTTP_STATUS.FULFILLED
            const index = state.list.findIndex((item) => item.nvid === payload.nvid)
            if(index >= 0){
                state.list[index] = payload;
            }            
        },
        [editStaff.rejected](state) {
            state.status = HTTP_STATUS.REJECTED            
        },

        // deleteStaff
        [deleteStaff.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteStaff.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.nvid !== payload.nvid)
            state.status = HTTP_STATUS.FULFILLED
            return state
        },
        [deleteStaff.rejected](state, { payload }) {
            state.status = HTTP_STATUS.REJECTED
            state.message = payload.message
        },

        // getStaffs
        [getStaffs.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getStaffs.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.FULFILLED
        },
        [getStaffs.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export default staffSlice.reducer;