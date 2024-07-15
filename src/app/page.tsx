"use client";
import { ProductCard } from "@/components/listElements/ProductCard";
import { product } from "@/services/ecommerce_api";
import React, { useEffect, useState } from "react";

const page = () => {
  const [productData, setProductData] = useState<any>();

  useEffect(() => {
    product.prototype
      .findOne("d3832ff1-0815-401d-bfef-a1395a4f6250")
      .then(({ data }) => {
        setProductData(data);
        console.log(data);
      });
  }, []);
  return (
    // <main>
    //   <h1>OFFICE SUPPLY HUB</h1>
    //   <Button>Signup</Button>
    //   <Image src={""} alt={""} height={300} width={640} />
    // </main>
    <ProductCard productData={productData} />
  );
};

export default page;
