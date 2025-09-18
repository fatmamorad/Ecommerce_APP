"use client";

import Image from "next/image";

import Slider from "react-slick";
import { Italianno } from "next/font/google";

const Encode_ABeeZee_Font = Italianno({
  subsets: ["latin"],
  weight: "400",
});

export default function MainSlideAC() {
  const settings = {
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    autoplay: true,
  };
  return (
    <div className="w-3/4 mx-auto mt-20">
      <div className="grid grid-cols-12 gap-5 ">
        <div className="lg:col-span-12  col-span-12 h-full rounded-2xl">
          <Slider {...settings} className="rounded-2xl">
            <div className="rounded-2xl">
              <div className="relative">
                <Image
                  src="/images/man.jpg"
                  alt="image1"
                  width={200}
                  height={100}
                  className="w-full h-full  rounded-2xl object-cover"
                />
                <div className="absolute top-1/2 left-1/5 -translate-1/2">
                  <p className="font-bold">FOR</p>
                  <p className="lg:text-6xl text-xl relative font-bold text-cyan-700">
                    ONLINE 
                    <span
                      className={`absolute bg-cyan-700 lg:text-4xl rounded-full lg:py-4 lg:px-6 py-2  px-4 block text-xs -right-19 -top-5 font-normal text-white md:-top-20 text-center lg:-right-40  rotate-12 -translate-y-1.5  ${Encode_ABeeZee_Font.className}`}
                    >
                      ORDER
                      <p>30%</p>
                      <p>OFF</p>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl">
              <Image
                src="/images/woman.png"
                alt="image2"
                width={200}
                height={100}
                className="w-full h-full rounded-2xl object-cover"
              />
              <div className="absolute top-1/2 left-1/4 -translate-1/2">
                <p className="font-bold">NEW ARRIVALS</p>
                <p className="lg:text-7xl text-xl relative font-bold text-cyan-700">
                  JUST FOR
                  <span
                    className={`absolute block lg:text-7xl text-xl font-normal text-black lg:top-15 top-5 md:left-1/4 md:-translate-y-1.5 -rotate-15 ${Encode_ABeeZee_Font.className}`}
                  >
                    YOU
                  </span>
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
