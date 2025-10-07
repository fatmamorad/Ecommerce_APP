"use client";
import type { Metadata } from "next";
import ProductCard from "image/app/_component/ProductCard/ProductCard";
import Loading from "image/app/loading";
import { GetAllBrands, GetProductsByBrand } from "image/FiltrationActions";
import { brandItem } from "image/types/Brands";
import { Product } from "image/types/product.type";
import { useEffect, useState } from "react";

function BransView() {
  const [brand, setBrand] = useState<brandItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  const [productList, setproductList] = useState<Product[]>();
  const [selectedBrand, setSelectedBrand] = useState<string>(
    "64089fe824b25627a25315d1"
  );
  
  async function getBrands() {
    setLoading(true);
    let data: brandItem[] = await GetAllBrands();
    setLoading(false);
    setBrand(data);
  }
  async function getBrandsProducts(id: string) {
    setLoading(true);
    const data: Product[] = await GetProductsByBrand(id);
    setproductList(data);
    setLoading(false);

  }
  useEffect(() => {
    if (selectedBrand) {
      getBrandsProducts(selectedBrand);
    }
  }, [selectedBrand]);
  useEffect(() => {
    getBrands();
    getBrandsProducts(selectedBrand);
  }, []);
  return (
    <>
      <div className="container mt-10  min-h-screen  mx-auto p-5">
        
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="grid grid-cols-12 gap-3">
            <div className="hidden lg:block  lg:col-span-3 p-5  h-full shadow-xl">
              <p className="text-xl my-4">Filter By Brand</p>

              {brand?.map((branditem) => {
                return (
                  <div key={branditem._id} className="flex items-center mt-1">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value={branditem._id}
                      checked={branditem._id === selectedBrand}
                      onChange={() => {
                        setSelectedBrand(branditem._id);
                      }}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {branditem.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="lg:hidden col-span-12">
              <label className="block text-center">Filter by brand</label>
              <select onChange={(e)=>{
                setSelectedBrand(e.target.value)
              }} className="w-full  p-2 mt-4 rounded-2xl border-1 border-gray-300 " value={selectedBrand}>
                {brand?.map((brandItems) => {
                  return (
                    <>
                      <option value={brandItems._id} key={brandItems._id}>{brandItems.name}</option>
                    </>
                  );
                })}
              </select>
            </div>

            <div className="lg:col-span-9 col-span-12  h-auto">
              
              <div className=" grid  min-h-screen  w-full lg:grid-cols-4 md:grid-cols-3  gap-5  my-10 sm:grid-cols-2 grid-cols-1">
                {loadingProduct ? (
                  <Loading></Loading>
                ) : (
                  <>
                    {productList?.length ? (
                      productList?.map((item) => {
                        return (
                          <div key={item._id}>
                            <ProductCard productdata={item} />
                          </div>
                        );
                      })
                    ) : (
                      <div className="grid col-span-12 place-items-center place-content-centerw-full">
                        <p>
                          <i className=" fa fa-hourglass-empty"></i> NO PRODUCT
                          IN THIS BRAND
                        </p>{" "}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BransView;
