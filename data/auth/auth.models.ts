import { z } from "zod";

export namespace AuthModels {
  export const childSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    birthdate: z.string(),
    gender: z.string(),
    age: z.string(),
    schoolName: z.string(),
    createdAt: z.string(),
  });

  export const userProfileSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    userName: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    streetAddress: z.string().nullable(),
    apartment: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    createdAt: z.string(),
    children: z.array(childSchema),
  });

  export const signInInputSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Password is required"),
  });

  export const signInResponseSchema = z.object({
    session: z.object({
      accessToken: z.string(),
      refreshToken: z.string(),
    }),
    user: userProfileSchema,
  });

  export type Child = z.infer<typeof childSchema>;
  export type UserProfile = z.infer<typeof userProfileSchema>;
  export type SignInInput = z.infer<typeof signInInputSchema>;
  export type SignInResponse = z.infer<typeof signInResponseSchema>;
}
