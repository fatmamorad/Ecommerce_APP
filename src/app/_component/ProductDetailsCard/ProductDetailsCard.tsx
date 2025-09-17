import { Product } from "image/types/product.type"
import Image from "next/image"
import React from "react"
import DetailsSlider from "../DetailsSlider/DetailsSlider"
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn"

function ProductDetailsCard({ productt }: { productt: Product }) {
  console.log(productt)
  return (
    <div className="w-3/4 mx-auto c my-10   justify-center grid grid-cols-12  gap-6 p-4">
 
       <DetailsSlider  images={productt.images}></DetailsSlider>
   
      <div className="lg:col-span-8 col-span-12 
      flex flex-col justify-center items-center px-4 lg:px-10">
        <p className="text-lg font-semibold mb-2">{productt.title}</p>
        <p className="text-gray-600 mb-4">{productt.description}</p>

        <div className="grid grid-cols-2 items-center mb-4">
          <p className="text-left text-xl font-bold text-cyan-900">
            {productt.price} EGP
          </p>
          <p className="text-right flex items-center justify-end gap-1 text-sm">
            {productt.ratingsQuantity}
            <i className="fa fa-star text-yellow-400"></i>
          </p>
        </div>

        {productt.quantity > 0 ? (
         <AddToCartBtn id={productt._id}></AddToCartBtn>
        ) : (
          <button className="w-full bg-gray-400 my-3 p-3 rounded-2xl cursor-not-allowed text-white font-medium">
            Out Of Stock
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductDetailsCard
