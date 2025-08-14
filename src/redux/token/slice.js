import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "./operations";

const tokenSlice = createSlice({
    name: "token",
    initialState: {
      token: "",
      isLoading: false,
      error: null,
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getToken.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getToken.fulfilled, (state, action) => {
            state.isLoading = false; 
            state.token = action.payload; 
            state.error = null;
        })
        .addCase(getToken.rejected, (state, action) => {
            state.isLoading = false; 
            state.error=action.payload;
        })
    }
})

export const tokenReducer = tokenSlice.reducer;