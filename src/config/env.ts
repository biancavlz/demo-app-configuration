import { z } from "zod";

const envSchema = z.object({
  apiBaseUrl: z.string().url().default("https://jsonplaceholder.typicode.com"),
});

export const env = envSchema.parse({
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
});
