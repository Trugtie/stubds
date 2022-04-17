import { configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import staffReducer from "./staffSlice";
import customerReducer from "./customerSlice";


export const store = configureStore({
    reducer:{
        User:userReducer,
        Staff:staffReducer,
        Customer:customerReducer,
    }
   
})