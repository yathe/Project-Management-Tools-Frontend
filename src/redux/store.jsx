import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Correct import
import taskReducer from "./TaskSlice"; 
const storedAuth = JSON.parse(localStorage.getItem('auth'));

const preloadedState = {
    auth: {
        isLoading: false,
        currentUser: storedAuth ? storedAuth.currentUser : null,
        error: null,
    }
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer
    },
    preloadedState
});
