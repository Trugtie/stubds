import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";
import { Buffer } from 'buffer';

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const login = createAsyncThunk(
    'staff/login',
    async (value) => {
        window.Buffer = Buffer;
        var bodyLogin = new FormData();
        bodyLogin.append('taikhoan', value.username);
        bodyLogin.append('matkhau', value.password);
        const token = window.Buffer.from(`${value.username}:${value.password}`).toString('base64');
        localStorage.setItem('Token', token);
        const { data } = await axios.post(`${API_URL}login`, bodyLogin, { headers: { 'Authorization': 'Basic ' + token } })
        return data;
    }
)

export const getStaffs = createAsyncThunk(
    'staff/getStaffs',
    async () => {
        const { data } = await axios.get(`${API_URL}nhanvien`, config)
        return data;
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (value) => {
        const { data } = await axios.delete(`${API_URL}nhanvien/${value}`, config)
        return data;
    }
);

export const addStaff = createAsyncThunk(
    'staff/addStaff',
    async (value) => {
        const { data } = await axios.post(`${API_URL}nhanvien`, value, config)
        return data;
    }
);

export const editStaff = createAsyncThunk(
    'staff/editStaff',
    async (value) => {
        const { data } = await axios.put(`${API_URL}nhanvien`, value, config)
        return data;
    }
);

export const staffSlice = createSlice({
    name: "staff",
    initialState: {
        list: [],
        status: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user")
            localStorage.removeItem("permission")
            localStorage.removeItem("Token")
            state.list = null
            state.status = null
        }
    },
    extraReducers: {
        // login
        [login.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [login.fulfilled](state, { payload }) {
            if (payload.trangthai !== 1) {
                var permission = window.Buffer.from(`${payload.quyen}`).toString('base64');
                localStorage.setItem("user", payload.tennv)
                localStorage.setItem("permission", permission)
                window.location.reload()
                state.status = HTTP_STATUS.FULFILLED
            } else {
                state.status = HTTP_STATUS.BLOCKED
            }
        },
        [login.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },

        // addStaff
        [addStaff.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addStaff.fulfilled](state, { payload }) {
            state.list.push(payload)
            state.status = HTTP_STATUS.INSERTED
        },
        [addStaff.rejected](state) {
            state.status = HTTP_STATUS.INSERT_FAILED
        },

        // editStaff
        [editStaff.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [editStaff.fulfilled](state, { payload }) {
            state.status = HTTP_STATUS.EDITED
            const index = state.list.findIndex((item) => item.nvid === payload.nvid)
            if (index >= 0) {
                state.list[index] = payload;
            }
        },
        [editStaff.rejected](state) {
            state.status = HTTP_STATUS.EDIT_FAILED
        },

        // deleteStaff
        [deleteStaff.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteStaff.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.nvid !== payload.nvid)
            state.status = HTTP_STATUS.DELETED
            return state
        },
        [deleteStaff.rejected](state, { payload }) {
            state.status = HTTP_STATUS.DELETE_FAILED
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
export const { logout } = staffSlice.actions;
export default staffSlice.reducer;
