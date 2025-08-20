import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../constant/api/apiInstance";

//register user
export const registerUser = createAsyncThunk("registerUser", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/usersAuth", data);
    // console.log(res, "registerUser");
    return res.data;
  } catch (error) {
    return rejectWithValue({ message: error.response?.data?.message || "Failed to register" });
  }
});

//login
export const loginUser = createAsyncThunk("loginUser", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/loginAuth", data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue({ message: error.response?.data.message || "Login failed" });
  }
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    isLoading: false,
    isError: null,
    userName: localStorage.getItem("userName" || null),
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    userId: localStorage.getItem("userId") || null,
  },
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.email = null;
      state.userName = null;
      state.userId = null;
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
    },
  },

  extraReducers: (builder) => {
    //loginUSer
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // console.log(action.payload, "login Payload");
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      localStorage.setItem("userName", action.payload.userName);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("userId", action.payload.userId);
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
      }
    );
  },
});

export const { logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
