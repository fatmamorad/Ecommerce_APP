"use client";

import Image from "next/image";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Button } from "image/components/ui/button";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Discover Our New Collection",
    description:
      "Upgrade your style with the latest arrivals. Trendy, comfortable, and affordable fashion just for you.",
    image: "/images/man.jpg",
    cta: "Start Shopping",
  },
  {
    id: 2,
    title: "Electronics That Brighten Your Life",
    description:
     "Get the power you deserve with our electronics line. Perfect for all lifestyles",
    image: "/images/bann1.jpeg",
    cta: "Start Shopping",
  },
  {
    id: 3,
    title: "Exclusive Deals Just For You",
    description:
      "Don’t miss out on our limited-time discounts across multiple categories.",
    image: "/images/girl.jpg",
    cta: "Start Shopping",
  },
];

export default function MainSlide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
  };

  return (
    <div className="relative w-3/4 mx-auto h-[80vh]  mt-10 overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide) => (
            <div key={slide.id} className="relative w-full h-[90vh]  bg-red-500">
              <div className="absolute inset-0 ">
                <Image src={slide.image}  alt={slide.title} fill priority className="object-cover" />
              </div>
               <div className="absolut inset-0 bg-black/20 w-full h-[90vh]">
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
                  <p className="text-white  lg:text-xl my-2 md:text-lg text-s">{slide.title}</p>
                  <p className="text-white  text-center p-2  lg:text-2xl my-2 md:text-lg text-xs">{slide.description}</p>
                  <Link href="/allproducts" className="cursor-pointer p-2  mt-3 lg:p-3 bg-cyan-800 !text-white rounded-xl">
                  <p className=" lg:text-lg text-sm  ">{slide.cta}</p></Link>
                  </div>
                 
              </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
