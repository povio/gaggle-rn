import { z } from "zod";

export namespace WaitlistModels {
  export const waitlistEntrySchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    code: z.string().length(4),
    createdAt: z.string(),
    used: z.boolean(),
  });

  export const createWaitlistEntrySchema = z.object({
    email: z.string().email(),
    code: z.string().length(4),
  });

  export const emailFormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
  });

  export type WaitlistEntry = z.infer<typeof waitlistEntrySchema>;
  export type CreateWaitlistEntry = z.infer<typeof createWaitlistEntrySchema>;
  export type EmailForm = z.infer<typeof emailFormSchema>;
}
