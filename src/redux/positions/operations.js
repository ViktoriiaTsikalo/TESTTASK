import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../token/operations";

export const fetchPositions = createAsyncThunk(
  "positions/fetchPositions",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/positions");
      return response.data.positions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

