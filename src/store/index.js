import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from "../features/users/UsersSlice";

export const store = configureStore({
    reducer:{
        users: UsersReducer,
    }
})