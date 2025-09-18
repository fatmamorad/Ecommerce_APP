import Link from "next/link"
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn"
import { RemoveProductFromWishlist } from "image/WishlistAction"


function Wishlistbtns({id}:{id:string}) {
     async function DeleteIteminWihList(id:string) {
       
        let data = await RemoveProductFromWishlist(id)
        console.log(data)
         
          }
    return (
        <>
          <Link className="border-cyan-800 flex justify-center items-center border-1 px-1 py-4" href={`/products/${id}`}>
                               <i className="fa text-cyan-700 fa-eye fa-xl cursor-pointer"></i>
                        </Link>
                         <AddToCartBtn id={id}/>
                          <button className="border-cyan-800 flex justify-center items-center border-1 px-1 py-4" onClick={()=>{DeleteIteminWihList(id)}}>
                               <i className="fa-solid fa-trash text-cyan-700 fa-xl cursor-pointer"></i>
                        </button>
        </>
    )
}

export default Wishlistbtns
