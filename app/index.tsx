import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import LoadingScreen from "@/components/LoadingScreen";
import { useOnboarding } from "@/hooks/useOnboarding";

export default function Index() {
  const router = useRouter();
  const { getOnboardingStep } = useOnboarding();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOnboardingAndNavigate = async () => {
      try {
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
      } catch (error) {
        console.error("Error checking onboarding state:", error);
        router.replace("/welcome");
      } finally {
        setIsChecking(false);
      }
    };

    checkOnboardingAndNavigate();
  }, [router]);

  return <LoadingScreen />;
}
