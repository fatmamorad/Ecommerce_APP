'use client'
import { CounterContext } from 'image/app/CounterProvider';
import { AddProductToCart, GetCartItems } from 'image/cartActions'
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "image/Redux/store";
import { CartData } from 'image/types/cart.type';
import  { useContext, useState } from 'react'
import { toast } from 'sonner'
import { addProductAsync } from 'image/Redux/CartSlice';
function AddtoCartIcon({id}: {id:string}) {
    // const { loading } = useSelector((state: RootState) => state.cart)
    const [loading ,setLoading]=useState(false)
    const dispatch = useDispatch<AppDispatch>();
    async function addProdcut(id:string){
        try{ 
            setLoading(true)
            
      await dispatch(addProductAsync(id)).unwrap();
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <>
        {!loading?
          <button onClick={()=>{addProdcut(id)}} className='cursor-pointer'>
             <i className=" fa-xl font-semiboldfa fa text-cyan-700 fa-cart-shopping"></i>
          </button>:
          <button className=''>
             <i className="fa-xl fa-solid fa-spinner fa-spin"></i>
          </button>
          }

        </>
    )
}

export default AddtoCartIcon
