import { configureStore } from "@reduxjs/toolkit";

import { cartSlice } from "./cart";
import { catalogSlice } from "./catalog";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, catalog: catalogSlice.reducer },
});

export default store;
