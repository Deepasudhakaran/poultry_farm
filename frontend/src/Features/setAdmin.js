
import { createSlice } from "@reduxjs/toolkit";

export const adminDetailsSlice = createSlice({
    name : "Admin",
    initialState: {},
    reducers: {
        setAdminDetails: (state, action) =>{
            state.value = action.payload;
        },
        
    }
})
export const { setAdminDetails} = adminDetailsSlice.actions
export const selectAdmin = (state) => state.admin
export default adminDetailsSlice.reducer 