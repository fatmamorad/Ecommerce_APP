'use client'

import { AppDispatch, RootState } from 'image/Redux/store';
import { addwishList } from 'image/Redux/WishListSlice';
import { useDispatch, useSelector } from 'react-redux';
function AddToWishlistIcon({id}: {id:string}) {
     const dispatch = useDispatch<AppDispatch>();
  const { products, count, error,loading } = useSelector(
    (state: RootState) => state.wishList
  );
  
  const inWishlist=products?.some((p)=>p._id===id)
    return (
        <>
         <button onClick={()=>{dispatch(addwishList(id))}} className='cursor-pointer' >
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
