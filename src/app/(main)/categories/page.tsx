"use client";
import ProductCard from "image/app/_component/ProductCard/ProductCard";
import Loading from "image/app/loading";
import {
  GetAllCategories,
  GetProductsByCategories,
} from "image/FiltrationActions";
import { brandItem } from "image/types/Brands";
import { Datum } from "image/types/Categories.type";
import { Product } from "image/types/product.type";
import React, { useEffect, useState } from "react";

function Page() {
  let [brand, setBrand] = useState<brandItem[]>();
  let [loading, setLoading] = useState<boolean>(false);
  let [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  let [productList, setproductList] = useState<Product[]>();
  let [selectedCategory, setSelectedCategory] = useState<string>(
    "6439d2d167d9aa4ca970649f"
  );

  async function getBrands() {
    setLoading(true);
    let data: Datum[] = await GetAllCategories();
    setLoading(false);
    setBrand(data);
  }

  async function getCategoryProducts(id: string) {
    setLoadingProduct(true);
    const data: Product[] = await GetProductsByCategories(id);
    setproductList(data);
    setLoadingProduct(false);
  }

  useEffect(() => {
    if (selectedCategory) {
      getCategoryProducts(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    getBrands();
    getCategoryProducts(selectedCategory);
  }, []);

  return (
    <div className="flex flex-col min-h-screen"> 
  
      <main className="flex-grow">
        <div className="container mt-10 mx-auto p-5">
          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-12 gap-3">
           
              <div className="hidden lg:block lg:col-span-3 p-5 shadow-xl">
                <p className="text-xl my-4">Filter By Brand</p>
                {brand?.map((branditem) => (
                  <div key={branditem._id} className="flex items-center mt-1">
                    <input
                      type="radio"
                      value={branditem._id}
                      checked={branditem._id === selectedCategory}
                      onChange={() => setSelectedCategory(branditem._id)}
                      name="brand"
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label className="ms-2 text-sm font-medium text-gray-900">
                      {branditem.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-9 col-span-12">
                <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 gap-5 my-10 sm:grid-cols-2 grid-cols-1">
                  {loadingProduct ? (
                    <Loading />
                  ) : productList?.length ? (
                    productList?.map((item) => (
                      <div key={item._id}>
                        <ProductCard productdata={item} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-12 flex justify-center items-center">
                      <p>
                        <i className="fa fa-hourglass-empty"></i> NO PRODUCT IN
                        THIS BRAND
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

     
    </div>
  );
}

export default Page;
