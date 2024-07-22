"use client";
import { ListUsers } from "@/components/listElements/lists/ListUsers/ListUsers";
import { handleUser } from "@/services/ecommerce_api";
import React, { useEffect, useState } from "react";

const page = () => {
  return (
    <main>
      <ListUsers />
    </main>
  );
};

export default page;
