"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/utils/types/response";
import { handleProduct } from "@/services/ecommerce_api";
import { ListProductElement } from "./ListProductElement";

export const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleProduct.findAll(0, 9999).then((res) => {
      setProducts(res.data.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className="px-44">
      <Table>
        <TableCaption>A list of all products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">name</TableHead>
            <TableHead>quantity</TableHead>
            <TableHead>price</TableHead>
            <TableHead className="text-right">Amount sold</TableHead>
            <TableHead className="w-[80px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((element) => {
            return (
              <ListProductElement
                refresh={setRefresh}
                key={element.id}
                data={element}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
