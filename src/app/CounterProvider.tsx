'use client'
import { GetCartItems } from "image/cartActions";
import { GetUserToken } from "image/GetUserToken";
import { CartData } from "image/types/cart.type";
import { createContext, useEffect, useState} from "react";
type CounterContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};
export const CounterContext = createContext<CounterContextType >();
export default function CounterProvider({children}:{children:React.ReactNode}){
    const [count,setCount]=useState(0)
    async function tokenUser(){
        const token=await GetUserToken()
        if(token){
            let count=0
           const data:CartData=await GetCartItems()
           data.data.products.forEach((item)=>{
            count+=item.count
           })
           setCount(count)
           
        }
    }
    useEffect(()=>{
tokenUser()
    },[])
    return <CounterContext.Provider value={{count,setCount}}>
        {children}
    </CounterContext.Provider>
    
    
}