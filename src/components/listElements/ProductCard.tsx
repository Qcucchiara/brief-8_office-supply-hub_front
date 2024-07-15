import { Category, Product, ProductHasCategory } from "@/utils/types/response";
import React from "react";
import { Label } from "../ui/label";

export const ProductCard = ({ productData }: { productData: Product }) => {
  return (
    <div className="container mx-auto max-w-sm w-full p-4 sm:w-1/2">
      <div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
        <div className="prod-title">
          <p className="text-2xl uppercase text-gray-900 font-bold">
            {productData?.name}
          </p>
          <p className="uppercase text-sm text-gray-400">
            {productData?.description}
          </p>
        </div>
        <div className="prod-img">
          <img
            src="https://unsplash.com/photos/IJjfPInzmdk/download?force=true&w=1920"
            className="w-full object-cover object-center"
          />
        </div>
        <div className="prod-info grid gap-10">
          <div>
            <ul className="flex flex-row justify-center items-center gap-2">
              {productData?.Product_Has_Category &&
                productData.Product_Has_Category.map(
                  (element: ProductHasCategory) => {
                    return (
                      <Label
                        key={element.category.id}
                        className=" bg-secondary p-1 rounded-full"
                      >
                        {element?.category.name}
                      </Label>
                    );
                  }
                )}
            </ul>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
            <p className="font-bold text-xl">
              {productData?.price * 1 - productData?.promo} $
            </p>
            <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
