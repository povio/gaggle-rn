import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { type PropsWithChildren, useEffect, useState } from "react";

import { useAuthStore } from "@/modules/auth/stores/authStore";
import { supabase } from "@/utils/supabase";

void SplashScreen.preventAutoHideAsync();

export default function SplashScreenController({ children }: PropsWithChildren) {
  const { restore } = useAuthStore();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    "Inter-SemiBold": require("../../../assets/fonts/Inter-SemiBold.otf"),
    "Inter-SemiBold-Italic": require("../../../assets/fonts/Inter-SemiBold-Italic.otf"),
    "Inter-Medium": require("../../../assets/fonts/Inter-Medium.otf"),
    "Inter-Medium-Italic": require("../../../assets/fonts/Inter-Medium-Italic.otf"),
    "Inter-Regular": require("../../../assets/fonts/Inter-Regular.otf"),
    "Inter-Regular-Italic": require("../../../assets/fonts/Inter-Regular-Italic.otf"),
    "Syne-Medium": require("../../../assets/fonts/Syne-Medium.ttf"),
    "Syne-SemiBold": require("../../../assets/fonts/Syne-SemiBold.ttf"),
  });

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        restore(session.access_token);
      } else {
        restore(null);
      }
      setIsAuthLoading(false);
    };

    void initAuth();
  }, [restore]);

  useEffect(() => {
    if ((fontsLoaded || fontError) && !isAuthLoading) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, fontError, isAuthLoading]);

  return <>{children}</>;
}
