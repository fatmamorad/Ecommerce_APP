"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "image/app/_component/ProductCard/ProductCard";
import Pagination from "image/app/_component/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "image/Redux/store";
import Loading from "image/app/loading";
import {
  fetchProducts,
  setCategory,
  setPage,
  fetchAllCate,
  setBrand,
  fetchAllBrands,
} from "image/Redux/Filteration";
export default function AllProductsView() {
  const dispatch = useDispatch<AppDispatch>();
  const [showBrands, setShowBrands] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const {
    page,
    loading,
    cateory,
    allCategories,
    numberOfPages,
    allBrand,
    products,
    filterdProduct,
    brand,
  } = useSelector((state: RootState) => state.filter);
  useEffect(() => {
    console.log(200, page);
    if (brand.id && cateory.id) {
      dispatch(
        fetchProducts({ page: page, brand: brand.id, category: cateory.id })
      );
    } else if (cateory.id) {
      dispatch(
        fetchProducts({ page: page, brand: "all", category: cateory.id })
      );
    } else if (brand.id) {
      dispatch(fetchProducts({ page: page, brand: brand.id, category: "all" }));
    } else {
      dispatch(fetchProducts({ page: page, brand: "all", category: "all" }));
    }
    dispatch(fetchAllBrands());
    dispatch(fetchAllCate());
  }, [dispatch, page, brand.id, cateory.id]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    router.push(`/allproducts?page=${page}`);
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="w-1/2 md:w-3/4 mx-auto relative min-h-screen">
            <div className="h-full w-full">
              <div className="relative mb-0">
                <p className="text-center text-2xl mt-8">ALL PRODUCTS</p>
                <p className="relative bottom-4 left-1/2 font-bold text-gray-600/30 z-0 -translate-1/2 text-5xl w-fit">
                  A
                </p>
              </div>
            </div>

            <div className="w-3/4  mx-auto grid grid-cols-12 gap-4 px-3">
              <div className="relative col-span-12 sm:col-span-2 w-full">
                <button
                  className="w-full border cursor-pointer border-gray-400 py-2 px-4 rounded-2xl bg-white hover:bg-gray-50 transition"
                  onClick={() => {
                    setShowBrands(!showBrands);
                    setShowCategory(false);
                  }}
                >
                  {brand.name}
                </button>
                {showBrands && (
                  <ul className="absolute left-0 right-0 mt-2 border bg-white border-gray-400 rounded-2xl w-full px-4 py-2 top-9 max-h-52 overflow-y-auto custom-scrollbar z-[100]">
                    {allBrand.map((item) => (
                      <li
                        key={item._id}
                        onClick={() => {
                          dispatch(setBrand({ name: item.name, id: item._id }));
                          setShowBrands(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative col-span-12 sm:col-span-2 w-full">
                <button
                  className="w-full border cursor-pointer border-gray-400 py-2 px-4 rounded-2xl bg-white hover:bg-gray-50 transition"
                  onClick={() => {
                    setShowCategory(!showCategory);
                    setShowBrands(false);
                  }}
                >
                  {cateory.name}
                </button>

                {showCategory && (
                  <ul
                    className="
          absolute left-0 right-0 mt-2 border bg-white border-gray-400 
          rounded-2xl w-full px-4 py-2 top-9 max-h-52 overflow-y-auto 
          custom-scrollbar z-[100]
        "
                  >
                    {allCategories.map((item) => (
                      <li
                        key={item._id}
                        onClick={() => {
                          dispatch(
                            setCategory({ name: item.name, id: item._id })
                          );
                          setShowCategory(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 rounded-md"
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="w-3/4 mx-auto grid lg:grid-cols-4 md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1">
              {filterdProduct.length ? (
                filterdProduct.map((item) => (
                  <div key={item._id}>
                    <ProductCard productdata={item} />
                  </div>
                ))
              ) : (
                <div className="w-full col-span-12  h-screen flex justify-center items-center">
                  <p>No Product Founded...</p>
                </div>
              )}
            </div>
            <Pagination
              totalPages={numberOfPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
