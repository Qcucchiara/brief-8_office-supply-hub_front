import {
  handleCart,
  handleOrder,
  handleProduct,
} from "@/services/ecommerce_api";
import {
  CartElement as CartElementResponse,
  Product,
  ProductJoinUser,
} from "@/utils/types/response";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartElement = ({
  cartElement,
  setTotalAmount,
  orderId,
  refresh,
}: {
  cartElement: CartElementResponse;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  orderId: string;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [product, setProduct] = useState<ProductJoinUser>();
  const [quantity, setQuantity] = useState(1);
  useEffect(
    () => {
      handleProduct.findOneJoinCart(cartElement.product_id).then((res) => {
        setProduct(res.data);
        console.log(res);
        setQuantity(res.data.User_Has_Product[0].quantity);
        setTotalAmount(
          (prev) =>
            prev + res.data.price * res.data.User_Has_Product[0].quantity
        );
      });
    },
    [
      // mettre en dépendency la réponse du useEffect juste en dessous
    ]
  );
  useEffect(() => {
    if (orderId !== "" && product) {
      handleOrder.orderElement
        .create({
          product_id: product.id,
          order_id: orderId,
          cartElement_id: cartElement.id,
          quantity: product.User_Has_Product[0].quantity,
        })
        .then((res) => {
          console.log(res);
        });
    }
    // pour update le component et refetch les données
  }, [orderId]);

  return (
    <div className="mb-6 justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={`http://localhost:3000/image/view/product/${product?.image}`}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{product?.name}</h2>
          <p className="mt-1 text-xs text-gray-700">{product?.description}</p>
        </div>
        <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
          <div className="flex items-center border-gray-100">
            <span
              onClick={() => {
                handleCart
                  .update(cartElement.id, {
                    quantity: quantity - 1,
                  })
                  .then((res) => {
                    setQuantity((prev) => {
                      return prev - 1;
                    });
                  });
              }}
              className="cursor-pointer rounded-l bg-gray-100 px-3.5 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 cursor-default border bg-white text-center text-xs outline-none"
              type="number"
              value={quantity}
              readOnly
              min="1"
            />
            <span
              onClick={() => {
                handleCart
                  .update(cartElement.id, {
                    quantity: quantity + 1,
                  })
                  .then((res) => {
                    setQuantity((prev) => {
                      return prev + 1;
                    });
                  });
              }}
              className="cursor-pointer rounded-r bg-gray-100 px-3 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">$ {product?.price} </p>
            <svg
              onClick={() => {
                handleCart
                  .remove(cartElement.id)
                  .then((res) => {
                    refresh(true);
                    toast.success("product removed from cart");
                  })
                  .catch(() => {
                    toast.error("Error");
                  });
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
