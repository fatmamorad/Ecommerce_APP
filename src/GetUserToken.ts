'use server'
import { decode } from "next-auth/jwt"
import { cookies} from "next/headers"
import { VerifyToken } from "./types/verifyToken.type"
export async function GetUserToken() {
    const cookiesDatat=await cookies()

   const encryptToken =
    cookiesDatat.get("next-auth.session-token")?.value ||
    cookiesDatat.get("__Secure-next-auth.session-token")?.value
    const data=await decode({token:encryptToken,secret:process.env.NEXTAUTH_SECRET!})
   
    return data?.accessToken
}


export async function GetUserId(){
    const token= await GetUserToken()
     if (!token) {
    throw new Error("User token not found");
  }

        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyToken`,{
            method:'get',

            headers:{
                token:token,
               
            }
        })
        
        const data:VerifyToken=await res.json()
        return data.decoded.id
       
}
