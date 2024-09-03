import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const intialUser = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : null
const initialState = {
    isLoading: false,
    currentUser: null,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            console.log(action.payload, "redux");
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        registerSuccess: (state, action) => {
            state.isLoading = false;
        },
        registerFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
        }
    }
});

// Export actions
export const { loginFailure, loginSuccess, registerSuccess, registerFailure, logoutSuccess } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Register function (not default)
export const register = (user) => async (dispatch) => {
    try {
        const response = await fetch('https://project-taskbar-backend.netlify.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(registerSuccess(data));
        } else {
            dispatch(registerFailure('Registration failed'));
        }
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

// Signin function using fetch
export const signin = (user) => async (dispatch) => {
    console.log(user);
    try {

        const response = await fetch('https://project-taskbar-backend.netlify.app/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        // console.log("print data", response.data.user.email);
        if (response.ok) {

            const data = await response.json();
            console.log(data, "fki");

            localStorage.setItem('auth', JSON.stringify({
                currentUser: data,
            }));

            dispatch(loginSuccess(data));  // Dispatching the resolved data, not the Promise
        } else {
            // Handle error response
            const errorData = await response.json();
            dispatch(loginFailure(errorData.message || 'Login failed'));
        }
    } catch (error) {
        // Handle any other errors (e.g., network issues)
        dispatch(loginFailure(error.message));
    }
};

