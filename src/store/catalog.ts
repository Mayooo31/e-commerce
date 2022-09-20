import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { keyboardsData } from "../data/data";
import { KeyboardsDataType } from "../types/types";

const catalogState: {
  catalogData: KeyboardsDataType;
  selectedCategory: string;
} = {
  catalogData: keyboardsData.filter(product => {
    if (product.isNew === true) return product;
  }),
  selectedCategory: "new",
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: catalogState,
  reducers: {
    filter(state, action: PayloadAction<string>) {
      const payload = action.payload.toLowerCase();

      state.selectedCategory = payload;

      if (payload.includes("%")) {
        state.catalogData = keyboardsData.filter(product => {
          if (product.type.toLowerCase() === payload) return product;
        });
        return;
      }
      if (payload === "all") {
        state.catalogData = keyboardsData;
        return;
      }
      if (payload === "bestseller") {
        state.catalogData = keyboardsData.filter(product => {
          if (product.bestseller === true) return product;
        });
        return;
      }
      if (payload === "new") {
        state.catalogData = keyboardsData.filter(product => {
          if (product.isNew === true) return product;
        });
        return;
      }
      state.catalogData = keyboardsData.filter(product => {
        let isProduct;
        product.brand.map(company => {
          if (payload === company.toLowerCase()) isProduct = true;
        });
        if (isProduct) return product;
      });
    },
  },
});

export const catalogActions = catalogSlice.actions;
