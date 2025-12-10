import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import { type CreateFlowerValues, createFlowerModel } from "@/data/flowers";

const CreateFlowerForm = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<CreateFlowerValues>({
    resolver: zodResolver(createFlowerModel),
    mode: "onChange",
  });

  const handleFormSubmit = (values: CreateFlowerValues) => {
    console.log(values);
    Alert.alert(
      "Submit would succeed!",
      "But we don't have that implemented yet... Confirm to go back to flowers list screen.",
      [{ text: "Back to flowers list", onPress: () => router.back() }],
    );
  };

  return (
    <Box
      p="4"
      paddingBottom="12"
      flex={1}
    >
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <Input
            error={error?.message}
            label="Name"
            placeholder="e.g. Bee Orchid..."
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="latinName"
        render={({ field, fieldState: { error } }) => (
          <Input
            error={error?.message}
            label="Latin name"
            placeholder="e.g. Ophrys apifera..."
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState: { error } }) => (
          <Input
            error={error?.message}
            type="textArea"
            label="Description"
            placeholder="Up to 140 characters..."
            onChangeText={field.onChange}
            value={field.value}
            limit={140}
          />
        )}
      />
      <Box flex={1} />
      <Button
        label="Create flower"
        onPress={handleSubmit(handleFormSubmit)}
      />
    </Box>
  );
};

export default CreateFlowerForm;
