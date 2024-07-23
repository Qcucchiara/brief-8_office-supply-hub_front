import Link from "next/link";
import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const BackOfficeNav = () => {
  return (
    <nav
      className="fixed z-50 mt-3 h-full flex-col space-y-2 bg-white p-2"
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
            <span>product management</span>
          </Link>
        </li>
        <Collapsible>
          <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </CollapsibleContent>
        </Collapsible>
      </ul>
    </nav>
  );
};
