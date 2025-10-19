'use client'

import { AppDispatch, RootState } from 'image/Redux/store';
import { addwishList } from 'image/Redux/WishListSlice';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
function AddToWishlistIcon({id}: {id:string}) {
  const {  status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector(
    (state: RootState) => state.wishList
  );
  function addToWishlist(id:string){
     if(status==="unauthenticated"){
      toast.error("Please Login First!",{
        position:"top-center"
      })
     }
     else{
      dispatch(addwishList(id))
     }
  }
  
  const inWishlist=products?.some((p)=>p._id===id)
    return (
        <>
         <button onClick={()=>{addToWishlist(id)}} className='cursor-pointer' >
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
