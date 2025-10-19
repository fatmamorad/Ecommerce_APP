"use client";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "image/Redux/store";
import { useState } from "react";
import { addProductAsync } from "image/Redux/CartSlice";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
function AddtoCartIcon({ id }: { id: string }) {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  async function addProdcut(id: string) {
    if (status === "unauthenticated") {
      toast.error("Please Login First!", {
        position: "top-center",
      });
    } else {
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
      {!loading ? (
        <button
          onClick={() => {
            addProdcut(id);
          }}
          className="cursor-pointer"
        >
          <i className=" fa-xl font-semiboldfa fa text-cyan-700 fa-cart-shopping"></i>
        </button>
      ) : (
        <button className="">
          <i className="fa-xl fa-solid fa-spinner fa-spin"></i>
        </button>
      )}
    </>
  );
}

export default AddtoCartIcon;
