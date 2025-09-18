import React from 'react'
import { Product, ProductData } from 'image/types/product.type'
import ProductCard from 'image/app/_component/ProductCard/ProductCard'
import MainSlide from './_component/MainSlide/MainSlide'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Ourbrands from './_component/Ourbrands/Ourbrands'
import { AddProductToCart } from 'image/cartActions'


async function Page() {
  const sessionData=await getServerSession(authOptions)
  console.log(1000,sessionData)
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data: ProductData =await res.json()
  const productList: Product[]=data.data
  console.log(productList)

 
  return (
    <div className='container mx-auto '>
      <MainSlide></MainSlide>
    
    <Ourbrands/>
    <p className=' text-center text-2xl md:text-3xl mt-10 text-cyan-700'>PRODUCTS</p>
    <div className='w-3/4 mx-auto grid lg:grid-cols-4 md:grid-cols-3  gap-5  mb-10 mt-5 sm:grid-cols-2 grid-cols-1'>
    
       {
       productList.map((item)=>{
        return (
          <div  key={item._id}>
        <ProductCard productdata={item} />
        </div>
        )
       })
       }
       </div>
    </div>
  )
}

export default Page
