import { configureStore} from "@reduxjs/toolkit";
import staffReducer from "./staffSlice";
import customerReducer from "./customerSlice";
import propertyReducer from "./propertySlice";
import propertyTypeReducer from "./propertyTypeSlice";
import assignmentReducer from "./assignmentSlice";
import consignmentReducer from "./consignmentSlice";
import depositReducer from "./depositSlice";
import requirementReducer from "./requirementSlice";
import imageReducer from "./imageSlice";
import cityReducer from "./citySlice";


export const store = configureStore({
    reducer:{
        Staff:staffReducer,
        Customer:customerReducer,
        Property:propertyReducer,
        PropertyType:propertyTypeReducer,
        Assignment:assignmentReducer,
        Consignment:consignmentReducer,
        Deposit:depositReducer,
        Requirement:requirementReducer,
        City:cityReducer,
        Image:imageReducer,
    }
   
})