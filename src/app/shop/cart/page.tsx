"use client";
import { CartElement } from "@/components/listElements/CartElement";
import { handleCart, handleOrder } from "@/services/ecommerce_api";
import { CartElement as CartElementResponse } from "@/utils/types/response";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [cart, setCart] = useState<CartElementResponse[]>();
  const [orderId, setOrderId] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleCart.find(0, 200).then((res) => {
      setCart(res.data[1]);
      console.log(res);
      setRefresh(false);
    });
  }, [refresh]);
  return (
    <div className="bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart</h1>
      <div className="mx-auto max-w-[1024px] px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cart &&
            cart.map((element: CartElementResponse) => {
              return (
                <CartElement
                  refresh={setRefresh}
                  orderId={orderId}
                  key={element.id}
                  cartElement={element}
                  setTotalAmount={setTotalAmount}
                />
              );
            })}
        </div>
        {/* <!-- Sub total --> */}
        <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:fixed md:right-[2svw] md:top-32 md:mt-0 md:h-64 md:w-[30%]">
          {/* <div className=""> */}
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">$ {totalAmount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$ 0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">$ {totalAmount} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={() => {
              handleOrder.order
                .createEmpty()
                .then((res) => {
                  setOrderId(res.data);
                  toast.success("transaction completed");
                })
                .catch((error) => {
                  toast.error("transaction failed");
                });
            }}
          >
            Check out
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
