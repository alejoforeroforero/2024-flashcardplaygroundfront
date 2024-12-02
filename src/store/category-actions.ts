import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

export const getCategories = createAsyncThunk("getCategories", async () => {
  const userId = 1 //Este valor hay que actualizarlo
  try {
    const response = await axiosInstance.get("/categories/", {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
});

type categoryType = {
  name: string;
  onAfterCreate: () => void;
};

export const createCategory = createAsyncThunk(
  "createCategories",
  async (categoryObj: categoryType) => {
    const userId = 1 //Este valor hay que actualizarlo
    try {
      const response = await axiosInstance.post("/categories/", {
        name: categoryObj.name,
        user_id: userId
      });
      if (response.data) {
        categoryObj.onAfterCreate();
      }
      return response.data;
    } catch (error) {
      console.error("Error creating the category:", error);
      throw error;
    }
  }
);
