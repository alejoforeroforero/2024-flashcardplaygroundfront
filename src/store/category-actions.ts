import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axios";

export const getCategories = createAsyncThunk("getCategories", async () => {
  try {
    const response = await axiosInstance.get("/api/categories/");
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
    try {
      const response = await axiosInstance.post("/api/categories", {
        name: categoryObj.name,
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
