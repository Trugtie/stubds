import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
    headers: { 'Authorization': 'Basic ' + localStorage.getItem('Token') }
}

export const uploadImage = createAsyncThunk(
    'image/uploadImage',
    async (value) => {
        try {
            var listImage = new FormData();
            listImage.append('bdsid', value.bdsid);
            for (let i = 0; i < value.file.length; i++) {
                listImage.append('listImage', value.file[i]);
            }
            const { data } = await axios.post(`${API_URL}uploadImage`, listImage, config)
            return data;
        } catch (error) {
            throw new Error(error.response.data)
        }
    }
)

export const imageSlice = createSlice({
    name: "image",
    initialState: {
        list: [],
        status: null,
        message: null
    },
    reducers: {
        setStateImage: (state) => {
            state.status = HTTP_STATUS.FULFILLED
            state.message = null
        }
    },
    extraReducers: {
        // uploadImage
        [uploadImage.pending](state) {
            state.status = HTTP_STATUS.PENDING
        },
        [uploadImage.fulfilled](state, { payload }) {
            state.list = payload
            state.status = HTTP_STATUS.INSERTED
        },
        [uploadImage.rejected](state, error) {
            state.status = HTTP_STATUS.INSERT_FAILED
            state.message = error.error.message
        },
    }
})
export const { setStateImage } = imageSlice.actions;
export default imageSlice.reducer;