import { z } from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  username: z.string().trim().min(1, "Username is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(1, "Phone is required"),
  website: z.string().trim().optional().or(z.literal("")),
  address: z.object({
    street: z.string().trim().min(1, "Street is required"),
    suite: z.string().trim().optional().or(z.literal("")),
    city: z.string().trim().min(1, "City is required"),
    zipcode: z.string().trim().min(1, "Zip code is required"),
  }),
  company: z.object({
    name: z.string().trim().optional().or(z.literal("")),
  }),
});

export type UserFormData = z.infer<typeof userSchema>;
