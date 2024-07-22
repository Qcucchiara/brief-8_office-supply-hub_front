import {
  ListOrders,
  ListOrdersAdmin,
} from "@/components/listElements/lists/ListOrders/ListOrders";
import React from "react";

const page = () => {
  return (
    <main>
      <section className="block w-full justify-end">
        <h2 className="text-center text-xl font-bold">List all orders</h2>
        <ListOrdersAdmin />
      </section>
    </main>
  );
};

export default page;
