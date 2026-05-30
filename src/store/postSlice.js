
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    selectedPost : null,
    loading : false,
    error : null
}

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers : {
        setSelectedPost : (state, action) => {
            state.selectedPost = action.payload.selectedPost
        },
        clearSelectedPost : (state) => {
            state.selectedPost = null
        },
        clearError : (state) => {
            state.error = null
        },
        //extraReducers: (builder) => {
            // fetchPosts
            // fetchPostById
            // createPost
            // updatePost
            // deletePost
        //}

    }
}) 

export const {setSelectedPost, clearSelectedPost, clearError} = postSlice.actions

export default postSlice.reducer