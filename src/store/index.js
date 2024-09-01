import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./slice/userSlice"
import articleReducer from "./slice/articleSlice";

export const store = configureStore({
    reducer: {
        userStore: useReducer,
        articleStore: articleReducer
    }
})

export default store