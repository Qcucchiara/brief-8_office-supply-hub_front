import {
  Category,
  Product,
  ProductHasCategory,
  ProductJoinCategory,
} from "@/utils/types/response";
import React, { useEffect } from "react";
import { Label } from "../ui/label";
import Link from "next/link";
import Image from "next/image";
import { handleCart } from "@/services/ecommerce_api";
import toast from "react-hot-toast";

export const ProductCard = ({
  productData,
}: {
  productData: ProductJoinCategory;
}) => {
  return (
    <div className="mx-auto flex h-full min-w-[300px] max-w-[450px] flex-col justify-between rounded-lg bg-white p-10 shadow-2xl">
      <Link href={`/shop/product/${productData.slug}`}>
        <div className="prod-title">
          <p className="text-2xl font-bold uppercase text-gray-900">
            {productData?.name}
          </p>
          <p className="text-sm uppercase text-gray-400">
            {productData?.description}
          </p>
        </div>
        <div className="prod-img pt-4">
          {productData && (
            <Image
              src={`http://localhost:3000/image/view/product/${productData.image}`}
              className="aspect-video w-full object-contain object-center duration-75 hover:scale-110"
              alt={productData.description}
              height={400}
              width={400}
            />
          )}
        </div>
      </Link>
      <div className="prod-info relative grid gap-10">
        <div className="mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {productData?.Product_Has_Category &&
              productData.Product_Has_Category.map(
                (element: ProductHasCategory) => {
                  return (
                    element.category && (
                      <Link
                        href={`/shop/category/${element.category.slug}`}
                        key={element.category.id}
                      >
                        <Label className="cursor-pointer rounded-full border-2 bg-secondary p-1 transition duration-150 ease-out hover:border-gray-500 hover:bg-primary-foreground">
                          {element?.category.name}
                        </Label>
                      </Link>
                    )
                  );
                }
              )}
          </ul>
        </div>
        <div className="static bottom-0 flex w-full flex-col items-center justify-between text-gray-900 md:flex-row">
          <p className="text-xl font-bold">
            {Math.round((productData?.price * 1 - productData?.promo) * 100) /
              100}
            $
          </p>
          <button
            onClick={() => {
              handleCart
                .create({ product_id: productData.id, quantity: 1 })
                .then((res) => {
                  console.log(res);
                  toast.success("product added to cart");

                  // use a websocket to actualize the cart in real time.
                });
            }}
            className="rounded-full border-2 border-gray-900 px-4 py-1 uppercase transition duration-200 ease-out hover:bg-gray-800 hover:text-white focus:outline-none"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
