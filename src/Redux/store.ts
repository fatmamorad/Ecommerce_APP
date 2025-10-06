// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CartSlice";
import { wishReducer } from "./WishListSlice";
import { FilterationReducer } from "./Filteration";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList:wishReducer,
    filter:FilterationReducer
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
