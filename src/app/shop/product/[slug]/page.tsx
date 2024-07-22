"use client";

import { InputCounter } from "@/components/ui/custom/InputCounter";
import { Label } from "@/components/ui/label";
import { handleProduct } from "@/services/ecommerce_api";
import {
  Product,
  ProductHasCategory,
  ProductJoinCategory,
} from "@/utils/types/response";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconDropdown } from "react-day-picker";

const page = ({ params }: { params: { slug: string } }) => {
  const [productData, setProductData] = useState<ProductJoinCategory>();
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log(count);
  }, [count]);

  useEffect(() => {
    handleProduct.findOne(params.slug).then((res) => {
      console.log(res);
      setProductData(res.data);
    });
  }, []);
  return (
    <main>
      <section>
        {productData && (
          <div className="items-start justify-center px-4 py-12 md:flex md:px-6 2xl:px-20">
            {/* <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ ---> */}

            <div className="hidden w-80 md:block lg:w-2/5 xl:w-2/6">
              <Image
                height={400}
                width={400}
                className="w-full"
                alt={productData.description}
                src={`http://localhost:3000/image/view/product/${productData.image}`}
              />
            </div>
            <div className="md:hidden">
              <Image
                height={400}
                width={400}
                className="w-full"
                alt={productData.description}
                src={`http://localhost:3000/image/view/product/${productData.image}`}
              />
            </div>
            <div className="mt-6 md:ml-6 md:mt-0 md:w-1/2 lg:ml-8 xl:w-2/5">
              <div className="border-b border-gray-200 pb-6">
                <h1 className="mt-2 text-xl font-semibold leading-7 text-gray-800 dark:text-white lg:text-2xl lg:leading-6">
                  {productData.name}
                </h1>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 py-4">
                <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
                  Categories
                </p>
                <div className="flex items-center justify-center gap-4">
                  {productData.Product_Has_Category &&
                    productData.Product_Has_Category.map(
                      (element: ProductHasCategory) => {
                        return (
                          <Link
                            href={`/shop/category/${element.category?.slug}`}
                            key={element.category?.id}
                          >
                            <Label className="cursor-pointer rounded-full border-2 bg-secondary p-1 transition duration-150 ease-out hover:border-gray-500 hover:bg-primary-foreground">
                              {element?.category?.name}
                            </Label>
                          </Link>
                        );
                      }
                    )}
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-4 rounded-md bg-gray-700 py-4 text-base leading-none text-white duration-75 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-white dark:text-gray-700 dark:hover:bg-gray-100">
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16.5" cy="18.5" r="1.5" />
                  <circle cx="9.5" cy="18.5" r="1.5" />
                  <path d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z" />
                </svg>
                Add to cart
              </button>
              <div className="flex items-end justify-between">
                <p className="mt-7 text-base leading-normal text-gray-600 dark:text-gray-300 lg:leading-tight xl:pr-48">
                  {productData.description}
                </p>
                <InputCounter count={count} setCount={setCount} />
              </div>
              <div>
                <div className="mt-7 border-b border-t border-gray-200 py-4">
                  <div
                    data-menu
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
                      Shipping and returns
                    </p>
                    <button
                      className="cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      role="button"
                      aria-label="show or hide"
                    >
                      <svg
                        className="transform text-gray-300 dark:text-white"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="mt-4 hidden pr-12 pt-4 text-base leading-normal text-gray-600 dark:text-gray-300"
                    id="sect"
                  >
                    You will be responsible for paying for your own shipping
                    costs for returning your item. Shipping costs are
                    nonrefundable
                  </div>
                </div>
              </div>
              <div>
                <div className="border-b border-gray-200 py-4">
                  <div
                    data-menu
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
                      Contact us
                    </p>
                    <button
                      className="cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                      role="button"
                      aria-label="show or hide"
                    >
                      <svg
                        className="transform text-gray-300 dark:text-white"
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 1L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="mt-4 hidden pr-12 pt-4 text-base leading-normal text-gray-600 dark:text-gray-300"
                    id="sect"
                  >
                    If you have any questions on how to return your item to us,
                    contact us.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default page;
