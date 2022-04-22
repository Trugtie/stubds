import { configureStore} from "@reduxjs/toolkit";
import staffReducer from "./staffSlice";
import customerReducer from "./customerSlice";


export const store = configureStore({
    reducer:{
        Staff:staffReducer,
        Customer:customerReducer,
    }
   
})