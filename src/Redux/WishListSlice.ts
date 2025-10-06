// store/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartData, ProductElement } from "image/types/cart.type";
import { GetCartItems, AddProductToCart, RemoveProductFromCart, UpdateCount, ClearCart } from "image/cartActions";
import { AddProductToWishlist, GetWishlistItems, RemoveProductFromWishlist } from "image/WishlistAction";
import { WishList, WishProduct } from "image/types/Wish.type";

interface wishState {
  products: WishProduct[];
  count: number;
  loading: boolean;
  error?: string;
}

const initialState: wishState = {
  products: [],
  count: 0,
  loading: false,
};

// Thunks
export const fetchwish= createAsyncThunk("wishList/fetchwishList", async () => {
  return await GetWishlistItems();
});
export const removewish=createAsyncThunk("wishList/removewish",
    async(id:string,{dispatch})=>{
        await RemoveProductFromWishlist(id)
        return await GetWishlistItems()
    }
)
export const addwishList=createAsyncThunk("wishList/addwishList",
    async(id:string,{dispatch}) =>{
        await AddProductToWishlist(id)
        return await GetWishlistItems()
    }
)



const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchwish.pending, (state) => { state.loading = true; })
      .addCase(fetchwish.fulfilled, (state, action: PayloadAction<WishList>) => {
        state.products = action.payload.data;
        state.count = action.payload.count
        state.loading = false;
      }).addCase(fetchwish.rejected,(state,action)=>{
        state.loading=false
        state.error=action.error.message
      }).addCase(removewish.pending,(state)=>{
        state.loading=true
      }).addCase(removewish.fulfilled,(state,action:PayloadAction<WishList>)=>{
        state.products=action.payload.data
        state.count=action.payload.count
        state.loading=false
      }).addCase(addwishList.pending,(statet)=>{
        statet.loading=false
      }).addCase(addwishList.fulfilled,(state,action:PayloadAction<WishList>)=>{
         state.products=action.payload.data
         state.count=action.payload.count
         state.loading=false
      })
      
    }

});

export let wishReducer= wishSlice.reducer;
