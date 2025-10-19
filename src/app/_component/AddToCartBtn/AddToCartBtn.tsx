"use client";
import { addProductAsync } from "image/Redux/CartSlice";
import { AppDispatch } from "image/Redux/store";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
function AddToCartBtn({ id }: { id: string }) {
  const {  status } = useSession();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  async function AddToCart(id: string) {
   if(status==="unauthenticated"){
      toast.error("Please Login First!",{
        position:"top-center"
      })
     }
     else{
     try {
      setLoading(true);
      await dispatch(addProductAsync(id)).unwrap();
    } finally {
      setLoading(false);
    }
     }
    
  }
  return (
    <>
    { 
        !loading?
          <button
        onClick={() => {
          AddToCart(id);
        }}
        className="w-1/2 md:w-3/4 bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200 my-3 lg:p-2 p-1  rounded-2xl text-white font-medium"
      >
        Add To Cart
      </button>:
        <button className="w-1/2 md:w-3/4 bg-cyan-800 hover:bg-white hover:text-cyan-950 hover:border hover:border-cyan-800 transition-all duration-200 my-3 lg:p-2 p-1  rounded-2xl text-white font-medium">
            <i className="fa-solid fa-spinner fa-spin"></i>
        </button>
    }
    </>
  );
}

export default AddToCartBtn;
