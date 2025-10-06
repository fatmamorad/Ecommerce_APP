// store/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartData, ProductElement } from "image/types/cart.type";
import { GetCartItems, AddProductToCart, RemoveProductFromCart, UpdateCount, ClearCart } from "image/cartActions";
import { toast } from "sonner";

interface CartState {
  products:ProductElement[];
  totalPrice:number,
  cartId:string,
  count: number;
  loading: boolean;
  error?: string;
}

const initialState: CartState = {
  cartId:'',
  totalPrice:0,
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
        state.totalPrice=action.payload.data.totalCartPrice
        state.count = action.payload.data.products.reduce((total, item) => total + item.count, 0);
        state.cartId=action.payload. cartId
        state.loading = false;
      }).addCase(addProductAsync.pending, (state) => {
      state.loading=true;
})
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(addProductAsync.fulfilled, (state, action:PayloadAction<CartData>) => {
        state.loading = false;
  if (action.payload?.data?.products?.length > 0) {
    toast.success("Product added to cart", { position: "top-center" });
    state.products=action.payload.data.products
    state.cartId=action.payload.cartId
    state.count = state.products.reduce((total, item) => total + item.count, 0);
    state.totalPrice=action.payload.data.totalCartPrice
  }
})
     .addCase(removeProductAsync.fulfilled, (state, action: PayloadAction<CartData>) => {
  if (action.payload.data) 
    {
      state.cartId=action.payload.cartId
       toast.success("Product removed", { position: "top-center" });
    state.products = action.payload.data.products
    state.totalPrice=action.payload.data.totalCartPrice
    state.count =  action.payload.data.products.reduce((total, item) => total + item.count, 0);
  }
})
      .addCase(updateProductCountAsync.fulfilled, (state, action) => {
  
  if (action.payload?.data) {
    state.cartId=action.payload.cartId
     state.products=action.payload.data.products;
     state.count =  action.payload.data.products.reduce((total, item) => total + item.count, 0);
     state.totalPrice=action.payload.data.totalCartPrice
  }
})
 .addCase(clearCartAsync.fulfilled, (state) => {
        state.products = [];
        state.count = 0;
      });
  }
});

export let cartReducer= cartSlice.reducer;
