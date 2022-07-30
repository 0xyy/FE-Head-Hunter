import { configureStore } from '@reduxjs/toolkit'
import hrSlice from "./redux/slices/hr-slice";
import userSlice from "./redux/slices/user-slice";
import studentSlice from "./redux/slices/student-slice";
import authReducer from "./redux/slices/auth-slice";

const store = configureStore({
    reducer: {
        user: userSlice,
        hr: hrSlice,
        student: studentSlice,
        auth: authReducer
    },
    // middleware: (getDefaultMiddleware) => {},
})
// export type RootState = ReturnType<typeof store.getState()>

export default store
