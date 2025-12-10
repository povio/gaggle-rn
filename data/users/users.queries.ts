import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { UsersModels } from "./users.models";

export namespace UsersQueries {
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

        const { error: insertError } = await supabase
          .from("users")
          .insert({
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
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error("User not authenticated");

        const { error: profileError } = await supabase
          .from("users")
          .update({
            user_name: input.userName,
            first_name: input.firstName || null,
            last_name: input.lastName || null,
            street_address: input.streetAddress || null,
            apartment: input.apartment || null,
            city: input.city || null,
            state: input.state || null,
            zip_code: input.zipCode || null,
          })
          .eq("id", user.id);

        if (profileError) throw profileError;

        if (input.children && input.children.length > 0) {
          const childrenToInsert = input.children.map(child => ({
            user_id: user.id,
            first_name: child.firstName || '',
            last_name: child.lastName || '',
            birthdate: child.birthdate || '',
            gender: child.gender || '',
            age: child.age || '',
            school_name: child.schoolName || '',
          }));

          const { error: childrenError } = await supabase
            .from("children")
            .insert(childrenToInsert);

          if (childrenError) throw childrenError;
        }

        return {
          success: true,
          userId: user.id,
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["children"] });
      },
    });
  };
}
