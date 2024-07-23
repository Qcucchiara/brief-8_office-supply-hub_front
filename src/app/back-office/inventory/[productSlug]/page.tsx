"use client";
import { ProductForm } from "@/components/forms/ProductForm";
import { handleProduct } from "@/services/ecommerce_api";
import { Product } from "@/utils/types/response";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { productSlug: string } }) => {
  const [productData, setProductData] = useState<Product>();
  useEffect(() => {
    handleProduct.findOne(params.productSlug).then((res) => {
      console.log(res);
      setProductData(res.data);
    });
  }, []);

  return (
    <div>
      {params.productSlug}
      {productData && <ProductForm productData={productData} />}
    </div>
  );
};

export default page;
