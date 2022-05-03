import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";
let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const getProperties = createAsyncThunk(
    'property/getProperties',
    async () => {
        const { data } = await axios.get(`${API_URL}batdongsan`, config)
        return data;
    }
)

export const getProperty = createAsyncThunk(
    'property/getProperty',
    async (value) => {
        const { data } = await axios.get(`${API_URL}batdongsan/${value}`, config)
        return data;
    }
)

export const addProperty = createAsyncThunk(
    'property/addProperty',
    async (value) => {
        try {
        const { data } = await axios.post(`${API_URL}batdongsan`, value, config)
        return data;
    } catch (error) {
        throw new Error(error.response.data)
    }
    }
);

export const editProperty = createAsyncThunk(
    'property/editProperty',
    async (value) => {
        try {
        const { data } = await axios.put(`${API_URL}batdongsan`, value, config)
        return data;
    } catch (error) {
        throw new Error(error.response.data)
    }
    }
);


export const deleteProperty = createAsyncThunk(
    'property/deleteProperty',
    async (value) => {
        try {
        const { data } = await axios.delete(`${API_URL}batdongsan/${value}`, config)
        return data;
    } catch (error) {
        throw new Error(error.response.data)
    }
    }
);

export const propertySlice = createSlice({
    name: "property",
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
        // addProperty
        [addProperty.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [addProperty.fulfilled](state, { payload }) {
            state.list.push(payload)
            state.status = HTTP_STATUS.INSERTED
        },
        [addProperty.rejected](state, error) {
            state.status = HTTP_STATUS.INSERT_FAILED
            state.message = error.error.message
        },

        // editProperty
        [editProperty.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [editProperty.fulfilled](state) {
            state.status = HTTP_STATUS.EDITED
        },
        [editProperty.rejected](state, error) {
            state.status = HTTP_STATUS.EDIT_FAILED
            state.message = error.error.message
        },

        // deleteProperty
        [deleteProperty.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [deleteProperty.fulfilled](state, { payload }) {
            state.list = state.list.filter((item) => item.bdsid !== payload.bdsid)
            state.status = HTTP_STATUS.DELETED
            return state
        },
        [deleteProperty.rejected](state, error) {
            state.status = HTTP_STATUS.DELETE_FAILED
            state.message = error.error.message
        },

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

        // getProperty
        [getProperty.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [getProperty.fulfilled](state, { payload }) {
            state.status = HTTP_STATUS.EDITED
            const index = state.list.findIndex((item) => item.bdsid === payload.bdsid)
            if (index >= 0) {
                state.list[index] = payload;
            }
        },
        [getProperty.rejected](state) {
            state.status = HTTP_STATUS.REJECTED
        },
    }
})
export const { setState } = propertySlice.actions;
export default propertySlice.reducer;