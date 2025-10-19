import React from 'react'
export const metadata = {
  title: "Cartify — Your Modern E-commerce Store",
  description: "Discover the best deals and products at Cartify — shop smart, shop easy!",
  openGraph: {
    title: "Cartify — Your Modern E-commerce Store",
    description: "Discover the best deals and products at Cartify — shop smart, shop easy!",
    url: "https://cartify-ecommerce-black.vercel.app/",
    siteName: "Cartify",
    images: [
      {
        url: "https://cartify-ecommerce-black.vercel.app/og-image.jpg", // ← غيّريها إلى لينك صورة حقيقية
        width: 1200,
        height: 630,
        alt: "Cartify — Shop Smart, Shop Easy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartify — Your Modern E-commerce Store",
    description: "Discover the best deals and products at Cartify!",
    images: ["https://cartify-ecommerce-black.vercel.app/og-image.jpg"], // نفس الصورة
  },
};

function Loading() {
   
    return (
        <>
        <div className='w-3/4 h-screen mx-auto flex justify-center items-center'>
          <span className='loader'></span>
        </div>
        </>
    )
}

export default Loading
