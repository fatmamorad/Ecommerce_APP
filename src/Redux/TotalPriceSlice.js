import { createSlice } from "@reduxjs/toolkit";
let TotalPriceSlice=createSlice({
    name:"totalPrice",
    initialState:{
        totalPrice:0
    },
    reducers:{
        assignTotalPrice:function(prestate,payload){
           prestate=payload
        }
    }
})
export let totalPrice= TotalPriceSlice.reducer