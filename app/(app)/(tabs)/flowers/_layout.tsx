import { Stack } from "expo-router";

export default function FlowerListLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Flowers" }}
      />
      <Stack.Screen
        name="[name]"
        options={{ title: "Flower details" }}
      />
    </Stack>
  );
}
