import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
        userType: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action) => {},
        logOut: (state, action) => {},
        getToken: (state, action) => {},
    }
})

export const {logIn, logOut, getToken} = authSlice.actions
export default authSlice.reducer
