import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../constant/api/apiInstance";

//get ExpanseData ---
export const getExpanseData = createAsyncThunk("getExpanseData", async (userId, { rejectWithValue }) => {
  try {
    const res = await api.get(`txHistory/${userId}`);
    return { data: res.data, userId };
  } catch (error) {
    console.log(error.response?.data || error.message);
    return rejectWithValue(error.response?.data || error.message);
  }
});

//create ExpanseData---
export const postExpanseData = createAsyncThunk("postExpanseData", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("txHistory", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message || "something went wrong");
  }
});

//deleteExpnseData--
export const deleteExpanseData = createAsyncThunk("removeExpanseData", async ({ Id, userId }, { rejectWithValue }) => {
  try {
    const res = await api.delete(`txHistory/${Id}`);
    return { data: res.data, Id, userId };
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.message || "something went wrong");
  }
});

const updateTransactions = (state, userId) => {
  state.totalIncome = state.expanseTx
    .filter((tx) => tx.types === "income" && (tx.userId._id || tx.userId) === userId)
    .reduce((index, val) => index + val.amount, 0);

  state.totalExpanse = state.expanseTx
    .filter((tx) => tx.types === "expanse" && (tx.userId._id || tx.userId) === userId)
    .reduce((index, val) => index + val.amount, 0);

  state.incomeHistory = state.expanseTx.filter(
    (tx) => tx.types === "income" && (tx.userId._id || tx.userId) === userId
  );
  state.expanseHistory = state.expanseTx.filter(
    (tx) => tx.types === "expanse" && (tx.userId._id || tx.userId) === userId
  );
};

const ExpanseSlice = createSlice({
  name: "expanseData",
  initialState: {
    expanseTx: [],
    isLoading: false,
    isError: null,
    totalIncome: 0,
    totalExpanse: 0,
    incomeHistory: [],
    expanseHistory: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    //post expanse data
    builder.addCase(postExpanseData.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      const newExpense = action.payload?.data;
      const userId = newExpense.userId;
      if (newExpense) {
        state.expanseTx.unshift(newExpense);
        updateTransactions(state, userId);
      }
    });

    //get expanse data
    builder.addCase(getExpanseData.fulfilled, (state, action) => {
      const userId = action.payload.userId;

      state.isLoading = false;
      const newData = Array.isArray(action.payload?.data) ? action.payload?.data : [];
      const sorted = newData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      state.expanseTx = sorted;
      updateTransactions(state, userId);
    });

    // deleteExpanse Data
    builder.addCase(deleteExpanseData.fulfilled, (state, action) => {
      console.log(action.payload)
      // const { Id, userId } = action.payload;
      // state.isLoading = false;
      // state.expanseTx = state.expanseTx.filter((tx) => tx._id !== Id);
      // updateTransactions(state, userId);
    });

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
        state.isError = null;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state) => {
        state.isLoading = false;
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

export default ExpanseSlice.reducer;
