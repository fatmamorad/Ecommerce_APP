'use client'
import {  useEffect, useState } from 'react'
import {ClearCart, GetCartItems, RemoveProductFromCart, UpdateCount} from "image/cartActions"
import Image from 'next/image'
import Loading from 'image/app/loading'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'image/Redux/store'
import { clearCartAsync, fetchCart, removeProductAsync, updateProductCountAsync } from 'image/Redux/CartSlice'
 function CartView() {
   const dispatch = useDispatch<AppDispatch>();
    const { products,totalPrice ,loading,cartId } = useSelector(
    (state: RootState) => state.cart)
    const [countDisabled,setCountDisabled]=useState<boolean>(false)
  
    useEffect(()=>{dispatch(fetchCart())},[])
   return (
  <>
    {loading ? (
      <Loading />
    ) : (
      <>
        {!products || products.length === 0 ? (
          <div className="min-h-screen flex justify-center items-center">
            <Image src="/empty.png" alt="empty" width={300} height={300} />
          </div>
        ) : (
          <div className="w-11/12 lg:w-3/4 mx-auto mt-6">
            <div className="grid grid-cols-12 p-4 items-center">
              <p className="my-3 text-lg md:text-2xl font-semibold col-span-6">
                Shopping Cart
              </p>
              <div className="col-span-6 text-end">
                <button
                 onClick={()=>{dispatch(clearCartAsync())}}
                  className="px-4 py-2 text-xs md:text-sm lg:text-base text-white rounded-xl bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200"
                >
                  Clear your cart
                </button>
              </div>
            </div>
            <div className="space-y-4 lg:hidden">
              {products.map((cartProduct) => (
                <div
                  key={cartProduct._id}
                  className="flex items-center gap-4 bg-white shadow-md rounded-xl p-3"
                >
                  <Image
                    src={cartProduct.product.imageCover}
                    alt={cartProduct.product.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm p-1">{cartProduct.product.title}</p>
                    <p className="text-xs text-gray-500">
                      {cartProduct.product.category.name}
                    </p>
                    <div className="flex items-center gap-2 p-3 ">
                      <button
                        disabled={countDisabled}
                        onClick={() =>
                          dispatch(updateProductCountAsync({ id: cartProduct.product._id, count: cartProduct.count+1 }))
                        }
                      >
                        <i className="fa fa-plus-circle  text-cyan-700"></i>
                      </button>
                      <span>{cartProduct.count}</span>
                      <button
                      className='cursor-pointer'
                        disabled={countDisabled}
                        onClick={() =>
                          dispatch(updateProductCountAsync({ id: cartProduct.product._id, count: cartProduct.count-1 }))
                        }
                      >
                        <i className="fa fa-minus-circle text-cyan-700"></i>
                      </button>
                      <button
                      className='cursor-pointer ms-3 text-red-500'
                        onClick={() => dispatch(removeProductAsync(cartProduct.product._id))}
                        
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    ${cartProduct.price * cartProduct.count}
                  </p>
                </div>
              ))}
            </div>

            {/* Table (Desktop) */}
            <div className="hidden lg:block overflow-x-auto shadow-md rounded-xl mt-6">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Qty</th>
                    <th className="px-6 py-3">Delete</th>
                    <th className="px-6 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((cartProduct) => (
                    <tr
                      key={cartProduct._id}
                      className="bg-white  hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <Image
                          src={cartProduct.product.imageCover}
                          alt={cartProduct.product.title}
                          width={70}
                          height={70}
                          className="rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4">{cartProduct.product.title}</td>
                      <td className="px-6 py-4">{cartProduct.product.category.name}</td>
                      <td className="px-6 py-4 gap-2">
                        <div className='flex justify-center'>
                        <button
                          className='cursor-pointer'
                          onClick={() =>
                            dispatch(updateProductCountAsync({ id: cartProduct.product._id, count: cartProduct.count+1 }))
                          }
                        >
                          <i className="fa fa-plus-circle text-cyan-700"></i>
                        </button>
                        <span>{cartProduct.count}</span>
                        <button
                      className='cursor-pointer'
                          onClick={() =>
                            dispatch(updateProductCountAsync({ id: cartProduct.product._id, count: cartProduct.count-1 }))
                          }
                        >
                          <i className="fa fa-minus-circle text-cyan-700"></i>
                        </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => dispatch(removeProductAsync(cartProduct.product._id))}
                          className="text-red-500"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        ${cartProduct.price * cartProduct.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full lg:w-1/3 ml-auto">
              <div className="flex justify-between mb-3 text-gray-700">
                <span>Total:</span>
                <span className="font-semibold">{totalPrice} LE</span>
              </div>
              <Link
                href={`/checkout/${cartId}`}
                className="block text-center py-2 rounded-xl  border border-cyan-800 transition-all"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </>
    )}
  </>
);

}

export default CartView
