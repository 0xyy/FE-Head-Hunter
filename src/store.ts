import { configureStore } from '@reduxjs/toolkit'
import hrReducer from "./redux/reducers/hrReducer";
import userReducer from "./redux/reducers/userReducer";
import coursantReducer from "./redux/reducers/coursantReducer";
import authReducer from "./redux/reducers/authReducer";

const store = configureStore({
    reducer: {
        user: userReducer,
        hr: hrReducer,
        coursant: coursantReducer,
        auth: authReducer
    },
    // middleware: (getDefaultMiddleware) => {},
})

export default store
