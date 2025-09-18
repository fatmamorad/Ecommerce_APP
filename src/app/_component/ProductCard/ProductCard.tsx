import React from "react";
import {
  Card,
 
  CardContent,
  
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { Product, ProductData } from "image/types/product.type";
import Image from "next/image";
import Link from "next/link";
import AddtoCartIcon from "../AddtoCartIcon/AddtoCartIcon";
import AddToWishlistIcon from "../AddToWishlistIcon/AddToWishlistIcon";

function ProductCard({ productdata }: { productdata: Product }) {
   const isInWishlist=false
  console.log(productdata);
  const percent = Math.round((productdata.ratingsAverage / 5) * 100);
  console.log(percent);
  return (
    
      <Card className="border-0  relative rounded-2xl group my-10  pt-0">
  
         {productdata.priceAfterDiscount   ? (
          <p className="absolute z-1 top-0 right-0 p-3 bg-cyan-700  text-white rounded-tr-2xl rounded-tl-2xl rounded-br-2xl">
            Sale
          </p>
        ) : (
          ""
        )}
         <CardHeader className="p-0 mt-0 relative h-50">
            <Image
              src={productdata.imageCover}
              alt={productdata.title}
              width={200}
              height={20}
              className="w-full h-full absolute rounded-2xl object-contain "
            />
            <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
             <AddToWishlistIcon id={productdata._id} isInWishlist={isInWishlist}/>
              <Link href={`/products/${productdata._id}`}>
                <i className="text-lg tec font-semibold fa-regular fa-xl text-white fa-eye"></i>
              </Link>

               <AddtoCartIcon id={productdata._id}></AddtoCartIcon>
            </div>
          </CardHeader>
        <Link href={`products/${productdata.id}`}>
       
        <CardContent className="text-cyan-800    xl:text-x text-sm">
          <p className=" font-bold mb-3 ">
            {productdata.title.split(" ").length > 2
              ? productdata.title.split(" ").slice(0, 2).join(" ")
              : productdata.title}
          </p>
          <div className="">
              <AddToWishlistIcon id={productdata._id} isInWishlist={isInWishlist}/>
              <Link href={`/products/${productdata._id}`}>
                <i className="text-lg tec font-semibold fa-regular fa-xl text-cyan-700 fa-eye"></i>
              </Link>
          </div>
          <p className=" w-full line-clamp-3 overflow-hidden my-4 min-h-[60px]">{productdata.description}</p>
         
       <div className="text-cyan-800 grid grid-cols-12 items-center h-8">
  {!productdata.priceAfterDiscount ? (
    <p className="col-span-6 text-left text-xs">
      {productdata.price} EGP
    </p>
  ) : (
    <p className="col-span-6 text-left text-xs">
      <span className="line-through text-gray-500">
        {productdata.price} EGP
      </span>{" "}
      <span>{productdata.priceAfterDiscount} EGP</span>
    </p>
  )}

  <p className="col-span-6 text-right flex items-center justify-end gap-1 text-xs">
    {productdata.ratingsQuantity}
    <i className="fa fa-star text-yellow-400"></i>
  </p>
</div>

        </CardContent>
        <CardFooter>
          
        </CardFooter>
        </Link>
      </Card>
 
  );
}

export default ProductCard;
