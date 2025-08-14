import { createSlice } from "@reduxjs/toolkit";
import { fetchPositions } from "./operations";

const positionsSlice = createSlice({
    name: "positions",
    initialState: {
      positions: [],
      isLoading: false,
      error: null,
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchPositions.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchPositions.fulfilled, (state, action) => {
            state.isLoading = false; 
            state.positions = action.payload; 
            state.error = null;
        })
        .addCase(fetchPositions.rejected, (state, action) => {
            state.isLoading = false; 
            state.error=action.payload;
        })
    }
})

export const positionsReducer = positionsSlice.reducer;