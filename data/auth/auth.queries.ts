import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/utils/supabase";

import type { AuthModels } from "./auth.models";

export namespace AuthQueries {
  export const useSignIn = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (input: AuthModels.SignInInput) => {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: input.email,
          password: input.password,
        });

        if (authError) throw authError;
        if (!authData.session || !authData.user) {
          throw new Error("Failed to sign in");
        }

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select(`
            id,
            email,
            user_name,
            first_name,
            last_name,
            street_address,
            apartment,
            city,
            state,
            zip_code,
            created_at,
            children (
              id,
              user_id,
              first_name,
              last_name,
              birthdate,
              gender,
              age,
              school_name,
              created_at
            )
          `)
          .eq("id", authData.user.id)
          .single();

        if (userError) throw userError;
        if (!userData) throw new Error("User profile not found");

        return {
          session: {
            accessToken: authData.session.access_token,
            refreshToken: authData.session.refresh_token,
          },
          user: {
            id: userData.id,
            email: userData.email,
            userName: userData.user_name,
            firstName: userData.first_name,
            lastName: userData.last_name,
            streetAddress: userData.street_address,
            apartment: userData.apartment,
            city: userData.city,
            state: userData.state,
            zipCode: userData.zip_code,
            createdAt: userData.created_at,
            children: (userData.children || []).map((child: any) => ({
              id: child.id,
              userId: child.user_id,
              firstName: child.first_name,
              lastName: child.last_name,
              birthdate: child.birthdate,
              gender: child.gender,
              age: child.age,
              schoolName: child.school_name,
              createdAt: child.created_at,
            })),
          },
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["auth"] });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });
  };
}
