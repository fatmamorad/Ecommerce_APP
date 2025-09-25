import { GetUserToken } from "./GetUserToken"
import { CheckOut, CheckOutCard } from "./types/CheckOut.type";
import { Order } from "./types/Orders.type";

export async function CashPayment(id:string,values:{details:string,phone:string,city:string}){
    const token= await GetUserToken()
    console.log(1500,id)
    console.log(values)
     if (!token) {
    throw new Error("User token not found");
  }
 
  const m={
    "shippingAddress":
        values
    
}
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${id}`,{
            method:'post',
            body:JSON.stringify(m),
            headers:{
                token:token,
                'content-type':'application/json'
            }
        })
        
        const data:CheckOut =await res.json()
       
        return data
       
}


export async function CardPayment(id:string,values:{details:string,phone:string,city:string}){
    const token= await GetUserToken()
    console.log(1500,id)
    console.log(values)
     if (!token) {
    throw new Error("User token not found");
  }
 
  const m={
    "shippingAddress":
        values
    
}
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${id}/?url=https://ecommerce-app-lxke.vercel.app/`,{
            method:'post',
            body:JSON.stringify(m),
            headers:{
                token:token,
                'content-type':'application/json'
            }
        })
        
        const data:CheckOutCard =await res.json()
       
        return data
       
}


export async function AllOrders(id:string){
    const token= await GetUserToken()
     if (!token) {
    throw new Error("User token not found");
  }
 

        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${id}`)
        
        const data:Order =await res.json()
       
        return data.cartItems
       
}
