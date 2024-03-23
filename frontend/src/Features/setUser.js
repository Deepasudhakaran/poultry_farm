import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
    name :"User",
    initialState: {},
    reducers: {
        setUserDetails: (state, action) =>{
            state.value = action.payload
        },
    }
})

export const { setUserDetails } = userDetailsSlice.actions
export const selectUser = (state) =>state.user
export default userDetailsSlice.reducer