import { configureStore } from '@reduxjs/toolkit'
import hrSlice from "./redux/slices/hr-slice";
import studentSlice from "./redux/slices/student-slice";
import authSlice from "./redux/slices/auth-slice";



const store = configureStore({
    reducer: {
        auth: authSlice,
        // hr: hrSlice,
        // student: studentSlice,
    },
    // middleware: (getDefaultMiddleware) => {},
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
