import { brandItem, Brands } from "./types/Brands"
import { Product, ProductData } from "./types/product.type"

export async function GetProductsByBrand(brand:string){
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?brand=${brand}`)
      const data: ProductData =await res.json()
      const productList: Product[]=data.data
      return productList
      console.log(productList)
}



export async function GetProductsByCategories(brand:string){
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?brand=${brand}`)
      const data: ProductData =await res.json()
      const productList: Product[]=data.data
      return productList
      console.log(productList)
}


export async function GetAllBrands(){
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)
      const data: Brands =await res.json()
      const Brands: brandItem[]=data.data
      return Brands
      //console.log(productList)
}


export async function GetAllCategories(){
     const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
      const data: Brands =await res.json()
      const Brands: brandItem[]=data.data
      return Brands
      //console.log(productList)
}