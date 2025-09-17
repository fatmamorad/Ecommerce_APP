import { Brands } from "./types/Brands"


export async function getBrands(){
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)

    
    const data: Brands =await res.json()
   
    return data.data
}