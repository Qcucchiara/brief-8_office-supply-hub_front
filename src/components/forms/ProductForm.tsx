"use client";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formProduct, formRegister } from "@/validations/forms";
import { useRouter } from "next/navigation";
import {
  handleAuth,
  handleCategory,
  handleProduct,
} from "@/services/ecommerce_api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Category, Product } from "@/utils/types/response";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

export const ProductForm = ({ productData }: { productData?: Product }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { push } = useRouter();
  const refFile = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formProduct>>({
    mode: "onChange",
    resolver: zodResolver(formProduct),
    defaultValues: {
      name: productData ? productData.name : "",
      price: productData ? productData.price : 0,
      stock: productData ? productData.stock : 0,
      promo: productData ? productData.promo : 0,
      categories_ids: [],
      description: productData ? productData.description : "",
      image: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formProduct>) {
    if (productData) {
      handleProduct
        .update(productData.id, values)
        .then((res) => {
          console.log(res);
          toast.success("product updated");
        })
        .catch((error) => {
          console.log(error);
          toast.error(" error");
        });
    } else {
      await handleProduct
        .create(values, refFile)
        .then((res) => {
          console.log(res);
          toast.success("product created");
        })
        .catch((error) => {
          console.log(error);
          toast.error(" error");
        });
    }
  }

  useEffect(() => {
    handleCategory.findAll(0, 9999).then((res) => {
      setCategories(res.data.data);
      console.log(res);
    });
  }, []);

  return (
    <div className="m-2 mb-20 w-[600px]">
      <h2 className="text-center text-xl font-bold">
        {productData ? (
          <>
            {" "}
            update product:{" "}
            <span className="text-2xl font-semibold">{productData.name}</span>
          </>
        ) : (
          "New Product"
        )}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Price</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Stock</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="This will be your public name"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promo"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Promo</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="placeholder@**.**"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories_ids"
            render={({ field }) => (
              <FormItem className="grid grid-cols-3">
                <div className="col-span-full flex items-center justify-between">
                  <FormLabel>categories</FormLabel>
                  <FormMessage />
                </div>
                {categories.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="categories_ids"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>image</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="file" {...field} ref={refFile} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Description</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Textarea placeholder="description" {...field} />

                  {/* <Input type="textarea" placeholder="description" {...field} /> */}
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <Button className="float-end" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
