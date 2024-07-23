import * as z from "zod";

export const formRegister = z
  .object({
    first_name: z.string().min(3, {
      message: "First name must be at least 3 characters.",
    }),
    last_name: z.string().min(3, {
      message: "Last name must be at least 3 characters.",
    }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password should have at least 8 characters")
      .regex(
        /[a-z]/,
        "lowercase, uppercase, number and special character are required"
      )
      .regex(
        /[A-Z]/,
        "lowercase, uppercase, number and special character are required"
      )
      .regex(
        /[0-9]/,
        "lowercase, uppercase, number and special character are required"
      )
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "lowercase, uppercase, number and special character are required"
      ),
    confirmPassword: z.string(),
    pseudo: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    avatar: z.custom<string>().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const formLogin = z.object({
  credential: z.string().email(),
  password: z.string(),
});

export const formProduct = z.object({
  name: z.string(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  promo: z.number().min(0).max(1).optional(),
  categories_ids: z.array(z.string()),
  description: z.string(),
  image: z.custom<string>().optional(),
});
