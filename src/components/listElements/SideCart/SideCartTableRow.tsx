import { TableCell, TableRow } from "@/components/ui/table";
import { handleProduct } from "@/services/ecommerce_api";
import { CartElement, Product } from "@/utils/types/response";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const SideCartTableRow = ({
  cartElement,
}: {
  cartElement: CartElement;
}) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    handleProduct.findOne(cartElement.product_id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  return (
    <TableRow>
      <TableCell className="font-medium">
        {product && (
          <Image
            className="h-16 object-cover"
            src={`http://localhost:3000/image/view/product/${product.image}`}
            alt={""}
            width={50}
            height={50}
          />
        )}
      </TableCell>
      <TableCell className="text-right">
        $ {product ? product.price : "error"}
      </TableCell>
      <TableCell className="flex justify-end text-right">
        {cartElement.quantity}
      </TableCell>
    </TableRow>
  );
};
