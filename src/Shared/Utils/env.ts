import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SERVER_ADDRESS: z.string(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SERVER_ADDRESS: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
});
