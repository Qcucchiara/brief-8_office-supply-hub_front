"use client";
import { handleCategory } from "@/services/ecommerce_api";
import { Category } from "@/utils/types/response";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    handleCategory.findAll(0, 50).then((res) => {
      setCategories(res.data.data);
    });
  }, []);
  return (
    <div className="mt-8 select-none">
      <h2 className="flex justify-center text-xl font-bold">CategoriesList</h2>
      <div className="flex justify-center">
        <Carousel
          className="flex w-11/12 flex-col"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="gap-2">
            {categories &&
              categories.map((element) => {
                return (
                  <CarouselItem className="relative my-2 h-auto w-full basis-1/6 border-2 duration-75 hover:border-gray-600">
                    <Image
                      src={`http://localhost:3000/image/view/category/${element.image}`}
                      alt={element.name}
                      height={150}
                      width={250}
                    />
                    <Badge className="absolute bottom-2 left-3">
                      {element.name}
                    </Badge>
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
