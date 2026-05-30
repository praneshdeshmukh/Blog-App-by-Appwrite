// This slice is for checking is user authenticated or not
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {  // define actions
        login : (state, action) => {
            state.status = true
            state.userData = action.payload.userData
        },
        logout : (state) => {
            state.status = false
            state.userData = null
        }
    } 
})

/// also need to export each individual function{ie. actions} of reducers
// cs different components use them

export const {login, logout} = authSlice.actions; // 2 actions (login, logout)