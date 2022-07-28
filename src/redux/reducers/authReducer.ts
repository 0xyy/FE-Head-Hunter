import {createReducer, createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        userType: null
    },
    reducers: {
        logIn: (state, action) => {},
        logOut: (state, action) => {},
        getToken: (state, action) => {},
    }
})

export const {logIn, logOut, getToken} = authSlice.actions
export default authSlice.reducer
