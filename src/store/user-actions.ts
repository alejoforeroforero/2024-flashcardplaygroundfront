import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

type userType = {
  email: string;
};

export const signIn = createAsyncThunk(
  "signIn",
  async ({ email }: userType) => {
    const userObj = {
      email: email,
    };

    try {
      const response = await axiosInstance.post("/users/", userObj);
      return response.data;
    } catch (error) {
      console.error("Error creating the card:", error);
      throw error;
    }
  }
);
