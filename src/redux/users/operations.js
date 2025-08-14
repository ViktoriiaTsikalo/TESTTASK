import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../token/operations";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (url = null, thunkAPI) => {
    try {
      const response = await API.get(url || "/users?page=1&count=6");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, thunkAPI) => {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ formData, token, page, count }, thunkAPI) => {
    try {
      const response = await API.post("/users", formData, {
        headers: {
          Token: token,
        },
      });
      await thunkAPI.dispatch(fetchUsers(`/users?page=${page}&count=${count}`));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
