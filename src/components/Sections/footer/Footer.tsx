import React from "react";

export const Footer = () => {
  return (
    <footer className="w-[100%] bg-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <a
          href="#"
          className="text-xl font-bold text-gray-500 hover:text-gray-400"
        >
          Brand
        </a>
        <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
      </div>
    </footer>
  );
};
