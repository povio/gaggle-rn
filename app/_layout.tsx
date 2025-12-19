import * as Sentry from "@sentry/react-native";
import { Stack } from "expo-router";
import Toastable from "react-native-toastable";

import SplashScreenController from "@/modules/auth/components/SplashScreenController";

import AppProviders from "../utils/providers/AppProviders";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  debug: false,
});

const RootLayout = () => {
  return (
    <AppProviders>
      <SplashScreenController>
        <Stack screenOptions={{ headerShown: false, headerBackVisible: true }}>
          <Stack.Screen name="(app)" />
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="waitlist-input" />
          <Stack.Screen name="enter-email" />
          <Stack.Screen name="code-resent" />
          <Stack.Screen name="invitation-code" />
          <Stack.Screen name="create-password" />
          <Stack.Screen name="profile-setup" />
          <Stack.Screen name="sign-in" />
          <Stack.Screen
            name="sign-up"
            options={{ title: "Sign Up", headerShown: true }}
          />
          <Stack.Screen
            name="forgot-password"
            options={{ title: "Forgot Password", headerShown: true }}
          />
          <Stack.Screen name="password-reset-sent" />
        </Stack>
        <Toastable />
      </SplashScreenController>
    </AppProviders>
  );
};

export default Sentry.wrap(RootLayout);
