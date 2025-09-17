'use client'

import Image from "next/image";
import React from "react";
import Slider from "react-slick";


export default function MainSlide() {
  let settings = {
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow:false,
    autoplay: true,
  };
  return (
    <div className="w-3/4 mx-auto my-20">
      <div className="grid grid-cols-12 gap-5 ">
        
        <div className="lg:col-span-12  col-span-12 h-full rounded-2xl">
          <Slider {...settings} className="rounded-2xl">
            <div className="rounded-2xl  bg-red-500">
              <div>
              <Image 
                src='/images/shose.png' 
                alt="image1" 
                width={200} 
                height={100} 
                className="  rounded-2xl object-cover"
              />
              </div>
            </div>
            <div className=" rounded-2xl">
              <Image 
                src='/images/slider-image-2.jpeg' 
                alt="image2" 
                width={200} 
                height={100} 
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div className="rounded-2xl">
              <Image 
                src='/images/slider-image-1.jpeg' 
                alt="image3" 
                width={200} 
                height={100} 
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
