import React, { useState } from "react";

export const InputCounter = ({
  count,
  setCount,
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="relative flex h-10 w-24 flex-row rounded-lg border border-gray-400">
      <button
        onClick={() => {
          count > 1 && setCount((prev) => prev - 1);
        }}
        className="flex h-full w-20 cursor-pointer rounded-l border-r border-gray-400 bg-gray-700 font-semibold text-white hover:bg-red-600 focus:outline-none"
      >
        <span className="m-auto">-</span>
      </button>
      <input
        type="hidden"
        className="border-gray-400 p-1 text-center text-xs focus:outline-none md:p-2 md:text-base"
        readOnly
        name="custom-input-number"
      />
      <div className="flex w-24 cursor-default items-center justify-center bg-white text-xs md:text-base">
        <span>{count}</span>
      </div>

      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
        className="flex h-full w-20 cursor-pointer rounded-r border-l border-gray-400 bg-gray-700 font-semibold text-white hover:bg-blue-600 focus:outline-none"
      >
        <span className="m-auto">+</span>
      </button>
    </div>
  );
};
