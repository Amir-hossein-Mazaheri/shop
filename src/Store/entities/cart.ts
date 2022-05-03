import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configStore";
import List from "../../Helpers/List";

export interface CartItem {
  id: Common.Id;
  title: string;
  count: number;
  unitPrice: number;
  totalPrice: number;
}

interface ProductIdentifier {
  productId: Common.Id;
}

interface CartDecrementOrIncrementAction extends ProductIdentifier {
  amount: number;
}

type AddCartItemAction = {
  [Property in keyof CartItem as Exclude<
    Property,
    "count"
  >]: CartItem[Property];
};

interface InitialCartState {
  id: string | null;
  items: CartItem[];
}

const initialState: InitialCartState = {
  id: null,
  items: [],
};

export const addCartItem: CaseReducer<
  InitialCartState,
  PayloadAction<AddCartItemAction>
> = (store, action) => {
  const { id, title, unitPrice, totalPrice } = action.payload;

  const cartItem = new List(store.items).find(id);

  if (cartItem) return;

  store.items.push({
    id,
    title,
    count: 1,
    unitPrice,
    totalPrice,
  });
};

export const removeCartItem: CaseReducer<
  InitialCartState,
  PayloadAction<ProductIdentifier>
> = (store, action) => {
  const { productId } = action.payload;

  store.items = new List(store.items).remove(productId);
};

export const decrementOrIncrementCartItem: CaseReducer<
  InitialCartState,
  PayloadAction<CartDecrementOrIncrementAction>
> = (store, action) => {
  const { productId } = action.payload;

  const list = new List(store.items);

  const targetProduct = list.find(productId);

  if (targetProduct) {
    targetProduct.count += action.payload.amount;
    if (targetProduct.count < 1) {
      store.items = list.remove(productId);
    }
  }
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_CART_ITEM: addCartItem,
    REMOVE_CART_ITEM: removeCartItem,
    DECREMENT_OR_INCREMENT_CART_ITEM: decrementOrIncrementCartItem,
  },
});

export const selectCartItems = (store: RootState) => store.entities.cart.items;

export default cart.reducer;

export const {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  DECREMENT_OR_INCREMENT_CART_ITEM,
} = cart.actions;
