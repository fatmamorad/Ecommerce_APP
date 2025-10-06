"use client";
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
  const isInWishlist = false;
  console.log(productdata);
  const percent = Math.round((productdata.ratingsAverage / 5) * 100);
  console.log(percent);
  return (
    
    <Card className="border-0  relative rounded-2xl group my-7  pt-0">
      {productdata.priceAfterDiscount ? (
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
          <div className="absolute top-1 left-1 p-2 text-cyan-700 flex items-center justify-center   rounded-2xl">
            <AddToWishlistIcon id={productdata._id} />
          </div>
        </CardHeader>
         <Link href={`products/${productdata._id}`}>
        {/* <Link href={`products/${productdata.id}`}> */}

        <CardContent className="text-cyan-800 xl:text-x text-sm p-2 relative">
          <p className="font-bold mb-2">
            {productdata.title.split(" ").length > 2
              ? productdata.title.split(" ").slice(0, 2).join(" ")
              : productdata.title}
          </p>
          <p className=" w-full overflow-hidden mt-4 min-h-[60px] max-h-[60px] ">
            {productdata.description}
          </p>
        </CardContent>
      </Link>
      <div className="text-cyan-800 grid grid-cols-12 px-2 items-center">
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
          <AddtoCartIcon id={productdata._id}></AddtoCartIcon>
        </p>
      </div>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default ProductCard;
