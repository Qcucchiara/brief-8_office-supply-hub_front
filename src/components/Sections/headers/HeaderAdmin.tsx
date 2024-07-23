"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { handleCategory } from "@/services/ecommerce_api";
import { Category } from "@/utils/types/response";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BackOfficeNav } from "../nav/BackOfficeNav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const HeaderAdmin = () => {
  const [categoryList, setCategoryList] = useState<Category[]>();
  const { push } = useRouter();
  useEffect(() => {
    handleCategory.findAll(0, 20).then((res) => {
      setCategoryList(res.data.data);
    });
  }, []);
  return (
    <header className="flex w-full justify-between p-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex">
        <Input type="text" placeholder="search" />
        <Button>Search</Button>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-full grid-flow-col grid-rows-3 whitespace-nowrap">
                {categoryList &&
                  categoryList.map((element) => {
                    return (
                      <Link
                        key={element.id}
                        href={`/shop/category/${element.slug}`}
                      >
                        <Badge
                          variant={"outline"}
                          className="flex w-full cursor-pointer place-self-center px-2 py-1 text-center hover:bg-primary-foreground"
                        >
                          <NavigationMenuLink className="place-self-center text-center text-sm">
                            {element.name}
                          </NavigationMenuLink>
                        </Badge>
                      </Link>
                    );
                  })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Sheet>
              <SheetTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50">
                Admin Panel
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[300px] sm:w-[265px]">
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
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:font-bold">
                        <span className="text-2xl">
                          <i className="bx bx-heart"></i>
                        </span>
                        <span>product management</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <Link
                          href="/back-office/inventory/form"
                          className="flex items-center space-x-1 rounded-md px-6 py-3 text-sm hover:bg-gray-100 hover:font-bold"
                        >
                          <span className="text-2xl">
                            <i className="bx bx-heart"></i>
                          </span>
                          <span>new Product</span>
                        </Link>
                        <Link
                          href="/back-office/inventory"
                          className="flex items-center space-x-1 rounded-md px-6 py-3 text-sm hover:bg-gray-100 hover:font-bold"
                        >
                          <span className="text-2xl">
                            <i className="bx bx-heart"></i>
                          </span>
                          <span>list products</span>
                        </Link>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                </ul>
                {/* <BackOfficeNav /> */}
              </SheetContent>
            </Sheet>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link href={"/auth/sign"}>
        {/* <Button variant={"outline"}>logout</Button> */}
      </Link>
    </header>
  );
};
