import React from 'react'
import { Product, ProductData } from 'image/types/product.type'
import ProductCard from 'image/app/_component/ProductCard/ProductCard'
import MainSlide from './_component/MainSlide/MainSlide'
import Home from './_component/Home/Home'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Ourbrands from './_component/Ourbrands/Ourbrands'
import { AddProductToCart } from 'image/cartActions'


async function Page() {
  const sessionData=await getServerSession(authOptions)
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?limit=12`)
  const data: ProductData =await res.json()
  const productList: Product[]=data.data
  console.log(productList)
  return (
    <div className='container mx-auto '>
    <MainSlide></MainSlide>
    <Ourbrands/>
    <p className=' text-center text-2xl md:text-3xl mt-10 text-cyan-700'>PRODUCTS</p>
    <Home productList={productList}></Home>
    </div>
  )
}

export default Page
