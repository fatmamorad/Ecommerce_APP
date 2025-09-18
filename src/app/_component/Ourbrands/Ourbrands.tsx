'use client'

import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import { getBrands } from 'image/productBrandsAction'
import { brandItem } from 'image/types/Brands'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Ourbrands() {
  const [brands, setBrands] = useState<brandItem[]>([])

  useEffect(() => {
    getBrands().then((data) => setBrands(data || []))
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <div className="w-3/4 mx-auto mt-10 lg:mt-25 px-4">
      <Slider {...settings} >
        {brands?.map((brand) => (
          <div key={brand._id} className="px-2">
            <div className="flex items-center justify-center p-4  ">
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={150}
                className="object-contain w-full h-auto "
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}
