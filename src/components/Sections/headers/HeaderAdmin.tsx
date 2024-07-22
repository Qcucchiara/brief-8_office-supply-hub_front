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
                <BackOfficeNav />
              </SheetContent>
            </Sheet>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Link href={"/auth/sign"}>
        <Button variant={"outline"}>login</Button>
      </Link>
    </header>
  );
};
