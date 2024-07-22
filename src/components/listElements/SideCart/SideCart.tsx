import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleCart } from "@/services/ecommerce_api";
import { CartElement } from "@/utils/types/response";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SideCartTableRow } from "./SideCartTableRow";
import Link from "next/link";

export const SideCart = () => {
  const [cart, setCart] = useState<CartElement[]>();

  useEffect(() => {
    handleCart.find(0, 1000).then((res) => {
      setCart(res.data[1]);
    });
  }, []);
  return (
    <Sheet>
      <SheetTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50">
        Cart
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart list</SheetTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.map((element: CartElement) => {
                return (
                  <SideCartTableRow key={element.id} cartElement={element} />
                );
              })}
            </TableBody>
          </Table>
          <Link href={"/shop/cart"}>
            <Button className="w-full">go to cart</Button>
          </Link>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
