"use client";
import { ProductCard } from "@/components/listElements/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { handleProduct } from "@/services/ecommerce_api";
import { Product, ProductJoinCategory } from "@/utils/types/response";
import React, { useEffect, useState } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState<ProductJoinCategory[]>();
  useEffect(() => {
    handleProduct.findAll(0, 50).then((res) => {
      setProducts(res.data.data);
    });
  }, []);
  return (
    <div className="mt-8 select-none">
      <h2 className="flex justify-center text-2xl font-bold">Product List</h2>
      <div className="flex justify-center">
        <Carousel
          className="flex w-11/12 flex-col"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {products &&
              products.map((element) => {
                return (
                  <CarouselItem className="basis-1/ my-5">
                    {/* <CarouselItem className="max-w-screen-xl:basis-1/4 max-w-screen-lg:basis-1/3 max-w-screen-md:basis-1/2 max-w-screen-sm:basis-1/1 my-5"> */}
                    <ProductCard productData={element} />
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsList;
