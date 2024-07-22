"use client";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { formRegister } from "@/validations/forms";
import { useRouter } from "next/navigation";
import { handleAuth } from "@/services/ecommerce_api";

export const Register = ({
  swap,
}: {
  swap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const refFile = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formRegister>>({
    mode: "onChange",
    resolver: zodResolver(formRegister),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      pseudo: "",
      avatar: undefined,
    },
  });
  async function onSubmit(values: z.infer<typeof formRegister>) {
    await handleAuth.register(values, refFile).then((res) => {
      if (res && res.status === 201) {
        push("/");
        console.log(res);
      } else {
        console.log({ error: res });
      }
    });
  }
  return (
    <div className="m-2 mb-20 w-[600px]">
      <h2 className="text-center text-xl font-bold">Register</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>First name</FormLabel>
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
            name="last_name"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Last name</FormLabel>
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
            name="pseudo"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Username</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="This will be your public name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="placeholder@**.**"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Confirm your password</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="password" placeholder="shadcn" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>Avatar</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input type="file" {...field} ref={refFile} />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                swap(false);
              }}
              variant={"ghost"}
            >
              Login instead
            </Button>
            <Button className="float-end" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
