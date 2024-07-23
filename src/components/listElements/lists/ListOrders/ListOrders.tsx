"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleOrder } from "@/services/ecommerce_api";
import { Order } from "@/utils/types/response";
import { AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListOrderElement } from "./ListOrderElement";

export const ListOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleOrder.order.findFromUser(0, 9999).then((res) => {
      console.log(res);
      setOrders(res.data);
    });
  }, [refresh]);

  useEffect(() => {
    if (orders) {
      orders.map((order) => {
        order.Order_has_Product.map((orderProduct) => {
          setTotalAmount(
            (prev) => prev + orderProduct.quantity * orderProduct.product.price
          );
        });
      });
    }
  }, [orders]);
  return (
    <div>
      <Table className="w-full">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[80px] text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((element) => {
            let amount = 0;
            const date = new Date(element.createdAt).toLocaleDateString();
            element.Order_has_Product.map((e) => {
              amount += e.quantity * e.product.price;
            });
            return (
              <ListOrderElement
                refresh={setRefresh}
                element={element}
                amount={amount}
                date={date}
                setTotalAmount={setTotalAmount}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$ {totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export const ListOrdersAdmin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    handleOrder.order.findAll(0, 9999).then((res) => {
      console.log(res);
      setOrders(res.data.data);
    });
  }, [refresh]);

  useEffect(() => {
    setTotalAmount(0);
    if (orders) {
      orders.map((order) => {
        order.Order_has_Product.map((orderProduct) => {
          setTotalAmount(
            (prev) => prev + orderProduct.quantity * orderProduct.product.price
          );
        });
      });
    }
  }, [orders, refresh]);
  return (
    <div>
      <Table className="w-full">
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User name</TableHead>
            <TableHead className="w-[100px]">quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[80px] text-center">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!refresh &&
            orders.map((element) => {
              let amount = 0;
              const date = new Date(element.createdAt).toLocaleDateString();
              element.Order_has_Product.map((e) => {
                amount += e.quantity * e.product.price;
              });
              return (
                !refresh && (
                  <ListOrderElement
                    refresh={setRefresh}
                    key={element.id}
                    element={element}
                    amount={amount}
                    date={date}
                    setTotalAmount={setTotalAmount}
                  />
                )
              );
            })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$ {totalAmount}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
