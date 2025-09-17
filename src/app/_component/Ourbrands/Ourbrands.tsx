'use client'

import { getBrands } from "image/productBrandsAction";
import { brandItem } from "image/types/Brands";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";

function Ourbrands() {
 const [brands,setBrands]=useState<brandItem[]>()
 async function  getbrand(){
     const data:brandItem[]=await getBrands()
    setBrands(data)
}
useEffect(()=>{
    getbrand()
    
    
},[])

  const settings = {
    autoplay: true,
    infinite: true,
     autoplaySpeed: 2000,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
   
  };
  return (

       <div className=" w-3/4 mx-auto flex   justify-center items-center">
        < div className=" grid grid-cols-12">
           <Slider {...settings} className=" col-span-12 slider-container sm:max-w-sm md:max-w-md lg:col-span-4 "> 
        {brands?.map((brand)=>{ 
        return(
     
                   <Image key={brand._id}
                  src={brand.image}
                  alt={brand.name}
                  width={300}
                  height={400}
                  className="  p-2 rounded-full "
                />
              
        )})}
        
      </Slider>
      </div>

              </div>
   
  );
}

export default Ourbrands
