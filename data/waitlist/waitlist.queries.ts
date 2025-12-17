import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase";

import { WaitlistModels } from "./waitlist.models";

export namespace WaitlistQueries {
  export const useGetAllWaitlistEntries = () => {
    return useQuery({
      queryKey: ["waitlist", "all"],
      queryFn: async () => {
        const { data, error } = await supabase.from("waitlist").select("email, used");

        if (error) throw error;

        const emailMap: Record<string, boolean> = {};
        for (const entry of data) {
          emailMap[entry.email] = entry.used;
        }

        return emailMap;
      },
    });
  };

  export const useGetAllEmails = () => {
    return useQuery({
      queryKey: ["waitlist", "emails"],
      queryFn: async () => {
        const { data, error } = await supabase.from("waitlist").select("email");

        if (error) throw error;

        return data.map((entry) => entry.email);
      },
    });
  };

  export const useGetWaitlistEntryByEmail = (email: string) => {
    return useQuery({
      queryKey: ["waitlist", "entry", email],
      queryFn: async () => {
        const { data, error } = await supabase.from("waitlist").select("*").eq("email", email).maybeSingle();

        if (error) throw error;
        if (!data) return null;

        return WaitlistModels.waitlistEntrySchema.parse({
          id: data.id,
          email: data.email,
          code: data.code,
          createdAt: data.created_at,
          used: data.used,
        });
      },
      enabled: !!email,
    });
  };

  export const useCreateWaitlistEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ data }: { data: { email: string } }) => {
        const code = 1111;

        const { data: result, error } = await supabase
          .from("waitlist")
          .insert({
            email: data.email,
            code,
          })
          .select()
          .maybeSingle();

        if (error) throw error;
        if (!result) throw new Error("Failed to create waitlist entry");

        return WaitlistModels.waitlistEntrySchema.parse({
          id: result.id,
          email: result.email,
          code: result.code,
          createdAt: result.created_at,
          used: result.used,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["waitlist"] });
      },
    });
  };

  export const useVerifyInvitationCode = () => {
    return useMutation({
      mutationFn: async ({ email, code }: { email: string; code: string }) => {
        const { data, error } = await supabase
          .from("waitlist")
          .select("*")
          .eq("email", email)
          .eq("code", code)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Invalid invitation code");

        return WaitlistModels.waitlistEntrySchema.parse({
          id: data.id,
          email: data.email,
          code: data.code,
          createdAt: data.created_at,
          used: data.used,
        });
      },
    });
  };

  export const useMarkCodeAsUsed = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async ({ email }: { email: string }) => {
        const { data, error } = await supabase
          .from("waitlist")
          .update({ used: true })
          .eq("email", email)
          .select()
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Failed to mark code as used");

        return WaitlistModels.waitlistEntrySchema.parse({
          id: data.id,
          email: data.email,
          code: data.code,
          createdAt: data.created_at,
          used: data.used,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["waitlist"] });
      },
    });
  };
}
