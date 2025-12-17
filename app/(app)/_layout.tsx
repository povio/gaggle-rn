import { Stack } from "expo-router";

import { useAuthStore } from "@/modules/auth/stores/authStore";

export default function AppLayout() {
  const { token, isLoading } = useAuthStore();

  // Show nothing while checking auth or when logged out
  // Navigation is handled by the pages themselves
  if (isLoading || !token) {
    return null;
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
