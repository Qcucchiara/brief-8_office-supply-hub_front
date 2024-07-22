"use client";
import { Login } from "@/components/forms/authForm/Login";
import { Register } from "@/components/forms/authForm/Register";
import React, { useState } from "react";

const page = () => {
  const [swapForm, setSwapForm] = useState(false);

  return (
    <div className="grid h-screen w-screen grid-cols-2">
      <div></div>
      <div className="flex items-center">
        {/* justify - center */}
        {!swapForm ? (
          <Login swap={setSwapForm} />
        ) : (
          <Register swap={setSwapForm} />
        )}
      </div>
    </div>
  );
};

export default page;
