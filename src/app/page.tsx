"use client";
import { Header } from "@/components/Sections/headers/Header";
import { CategoriesList } from "@/components/Sections/main/CategoriesList";
import ProductsList from "@/components/Sections/main/ProductsList";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <main>
        <h1 className="max-w-[800px]:top-0 absolute right-20 top-32 text-4xl font-bold">
          OFFICE SUPPLY HUB
        </h1>
        <Image
          src={"/landing-background-image.png"}
          alt={""}
          width={2000}
          height={1000}
        />
        <ProductsList />
        <CategoriesList />
      </main>
    </>
  );
};

export default page;
