import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../Features/setUser";
import adminReducer from "../Features/setAdmin";


 export default configureStore({
    reducer: {
        user : useReducer,
        admin: adminReducer
    }
 })