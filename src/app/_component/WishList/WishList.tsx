"use client";
import AddToCartBtn from "image/app/_component/AddToCartBtn/AddToCartBtn";
import Loading from "image/app/loading";
import { WishProduct } from "image/types/Wish.type";
import { GetWishlistItems, RemoveProductFromWishlist } from "image/WishlistAction";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "image/Redux/store";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { fetchwish, removewish } from "image/Redux/WishListSlice";
import AddtoCartIcon from "../AddtoCartIcon/AddtoCartIcon";
function WishList() {



    const dispatch = useDispatch<AppDispatch>();
  const { products, count, error,loading } = useSelector(
    (state: RootState) => state.wishList
  );

 
  useEffect(() => {
    dispatch(fetchwish());
   
  }, [dispatch]);
  return (
    <>
    <div className="min-h-screen container m-auto flex justify-center items-center ">
    {loading?<Loading></Loading>
    :<>
    {
        products?.length?<div className="w-3/4 mx-auto my-10">

           <div className='relative mb-0'>
            <p className='text-center text-2xl mt-5 '><i className="fa-regular fa-heart"></i>WISHLIST</p>
            <p className='relative bottom-4 left-1/2 font-bold text-gray-600/30  z-0 -translate-1/2 text-5xl w-fit'>W</p>
        </div>
       

        <div className="relative  overflow-x-auto shadow-md sm:rounded-lg mb-5">
          <table className="w-full hidden lg:block text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">
                  Image
                </th>
                <th className="px-6 py-3">
                   PRODUCT NAME
                </th>
                <th className="px-6 py-3">
                  
                    Category
                   
               </th>
                <th  className="px-6 py-3">
        
                    Price
            
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">ACtions</span>
                </th>
              </tr>
            </thead>
            <tbody>

                {
                 products?.map((product)=>{
                    return <>
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                
                <td className="px-6 py-4">
                    <Image src={product.imageCover} alt={product.title} width={50} height={50}/>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white"
                >
                  {product.title}
                  <p>{product.description}</p>
                </th>
                <td className="px-6 py-4">{product?.category.name}</td>
                <td className="px-6 py-4 ">
                    {
                        product.priceAfterDiscount?
                        <p>
                          <p className=" line-through text-gray-600">{product.price}EGP</p>
                          <p>{product.priceAfterDiscount}EGP
                            </p>
                          </p>
                        :
                        <p>{product.price}EGP</p>
                    }
                </td>
                <td className="px-6 py-4 t flex flex-row justify-center items-center gap-2 ">
                    <Link className="flex justify-center items-center  px-1 py-4" href={`/products/${product._id}`}>
                       <i className="fa text-cyan-700 fa-eye fa-xl cursor-pointer"></i>
                </Link>
                 <AddtoCartIcon id={product._id}/>
                  <button className="flex justify-center items-center  px-1 py-4" >
                       <i className="fa-solid fa-trash text-cyan-700 fa-xl cursor-pointer"></i>
                </button>
                </td>
              </tr>
                    </>
                 })
                }
              
            
            </tbody>
          </table>
          <div className="grid grid-cols-12">
            {
            products?.map((product)=>{
                return (
                <div key={product._id} className="col-span-12 lg:col-span-6 p-3 lg:hidden flex justify-center items-center">
                   <Image src={product.imageCover} alt={product.id} width={100} height={100}/>
                   <div className="p-2">
                      <p>{product.title}</p>
                      <p className="line-clamp-1">{product.description}</p>
                      <div className="flex gap-2 mt-3">
                         <Link className="flex justify-center items-center" href={`/products/${product._id}`}>
                         <i className="fa text-cyan-700 fa-eye cursor-pointer"></i>
                         </Link>
                         <AddtoCartIcon id={product._id}/>
                        <button className=" flex justify-center items-center " onClick={()=>{dispatch(removewish(product._id))}} >
                           <i className="fa-solid fa-trash text-cyan-700 cursor-pointer"></i>
                       </button>
                      </div>
                   </div>
                </div>
                )
            })}
             
          </div>
        </div>
      </div>:
      <div className="w-full h-full  flex justify-center items-center flex-col">
        <Image src='/images/heart.png' alt='brokenHeart' width={200}height={100}></Image>
        <p className="text-2xl text-cyan-700">No product in your wishlist !</p>
        <Link className="p-5 bg-cyan-800 text-white rounded-2xl mt-2" href='/'><span className="text-white">Start Shopping</span></Link>
      </div>
    }
    
    
    </>

    }
      </div>
    </>
  );
}

export default WishList;
