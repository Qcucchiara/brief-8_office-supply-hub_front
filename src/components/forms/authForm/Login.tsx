"use client";
import React from "react";
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
// import { formLogin } from '@/validations/forms'
// import { signin } from '@/services/cryptoAPI/auth/signin'
// import { AuthData } from '@/utils/types/cryptoTypes'
import { useRouter } from "next/navigation";
import { formLogin } from "@/validations/forms";
import { handleAuth } from "@/services/ecommerce_api";

export const Login = ({
  swap,
}: {
  swap: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formLogin>>({
    resolver: zodResolver(formLogin),
    defaultValues: {
      credential: `${
        process.env.NEXT_PUBLIC_LOGIN_EMAIL
          ? process.env.NEXT_PUBLIC_LOGIN_EMAIL
          : ""
      }`,
      password: `${
        process.env.NEXT_PUBLIC_LOGIN_PASSWORD
          ? process.env.NEXT_PUBLIC_LOGIN_PASSWORD
          : ""
      }`,
    },
  });
  function onSubmit(values: z.infer<typeof formLogin>) {
    handleAuth
      .login(values)
      .then((res: { data: any; status: number } | void) => {
        if (res && res.status === 200) {
          localStorage.setItem("token", res.data.access_token);
          push("/");
        } else {
          console.log({ error: res });
        }
      });
  }
  return (
    <div className="m-2 mb-20 w-[600px]">
      <h2 className="text-center text-xl font-bold">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="credential"
            render={({ field }) => (
              <FormItem className="h-10">
                <div className="flex items-center justify-between">
                  <FormLabel>credential</FormLabel>
                  <FormMessage />
                  <FormDescription className="mr-8">
                    email or pseudo
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    autoComplete="email"
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
          <div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                swap(true);
              }}
              variant={"ghost"}
            >
              Register instead
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
