'use client'
import Image from "next/image";
import Slider from "react-slick";

function DetailsSlider({ images }: { images: string[] }) {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="lg:col-span-4 col-span-12 flex justify-center items-center h-full rounded-2xl">
      <Slider {...settings} className="w-full slider-container">
        {images.map((img, i) => (
          <div key={i} className="flex justify-center items-center">
            <Image
              src={img}
              alt={`image-${i}`}
              width={400}
              height={400}
              className="w-full h-auto max-h-[400px] object-contain rounded-xl shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DetailsSlider;
