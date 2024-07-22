"use client";
import { SideCart } from "@/components/listElements/SideCart/SideCart";
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

import { handleCategory } from "@/services/ecommerce_api";
import { Category } from "@/utils/types/response";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const HeaderUser = () => {
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
            <Link href={"/user-account"}>
              <NavigationMenuTrigger>My account</NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <div className="grid cursor-pointer justify-center py-2 md:w-[150px] lg:w-[150px]">
                <Link
                  href={"/user-account/history"}
                  className="h-full w-full rounded-md duration-100 hover:font-semibold"
                >
                  History
                </Link>

                <Link
                  href={"/user-account/user-infos"}
                  className="h-max w-max rounded-md duration-100 hover:font-semibold"
                >
                  My infos
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <SideCart />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          push("/auth/sign");
        }}
        variant={"outline"}
      >
        Logout
      </Button>
    </header>
  );
};
