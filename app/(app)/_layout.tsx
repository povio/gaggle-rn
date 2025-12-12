import { Stack } from "expo-router";

import { useAuthStore } from "@/modules/auth/stores/authStore";

export default function AppLayout() {
  const { token, isLoading } = useAuthStore();

  console.log('[AppLayout] Render - token:', token, 'isLoading:', isLoading);

  // Show nothing while checking auth or when logged out
  // Navigation is handled by the pages themselves
  if (isLoading || !token) {
    console.log('[AppLayout] Rendering null - isLoading or no token');
    return null;
  }

  console.log('[AppLayout] Rendering Stack');
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
