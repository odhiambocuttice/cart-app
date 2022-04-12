import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../src/cartItems";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  total: 0,
  totalItems: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "getCartItems",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (store) => {
      store.cartItems = [];
    },
    removeItem: (store, action) => {
      const itemId = action.payload;
      store.cartItems = store.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (store, { payload }) => {
      const cartItem = store.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (store, { payload }) => {
      const cartItem = store.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (store) => {
      let amount = 0;
      let total = 0;
      store.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      store.totalItems = amount;
      store.total = total;
    },
  },
  extraReducers: {
    [getCartItems.fulfilled]: (store, action) => {
      store.cartItems = action.payload;
      store.isLoading = false;
    },
    [getCartItems.pending]: (store) => {
      store.isLoading = true;
    },
    [getCartItems.rejected]: (store) => {
      store.isLoading = false;
    },
  },
});

// console.log(cartSlice);
export const { clearCart, increase, decrease, removeItem, calculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
