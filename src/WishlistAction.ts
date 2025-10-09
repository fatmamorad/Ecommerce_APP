'use server'

import { toast } from "sonner"
import { GetUserId, GetUserToken } from "./GetUserToken"
import { Order } from "./types/Orders.type"
import { WishList } from "./types/Wish.type"

export async  function AddProductToWishlist(id:string){

     const token :string|undefined= await GetUserToken()
     if(!token){
          toast.error("User must be login..")
          throw new Error("token error")
     }
     
     const exsistWishData= await GetWishlistItems();
    if (exsistWishData.data.some((item:any) => item.id === id)) {
          
          RemoveProductFromWishlist(id)
     }
     else{
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
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

     return data}
}


export async  function GetWishlistItems(){
    
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
   
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
          {
               headers:{
                    token:token
               }
          }
     )
   
     const data:WishList= await res.json()
     return data
}



export async  function GetAllOrders(){
    let id =await GetUserId()
     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
    
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${id}`,
          {
               headers:{
                    token:token
               }
          }
     )

     const data:Order[]= await res.json()
        return data
}


export async  function RemoveProductFromWishlist(id:string){

     const token :string|undefined= await GetUserToken()
     if(!token){
          throw new Error("token error")
     }
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
          {
               method:"delete",
    
               headers:{
                    token:token,
               }
          }
     )
  
     const data= await res.json()
  
     return data
}


