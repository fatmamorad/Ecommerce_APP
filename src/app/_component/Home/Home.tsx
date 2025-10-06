
'use client'
import React, { useEffect } from 'react'
import { Product } from 'image/types/product.type'
import ProductCard from '../ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'image/Redux/store';
import { fetchwish } from 'image/Redux/WishListSlice';
import Loading from 'image/app/loading';
import { fetchCart } from 'image/Redux/CartSlice';

function Home({productList}:{productList:Product[]}) {
     const dispatch = useDispatch<AppDispatch>();
     const {loading } = useSelector(
    (state: RootState) => state.wishList,
    
  );
  const { } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart())
    dispatch(fetchwish()); 
  }, [dispatch])
    return (
        <>

        {loading?<Loading></Loading>:
          <div className='w-3/4 mx-auto grid lg:grid-cols-4 md:grid-cols-3  gap-2  mb-10 mt-5 sm:grid-cols-2 grid-cols-1'>
    
       {
       productList.map((item)=>{
        return (
          <div  key={item._id}>
        <ProductCard productdata={item} />
        </div>
        )
       })
       }
       </div>}
        </>
    )
}

export default Home
