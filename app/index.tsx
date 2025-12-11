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

  useEffect(() => {
    if (isLoading || hasNavigated) {
      return;
    }

    if (token) {
      return;
    }

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
    return null;
  }

  if (token) {
    return <Redirect href="/(app)" />;
  }

  return <LoadingScreen />;
}
