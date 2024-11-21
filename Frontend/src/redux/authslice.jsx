import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    StoreUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { StoreUser } = authSlice.actions;
export default authSlice.reducer;