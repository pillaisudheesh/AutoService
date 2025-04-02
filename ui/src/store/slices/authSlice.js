import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";
const name = 'auth';
const createInitialState = () => {
    return {
        user: {},
        error: null
    }
}

const createReducers = () => {
    return {
        setToken(state, action) {
            console.log(action.payload);
            state.user = {
                ...state.user,
                token: action.payload,
                isAuthenticated: !!action.payload
            }
        },
        clearToken(state) {
            state.user = 
            {
                token: null,
                isAuthenticated : false
            }
          },
    }
}
const initialState = createInitialState();
const reducers = createReducers();

const slice = createSlice({name, initialState, reducers});
export const authActions = {...slice.actions};
export const authReducer = slice.reducer;