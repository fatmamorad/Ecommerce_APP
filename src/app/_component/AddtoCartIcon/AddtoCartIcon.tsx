'use client'
import { useDispatch } from "react-redux";
import type { AppDispatch } from "image/Redux/store";
import  { useState } from 'react'
import { addProductAsync } from 'image/Redux/CartSlice';
function AddtoCartIcon({id}: {id:string}) {
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
