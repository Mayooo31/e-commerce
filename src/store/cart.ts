import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PayloadType = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const cartData = localStorage.getItem("cart");
const numberOfItems = localStorage.getItem("numberOfItems");
const parsedNumberOfItems = numberOfItems && JSON.parse(numberOfItems);
const parsedCart = cartData && JSON.parse(cartData);

const cartState: {
  numberOfItems: number;
  cartItems: PayloadType[];
} = {
  numberOfItems: parsedNumberOfItems ? +parsedNumberOfItems : 0,
  cartItems: parsedCart ? parsedCart : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        image: string;
        price: number;
      }>
    ) {
      if (
        !state.cartItems.find(item => item.id === action.payload.id && item.quantity++)
      ) {
        state.cartItems.push({
          id: action.payload.id,
          quantity: 1,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
        });
      }
      state.numberOfItems++;
    },
    removeOneItemFromCart(state, action: PayloadAction<string>) {
      state.cartItems.find(item => {
        if (item.id === action.payload && item.quantity > 1) {
          state.numberOfItems--;
          item.quantity--;
          return;
        }
        if (item.id === action.payload && item.quantity === 1) {
          state.numberOfItems--;
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
      });
    },
    removeAllItemsOfSameProduct(state, action: PayloadAction<string>) {
      state.cartItems.find(item => {
        if (item.id === action.payload) {
          state.numberOfItems = state.numberOfItems - item.quantity;
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
      });
    },
    scrapCart(state) {
      state.numberOfItems = 0;
      state.cartItems = [];
    },
  },
});

export const cartActions = cartSlice.actions;
