import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { API_URL,HTTP_STATUS } from "./constants";
import axios from "axios";

let config = {
   headers: {
     "Content-Type": "application/json",
     'Access-Control-Allow-Origin': '*',
     }
   }


export const login = createAsyncThunk(
   'user/login',
   async(value)=>{
       const {data} = await axios.post(`${API_URL}nhanvien/login`,value)
       return data;
   }
)

export const userSlice = createSlice({
  name:"user",
  initialState:{
      userInfo: null,
      loading: null,
      status:null,
      message:null
  },
  reducers:{
     logout:(state)=>{
      state.userInfo = null
      state.loading = null
      state.status = null
     }
  },
  extraReducers:{
   [login.pending](state){                   //start login
      state.loading = HTTP_STATUS.PENDING
   },
   [login.fulfilled](state,{payload}){
      state.loading = HTTP_STATUS.FULFILLED
      state.userInfo = payload
      state.status = true
   },
   [login.rejected](state,{payload}){
      state.loading = HTTP_STATUS.REJECTED
      state.message = payload
      
   },                                         //end login
  }
})
export const {logout} = userSlice.actions;
export default userSlice.reducer;