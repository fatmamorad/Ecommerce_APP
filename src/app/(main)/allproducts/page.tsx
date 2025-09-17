'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductCard from 'image/app/_component/ProductCard/ProductCard'
import Pagination from 'image/app/_component/Pagination/Pagination'
import { Product, ProductData } from 'image/types/product.type'

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const pageFromUrl = Number(searchParams.get('page')) || 1
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl)
  const [products, setProducts] = useState<Product[]>([])

  // كل ما الصفحة تتغير → نعمل fetch للبيانات
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?page=${currentPage}&limit=10`
      )
      const data: ProductData = await res.json()
      setProducts(data.data)
    }
    fetchProducts()
  }, [currentPage])

  // نغير الصفحة + نحدّث الـ URL
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    router.push(`/allproducts?page=${page}`)
  }

  return (
    <div className="container mx-auto relative min-h-screen">
     <div className='h-full w-full'>
      <div className="relative mb-0">
        <p className="text-center text-2xl mt-15">ALL PRODUCTS</p>
        <p className="relative bottom-4 left-1/2 font-bold text-gray-600/30 z-0 -translate-1/2 text-8xl w-fit">
          A
        </p>
      </div>


      {/* المنتجات */}
      <div className="w-3/4 mx-auto grid lg:grid-cols-4 md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1">
        {products.map((item) => (
          <div key={item._id}>
            <ProductCard productdata={item} />
          </div>
        ))}
      </div>
</div>
      {/* Pagination */}
      <Pagination
        totalPages={6} // من الـ API يفضل
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>

  )
}
