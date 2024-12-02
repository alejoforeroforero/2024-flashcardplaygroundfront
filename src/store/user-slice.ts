import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./user-actions";

export type UserType = {
  id: number;
  email: string;
  isSignedIn:boolean;
  status: string;
  error: string;
};

const initialState: UserType = {
  id: 0,
  email: "",
  isSignedIn:false,
  status: "",
  error: "",
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Get User
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.isSignedIn = true;
        state.email = action.payload.email;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed sign user";
      });
  },
});
