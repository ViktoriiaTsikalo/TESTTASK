import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const API = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1",
});

export const getToken = createAsyncThunk(
  "token/getToken", 
  async (_, thunkAPI) => { 
    try {
      const response = await API.post("/token"); 
      return response.data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);