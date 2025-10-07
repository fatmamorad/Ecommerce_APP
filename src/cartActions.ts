
'use server'
import { pt } from "zod/v4/locales"
import { GetUserToken } from "./GetUserToken"
import { CartData } from "./types/cart.type"

export async  function GetCartItems(){
    
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
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
  
     const data:CartData= await res.json()
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

export async function UpdateCount(id: string, count: number) {
  const token = await GetUserToken();
  if (!token) {
  return;
}
console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count:count }),
  });

  if (!res.ok) throw new Error("Failed to update cart item count");

  const data:CartData = await res.json();

  return data
}
