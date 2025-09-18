'use client'
import Image from "next/image";

import Slider from "react-slick";

function DetailsSlider({images}:{images:string[]}) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
       <div className="lg:col-span-4 col-span-12 flex justify-center items-center   h-full  rounded-2xl">
           <Slider {...settings} className=" col-span-12 slider-container max-w-[100px] md:max-w-md lg:col-span-4 flex justify-center items-center "> 
        {images.map((img)=>{ 
        return(
                   <Image
                  src={img}
                  alt="image"
                  width={400}
                  height={400}
                  className="w-full h-full  rounded-xl shadow-md"
                />
        )})}
        
      </Slider>

              </div>
   
  );
}

export default DetailsSlider;
