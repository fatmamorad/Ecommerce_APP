
'use server'
import { pt } from "zod/v4/locales"
import { GetUserToken } from "./GetUserToken"
import { CartData } from "./types/cart.type"

export async  function GetCartItems(){
    
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
     console.log(5000,process.env.NEXT_PUBLIC_BASE_URL)
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
          {
               headers:{
                    token:token
               }
          }
     )

     const data:CartData= await res.json()
         return data
}



export async  function AddProductToCart(id:string){
     console.log(id)
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
 
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
          {
               method:"post",
               body:JSON.stringify({productId:id}),
               headers:{
                   
                    token:token,
                    "content-type":'application/json',
               }
          }
     )
  
     const data= await res.json()
  
     return data
}



export async  function  RemoveProductFromCart(id:string){
     console.log(id)
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
 
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
          {
               method:"delete",
               body:JSON.stringify({productId:id}),
               headers:{
                    token:token,
               }
          }
     )
  
     const data= await res.json()
     console.log(110,data)
     return data
}


export async  function  ClearCart(){
  
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
 
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`,
          {
               method:"delete",
               headers:{
                    token:token,
               }
          }
     )
  
     const data= await res.json()
     console.log(110,data)
     return data
}

export async  function  UpdateCount(id:string,count:number){
  
     const token :string|undefined= await GetUserToken()
    
     if(!token){
          throw new Error("token error")
     }

     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
          {
               method:"put",
               body:JSON.stringify({
                    count:count
               }),
               headers:{
                    "content-type":'application/json',
                    token:token,
               }
          }
     )
  
     const data= await res.json()

     return data
}