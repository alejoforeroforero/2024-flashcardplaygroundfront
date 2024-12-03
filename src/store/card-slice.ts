import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPaginatedCards,
  getCardsByCategory,
  createCard,
  deleteCard,
  searchCards,
} from "./card-actions";

import { Card as CardT } from "@/App";

export type Status = {
  info: CardT[];
  totalCount: number;
  currentPage: number;
  mode: string;
  categoryIdView: number;
  query: string;
  status: string;
  loading: boolean;
  successMessage: string;
  error: string;
};

const initialState: Status = {
  info: [],
  totalCount: 0,
  currentPage: 0,
  mode: "all",
  categoryIdView: 0,
  query: "",
  status: "",
  loading: true,
  successMessage: "",
  error: "",
};

export const cardSlice = createSlice({
  name: "CardSlice",
  initialState,
  reducers: {
    toogleActive: (state, action: PayloadAction<number>) => {
      const cardItem = state.info.filter((card) => card.id == action.payload);
      cardItem[0].active = !cardItem[0].active;
    },
  },
  extraReducers: (builder) => {
    builder
      //Get all paginated cards
      .addCase(fetchPaginatedCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaginatedCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = [...action.payload.cards].map((card) => ({
          ...card,
          active: false,
        }));
        state.totalCount = action.payload.total_count;
        state.currentPage = action.payload.current_page;
        state.mode = "all";
      })
      .addCase(fetchPaginatedCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch cards";
      })
      //Get cards by category
      .addCase(getCardsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCardsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.info = [...action.payload.cards].map((card) => ({
          ...card,
          active: false,
        }));
        state.totalCount = action.payload.total_count;
        state.currentPage = action.payload.current_page;
        state.mode = "category";
        state.categoryIdView = action.payload.category_id;
      })
      .addCase(getCardsByCategory.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
        alert(state.error);
      })
      //Create card
      .addCase(createCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCard.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Card created";
      })
      .addCase(createCard.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
      })
      //Delete card
      .addCase(deleteCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCard.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.successMessage = "Card deleted";
      })
      .addCase(deleteCard.rejected, (state) => {
        state.status = "failed";
        state.error = "No sabemos pero algo paso";
      })
      //Search
      .addCase(searchCards.pending, (state) => {
        state.loading = true;
        state.error = "algo paso";
      })
      .addCase(searchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.cards;
        state.totalCount = action.payload.total_count;
        state.currentPage = action.payload.current_page;
        state.mode = "search";
        state.query = action.payload.search_term;
      })
      .addCase(searchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { toogleActive } = cardSlice.actions;
