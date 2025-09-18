'use client'
import { useContext, useEffect, useState } from 'react'
import {ClearCart, GetCartItems, RemoveProductFromCart, UpdateCount} from "image/cartActions"
import { CartData } from 'image/types/cart.type'
import { Cart } from 'image/types/cart.type'
import Image from 'next/image'
import Loading from 'image/app/loading'
import { toast } from 'sonner'
import { CounterContext } from 'image/app/CounterProvider'
import Link from 'next/link'
 function CartView() {
    const countContext=useContext(CounterContext)
    const [loading,setLoading]=useState<boolean>(false)
    const [countDisabled,setCountDisabled]=useState<boolean>(false)
    const [CartItems,setCartItems]=useState<Cart>()
    const [CartId,setCartId]=useState<string>()
 
    async function getcartItems(){
        setLoading(true);
        const data: CartData = await GetCartItems();
        let count = 0;
        data.data.products.forEach((item) => {
          count += item.count;
        });
        setCartId(data.cartId)
        countContext.setCount(count);
        setLoading(false);
        setCartItems(data.data);
    }

    async function ChageQuentity(count:number,id:string){
            if (count > 0) {
              setCountDisabled(true);
              const data: CartData = await UpdateCount(id, count);
              let sum = 0;
              data.data.products.forEach((item) => {
                sum += item.count;
              });
              countContext.setCount(sum);
              setCountDisabled(false);
              setCartItems(data.data);
            } else {
              RemoveFromCart(id);
            }
    }

    async function RemoveFromCart(id:string){
        const data:CartData=await RemoveProductFromCart(id)
        console.log(500,data)
        if(data.status==='success'){
                    let count=0
           data.data.products.forEach((item)=>{
            count+=item.count
           })
           countContext.setCount(count)

            toast.success("Product Deleted",{
                position:'top-center',
            })
            setCartItems(data.data)
        }
        
        }
    async function ClearCartData(){
        const data=await ClearCart()
        if(data.message==='success'){
            let count=0
          //  const countContext=useContext(CounterContext)
            countContext.setCount(count)
            getcartItems()
        }
        console.log(50100,data)
    
        
    }
    
    useEffect(()=>{getcartItems()},[])
   return (
  <>
    {loading ? (
      <Loading />
    ) : (
      <>
        {!CartItems ? (
          <div className="h-full flex justify-center items-center">
            <Image src="/empty.png" alt="empty" width={300} height={300} />
          </div>
        ) : (
          <div className="w-11/12 lg:w-3/4 mx-auto mt-6">
            {/* Header */}
            <div className="grid grid-cols-12 p-4 items-center">
              <p className="my-3 text-lg md:text-2xl font-semibold col-span-6">
                Shopping Cart
              </p>
              <div className="col-span-6 text-end">
                <button
                  onClick={ClearCartData}
                  className="px-4 py-2 text-xs md:text-sm lg:text-base text-white rounded-xl bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200"
                >
                  Clear your cart
                </button>
              </div>
            </div>

            {/* Products List (Mobile Friendly Cards) */}
            <div className="space-y-4 lg:hidden">
              {CartItems?.products.map((cartProduct) => (
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
                    <p className="font-medium text-sm">{cartProduct.product.title}</p>
                    <p className="text-xs text-gray-500">
                      {cartProduct.product.category.name}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        disabled={countDisabled}
                        onClick={() =>
                          ChageQuentity(cartProduct.count + 1, cartProduct.product._id)
                        }
                      >
                        <i className="fa fa-plus-circle text-cyan-700"></i>
                      </button>
                      <span>{cartProduct.count}</span>
                      <button
                        disabled={countDisabled}
                        onClick={() =>
                          ChageQuentity(cartProduct.count - 1, cartProduct.product._id)
                        }
                      >
                        <i className="fa fa-minus-circle text-cyan-700"></i>
                      </button>
                      <button
                        onClick={() => RemoveFromCart(cartProduct.product._id)}
                        className="ms-3 text-red-500"
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
                  {CartItems?.products.map((cartProduct) => (
                    <tr
                      key={cartProduct._id}
                      className="bg-white border-b hover:bg-gray-50"
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
                      <td className="px-6 py-4 flex items-center gap-2">
                        <button
                          disabled={countDisabled}
                          onClick={() =>
                            ChageQuentity(cartProduct.count + 1, cartProduct.product._id)
                          }
                        >
                          <i className="fa fa-plus-circle text-cyan-700"></i>
                        </button>
                        <span>{cartProduct.count}</span>
                        <button
                          disabled={countDisabled}
                          onClick={() =>
                            ChageQuentity(cartProduct.count - 1, cartProduct.product._id)
                          }
                        >
                          <i className="fa fa-minus-circle text-cyan-700"></i>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => RemoveFromCart(cartProduct.product._id)}
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
              <p className="uppercase font-bold border-b pb-2 mb-3">Summary</p>
              <div className="flex justify-between mb-3 text-gray-700">
                <span>Total:</span>
                <span className="font-semibold">{CartItems?.totalCartPrice} LE</span>
              </div>
              <Link
                href={`/checkout/${CartId}`}
                className="block text-center py-2 rounded-xl bg-cyan-800 text-white hover:bg-white hover:text-cyan-800 hover:border hover:border-cyan-800 transition-all"
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
