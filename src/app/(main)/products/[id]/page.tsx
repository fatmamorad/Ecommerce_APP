
import ProductDetailsCard from 'image/app/_component/ProductDetailsCard/ProductDetailsCard'
import { Product } from 'image/types/product.type'

async function Page({params}:{params:{id:string}}) {
    const {id}=await params
    console
    const res=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    const data=await res.json()
   console.log(data)
    const ProductDetails:Product=data.data
    return (
        <>
          <ProductDetailsCard productt={ProductDetails}></ProductDetailsCard>
        </>
    )
}

export default Page
