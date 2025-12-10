import { z } from "zod";

export namespace UsersModels {
  export const userSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    createdAt: z.string().datetime(),
  });

  export const createUserInputSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  export const childSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthdate: z.string().optional(),
    gender: z.string().optional(),
    age: z.string().optional(),
    schoolName: z.string().optional(),
  });

  export const profileSetupSchema = z.object({
    userName: z.string().min(1, "Username is required"),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    streetAddress: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    children: z.array(childSchema),
  });

  export type User = z.infer<typeof userSchema>;
  export type CreateUserInput = z.infer<typeof createUserInputSchema>;
  export type Child = z.infer<typeof childSchema>;
  export type ProfileSetupInput = z.infer<typeof profileSetupSchema>;
}
