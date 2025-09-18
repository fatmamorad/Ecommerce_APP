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
                <Image src="/empty.png" alt="empty" width={500} height={500} />
              </div>
            ) : (
              <div className="w-3/4 mx-auto mt-10">
                <div className="grid grid-cols-12 p-4">
                  <p className="my-5 text-xl text-start col-span-6 ">
                    Shopping Cart
                  </p>
                  <div className="col-span-6 text-end">
                    <button
                      onClick={() => {
                        ClearCartData();
                      }}
                      className="p-4 text-white rounded-2xl bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200"
                    >
                      Clear your cart
                    </button>
                  </div>
                </div>
                <div className="relative grid grid-cols-12  grid-rows-12 gap-2 overflow-x-auto shadow-lg sm:rounded-lg">
                  <table className="w-full col-span-10 row-span-12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-[#eaf1f1] dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Product Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Delete
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {CartItems?.products.map((cartProduct) => {
                        return (
                          <tr
                            key={cartProduct._id}
                            className=" border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200  dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Image
                                src={cartProduct.product.imageCover}
                                alt={cartProduct.product.title}
                                width={80}
                                height={80}
                                className="rounded-2xl"
                              />
                            </th>
                            <td className="px25 py-4">
                              <p>{cartProduct.product.title}</p>
                              <p>
                                {cartProduct.product.brand.image && (
                                  <Image
                                    src={cartProduct.product.brand.image}
                                    alt={cartProduct.product.brand.name}
                                    width={50}
                                    height={50}
                                  />
                                )}
                              </p>
                            </td>
                            <td className="px-2 py-4">
                              {cartProduct.product.category.name}
                            </td>
                            <td className="px-2 py-4">
                              <button
                                disabled={countDisabled}
                                className="cursor-pointer"
                                onClick={() => {
                                  ChageQuentity(
                                    (cartProduct.count += 1),
                                    cartProduct.product._id
                                  );
                                }}
                              >
                                <i className="fa fa-plus-circle fa-xl"></i>
                              </button>
                              <span className="mx-2">{cartProduct.count}</span>
                              <button
                                disabled={countDisabled}
                                className="cursor-pointer"
                                onClick={() => {
                                  ChageQuentity(
                                    (cartProduct.count -= 1),
                                    cartProduct.product._id
                                  );
                                }}
                              >
                                <i className="fa fa-minus-circle fa-xl"></i>
                              </button>
                            </td>
                            <td className="px-2 py-4 ">
                              <button
                                onClick={() => {
                                  RemoveFromCart(cartProduct.product._id);
                                }}
                                className="text-center ms-3 cursor-pointer my-2 "
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                            <td className="px-2 py-4">
                              ${cartProduct.price * cartProduct.count}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="col-span-2 place-content-e row-span-6 bg-white text-xs font-bold text-gray-700 uppercase">
                    <p className="text-start uppercase p-2 border-b-gray-700 border-b-1 ">
                      summary
                    </p>
                    <div className="grid grid-cols-12 p-2 my-3">
                      <p className="lg:col-span-6 col-span-12">Total :</p>
                      <p className="lg:col-span-6 col-span-12 text-end">
                        {CartItems?.totalCartPrice}
                      </p>
                    </div>
                     <div className='flex justify-center mt-15 items-center '>
                    <Link href={`/checkout/${CartId}`}className="p-4   rounded-2xl bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200"
                    > Ckeckout</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
}

export default CartView
