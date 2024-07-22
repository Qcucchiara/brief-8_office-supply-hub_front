import Link from "next/link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const BackOfficeNav = () => {
  return (
    <nav
      className="fixed z-50 mt-3 h-full w-60 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2"
      x-show="asideOpen"
    >
      <ul>
        <li>
          <Link
            href="/back-office/landing-page"
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:font-bold"
          >
            <span className="text-2xl">
              <i className="bx bx-home"></i>
            </span>
            <span>landing page settings</span>
          </Link>
        </li>
        <li>
          <Link
            href="/back-office/catalog"
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:font-bold"
          >
            <span className="text-2xl">
              <i className="bx bx-cart"></i>
            </span>
            <span>catalog management</span>
          </Link>
        </li>
        <li>
          <Link
            href="/back-office/categories"
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:font-bold"
          >
            <span className="text-2xl">
              <i className="bx bx-shopping-bag"></i>
            </span>
            <span>categories management</span>
          </Link>
        </li>
        <li>
          <Link
            href="/back-office/accounts"
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:list-disc hover:bg-gray-100 hover:font-bold"
          >
            <span className="text-2xl">
              <i className="bx bx-heart"></i>
            </span>
            <span>accounts management</span>
          </Link>
        </li>
        <li>
          <Link
            href="/back-office/inventory"
            className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:font-bold"
          >
            <span className="text-2xl">
              <i className="bx bx-user"></i>
            </span>
            <span>inventory management</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
