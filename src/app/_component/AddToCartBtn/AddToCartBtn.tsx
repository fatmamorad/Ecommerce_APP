'use client'
import { AddProductToCart } from 'image/cartActions'

import { toast } from 'sonner'
function AddToCartBtn({id}: {id:string}) {

    async function  AddToCart(id:string){
        const data=await AddProductToCart(id)
        console.log(data)
        if(data.status==='success'){
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
         <button onClick={()=>{AddToCart(id)}} className=" w-3/4 bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200 my-3 lg:p-2 p-1  rounded-2xl text-white font-medium">
            Add To Cart
          </button>
        </>
    )
}

export default AddToCartBtn
