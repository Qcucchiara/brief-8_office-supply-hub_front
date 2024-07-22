"use client";
import { ProductCard } from "@/components/listElements/ProductCard";
import { handleProduct } from "@/services/ecommerce_api";
import { Product } from "@/utils/types/response";
import React, { useEffect, useState } from "react";

const page = () => {
  const [listProducts, setListProducts] = useState<any>();

  useEffect(() => {
    handleProduct.findAll(0, 9999).then(({ data }) => {
      setListProducts(data);
    });
  }, []);
  return (
    <main>
      <div>page</div>
      <div className="max-w-[1000px]:flex grid grid-flow-row gap-4 p-8 max-[1130px]:grid-cols-2 max-[790px]:grid-cols-1 min-[1130px]:grid-cols-3">
        {listProducts &&
          listProducts.map((productData: Product) => {
            return (
              <ProductCard key={productData.id} productData={listProducts} />
            );
          })}
      </div>
    </main>
  );
};

export default page;
