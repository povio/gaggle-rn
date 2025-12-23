import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { type PropsWithChildren, useEffect, useState } from "react";

import { STORAGE_KEYS } from "@/constants/storage";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { getStorageItemAsync } from "@/utils/secureStore";

void SplashScreen.preventAutoHideAsync();

export default function SplashScreenController({ children }: PropsWithChildren) {
  const { restore } = useAuthStore();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    "BalooBhai2-Regular": require("../../../assets/fonts/BalooBhai2-Regular.ttf"),
    "BalooBhai2-Medium": require("../../../assets/fonts/BalooBhai2-Medium.ttf"),
    "BalooBhai2-SemiBold": require("../../../assets/fonts/BalooBhai2-SemiBold.ttf"),
    "BalooBhai2-Bold": require("../../../assets/fonts/BalooBhai2-Bold.ttf"),
    "BalooBhai2-ExtraBold": require("../../../assets/fonts/BalooBhai2-ExtraBold.ttf"),
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = await getStorageItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        restore(token);
      } else {
        restore(null);
      }
      setIsAuthLoading(false);
    };

    void initAuth();
  }, [restore]);

  useEffect(() => {
    if ((fontsLoaded || fontError) && !isAuthLoading) {
      SplashScreen.hideAsync().catch((error) => {
        console.error("Failed to hide splash screen:", error);
      });
    }
  }, [fontsLoaded, fontError, isAuthLoading]);

  return <>{children}</>;
}
