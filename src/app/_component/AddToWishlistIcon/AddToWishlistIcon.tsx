'use client'

import { AddProductToWishlist } from 'image/WishlistAction'
import  { useState } from 'react'
import { toast } from 'sonner'
function AddToWishlistIcon({id,isInWishlist=false}: {id:string,isInWishlist:boolean}) {
    const [inWishlist, setInWishlist] = useState<boolean>(isInWishlist)
    async function  AddToWish(id:string){
        const data=await AddProductToWishlist(id)
        console.log(data)
        if(data.status==='success'){
            setInWishlist(true)
            toast.success(data.message,{
                position:'top-center',
            })
        }
        else{
             toast.error(data.message,{
                position:'top-center',
            })
        }
        
    }
    return (
        <>
         <button onClick={()=>{AddToWish(id)}} className='cursor-pointer' >
          {inWishlist ? (
        <i className='fa-solid fa-heart fa-xl text-red-500'></i> 
      ) : (
        <i className='fa-regular fa-heart fa-xl'></i>
      )}
          </button>
        </>
    )
}

export default AddToWishlistIcon
