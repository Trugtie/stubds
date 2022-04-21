import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, HTTP_STATUS } from "./constants";
import axios from "axios";


export const login = createAsyncThunk(
   'user/login',
   async (value) => {
      console.log(value)
      const { data } = await axios.post(`${API_URL}login`, value)
      console.log(data.data)
      return data;
   }
)

export const userSlice = createSlice({
   name: "user",
   initialState: {
      userInfo: null,
      loading: null,
      status: null,
      message: null
   },
   reducers: {
      logout: (state) => {
         localStorage.removeItem("user")
         state.userInfo = null
         state.loading = null
         state.status = null
      }
   },
   extraReducers: {
      [login.pending](state) {
         state.loading = HTTP_STATUS.PENDING
      },
      [login.rejected](state, { payload }) {
         state.loading = HTTP_STATUS.REJECTED
         state.message = payload
         console.log(payload)
      },
      [login.fulfilled](state, { payload }) {
         if (payload) {
            console.log(payload)
            // localStorage.setItem("user", payload.tennv)
            // localStorage.setItem("permission", payload.quyen)
            // window.location.reload()
            state.loading = HTTP_STATUS.FULFILLED
            state.userInfo = payload
            state.status = true
         } else {
            console.log(payload)
            state.loading = HTTP_STATUS.REJECTED
         }
      },
   }
})
export const { logout } = userSlice.actions;
export default userSlice.reducer;