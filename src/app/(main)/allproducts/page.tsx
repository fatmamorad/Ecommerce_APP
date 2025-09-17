import React from 'react'
import { Product, ProductData } from 'image/types/product.type'
import ProductCard from 'image/app/_component/ProductCard/ProductCard'
import { getServerSession } from 'next-auth'
import { AddProductToCart } from 'image/cartActions'
import { authOptions } from 'image/app/api/auth/[...nextauth]/route'
import Pagination from 'image/app/_component/Pagination/Pagination'


async function Page() {
  const sessionData=await getServerSession(authOptions)
  console.log(1000,sessionData)
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`)
  const data: ProductData =await res.json()
  const productList: Product[]=data.data
  console.log(productList)

 
  return (
    <div className='container mx-auto relative'>
        <div className='relative mb-0'>
            <p className='text-center text-2xl mt-15 '> ALL PRODUCTS</p>
            <p className='relative bottom-4 left-1/2 font-bold text-gray-600/30  z-0 -translate-1/2 text-8xl w-fit'>A</p>
        </div>
     <div className='grid grid-cols-12'>
        
    </div>
    <div className='w-3/4 mx-auto grid lg:grid-cols-4 md:grid-cols-3  gap-5  sm:grid-cols-2 grid-cols-1'>
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
      
      <Pagination></Pagination>
    </div>
  )
}

export default Page
