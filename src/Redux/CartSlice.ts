// store/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartData, ProductElement } from "image/types/cart.type";
import { GetCartItems, AddProductToCart, RemoveProductFromCart, UpdateCount, ClearCart } from "image/cartActions";

interface CartState {
  products: ProductElement[];
  count: number;
  loading: boolean;
  error?: string;
}

const initialState: CartState = {
  products: [],
  count: 0,
  loading: false,
};

// Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await GetCartItems();
});

export const addProductAsync = createAsyncThunk(
  "cart/addProduct",
  async (id: string) => {
    return await AddProductToCart(id);
  }
);

export const removeProductAsync = createAsyncThunk(
  "cart/removeProduct",
  async (id: string) => {
    return await RemoveProductFromCart(id);
  }
);

export const updateProductCountAsync = createAsyncThunk(
  "cart/updateCount",
  async ({ id, count }: { id: string; count: number }) => {
    return await UpdateCount(id, count);
  }
);

export const clearCartAsync = createAsyncThunk("cart/clearCart", async () => {
  return await ClearCart();
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartData>) => {
        state.products = action.payload.data.products;
        state.count = action.payload.data.products.reduce((total, item) => total + item.count, 0);
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(addProductAsync.fulfilled, (state, action) => {
  if (action.payload?.data?.products?.length > 0) {
    state.products.push(action.payload.data.products[0]);
    state.count = state.products.reduce((total, item) => total + item.count, 0);
  }
})
     .addCase(removeProductAsync.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
  if (action.payload?.id) {
    state.products = state.products.filter(p => p._id !== action.payload.id);
    state.count = state.products.reduce((total, item) => total + item.count, 0);
  }
})
      .addCase(updateProductCountAsync.fulfilled, (state, action) => {
  const updatedProduct = action.payload?.data?.products?.[0];
  if (updatedProduct) {
    const existing = state.products.find(p => p._id === updatedProduct._id);
    if (existing) existing.count = updatedProduct.count;
    state.count = state.products.reduce((total, item) => total + item.count, 0);
  }
})

      .addCase(clearCartAsync.fulfilled, (state) => {
        state.products = [];
        state.count = 0;
      });
  }
});

export let cartReducer= cartSlice.reducer;
