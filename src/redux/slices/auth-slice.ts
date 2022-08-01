import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialStateInterface {
    isLoggedIn: boolean;
    userFullName: string | null;
    userId: string | null;
    userRole: number | null;
    avatarUrl: string | null;
}

const initialState: initialStateInterface = {
    isLoggedIn: false,
    userFullName: null,
    userId: null,
    userRole: null,
    avatarUrl: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<initialStateInterface>) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userFullName = action.payload.userFullName;
            state.avatarUrl = action.payload.avatarUrl;
            state.userId = action.payload.userId;
            state.userRole = action.payload.userRole;
        },
        logOut: (state,  action: PayloadAction<true>) => {
            state.isLoggedIn = false;
            state.userFullName = null;
            state.avatarUrl = null;
            state.userId = null;
            state.userRole = null;
        },
    }
});

export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer;
