import { Redirect, Stack } from "expo-router";

import { useAuthStore } from "@/modules/auth/stores/authStore";

export default function AppLayout() {
  const { token, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (!token) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="create"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}
