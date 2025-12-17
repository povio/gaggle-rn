import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { STORAGE_KEYS } from "@/constants/storage";
import { supabase } from "@/utils/supabase";

import type { UsersModels } from "./users.models";

export namespace UsersQueries {
  export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: ["currentUser"],
      queryFn: async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
          .from("users")
          .select("id, email, user_name, street_address, apartment, city, state, zip_code")
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("User not found");

        return data;
      },
    });
  };
  export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (input: UsersModels.CreateUserInput) => {
        const { data, error } = await supabase.auth.signUp({
          email: input.email,
          password: input.password,
        });

        if (error) throw error;
        if (!data.user) throw new Error("Failed to create user");

        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email,
        });

        if (insertError) throw insertError;

        return {
          id: data.user.id,
          email: data.user.email || input.email,
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };

  export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (input: UsersModels.ProfileSetupInput) => {
        const userCreated = await AsyncStorage.getItem(STORAGE_KEYS.USER_CREATED);

        if (!userCreated) throw new Error("User ID not found");

        const { error: profileError } = await supabase
          .from("users")
          .update({
            user_name: input.userName,
            street_address: input.streetAddress || null,
            apartment: input.apartment || null,
            city: input.city || null,
            state: input.state || null,
            zip_code: input.zipCode || null,
          })
          .eq("email", userCreated);

        if (profileError) throw profileError;

        const { data: userData } = await supabase.from("users").select("id").eq("email", userCreated).maybeSingle();

        if (!userData) throw new Error("User not found");

        if (input.children && input.children.length > 0) {
          const childrenToInsert = input.children.map((child) => ({
            user_id: userData.id,
            first_name: child.firstName || "",
            last_name: child.lastName || "",
            birthdate: child.birthdate || "",
            gender: child.gender || "",
            age: child.age || "",
            school_name: child.schoolName || "",
          }));

          const { error: childrenError } = await supabase.from("children").insert(childrenToInsert);

          if (childrenError) throw childrenError;
        }

        return {
          success: true,
          userId: userData.id,
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["children"] });
      },
    });
  };
}
