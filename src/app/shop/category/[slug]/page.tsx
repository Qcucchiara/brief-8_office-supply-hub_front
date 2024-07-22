"use client";
import { ProductCard } from "@/components/listElements/ProductCard";
import { handleCategory } from "@/services/ecommerce_api";
import { Category, ProductHasCategory } from "@/utils/types/response";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const [categoryData, setCategoryData] = useState<Category>();
  useEffect(() => {
    handleCategory.findOne(params.slug).then((res) => {
      console.log(res);
      setCategoryData(res.data);
    });
  }, []);
  return (
    <main className="container mx-auto px-6 py-16 md:px-0">
      {/* <!-- Create By Joker Banny --> */}
      <div className="container mx-auto items-center rounded-md bg-white">
        <div className="flex h-96 justify-between text-center text-gray-50 sm:ml-20 sm:text-left">
          <div>
            <h1 className="mb-4 text-5xl font-bold text-black">
              {categoryData?.name}
            </h1>
            <button className="mt-8 rounded bg-gray-600 px-4 py-2">
              Browse saunas
            </button>
          </div>
          {categoryData && (
            <Image
              className="inline-block text-lg sm:block"
              src={`http://localhost:3000/image/view/category/${categoryData.image}`}
              alt={categoryData ? categoryData?.name : "image"}
              height={500}
              width={500}
            />
          )}
        </div>
      </div>
      <section>
        <h1 className="mb-10 text-3xl font-bold text-gray-600">
          products of the {categoryData?.name} category:
        </h1>
        <div className="max-w-[1000px]:flex grid grid-flow-row gap-4 p-8 max-[1130px]:grid-cols-2 max-[790px]:grid-cols-1 min-[1130px]:grid-cols-3">
          {categoryData?.Product_Has_Category &&
            categoryData.Product_Has_Category.map(
              (productHasCategory: ProductHasCategory) => {
                return (
                  productHasCategory.product && (
                    <ProductCard
                      key={productHasCategory.id}
                      productData={productHasCategory.product}
                    />
                  )
                );
              }
            )}
        </div>
      </section>
    </main>
  );
};

export default page;
