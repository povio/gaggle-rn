import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuthStore } from "@/modules/auth/stores/authStore";

export default function Index() {
  const router = useRouter();
  const { getOnboardingStep } = useOnboarding();
  const { token, isLoading } = useAuthStore();
  const [hasNavigated, setHasNavigated] = useState(false);

  console.log('[Index] Component render - token:', token, 'isLoading:', isLoading, 'hasNavigated:', hasNavigated);
  console.log('[Index] About to check render conditions - token truthy?', !!token, 'isLoading?', isLoading);

  useEffect(() => {
    console.log('[Index] useEffect fired - token:', token, 'isLoading:', isLoading, 'hasNavigated:', hasNavigated);

    if (isLoading || hasNavigated) {
      console.log('[Index] Early return - isLoading:', isLoading, 'hasNavigated:', hasNavigated);
      return;
    }

    if (token) {
      console.log('[Index] Early return - token exists');
      return;
    }

    console.log('[Index] Starting checkOnboardingAndNavigate');

    const checkOnboardingAndNavigate = async () => {
      try {
        // Wait for the 3-second loading animation to complete
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const step = await getOnboardingStep();

        switch (step) {
          case "sign-in":
            router.replace("/sign-in");
            break;
          case "profile-setup":
            router.replace("/profile-setup");
            break;
          case "create-password":
            router.replace("/create-password");
            break;
          case "welcome":
          default:
            router.replace("/welcome");
            break;
        }
        setHasNavigated(true);
      } catch (error) {
        console.error("Error checking onboarding state:", error);
        router.replace("/welcome");
        setHasNavigated(true);
      }
    };

    void checkOnboardingAndNavigate();
  }, [router, token, isLoading, getOnboardingStep, hasNavigated]);

  if (isLoading) {
    console.log('[Index] Rendering null - isLoading true');
    return null;
  }

  if (token) {
    console.log('[Index] Token exists, redirecting to /(app)/(tabs)');
    return <Redirect href="/(app)/(tabs)" />;
  }

  console.log('[Index] Rendering LoadingScreen');
  return <LoadingScreen />;
}
