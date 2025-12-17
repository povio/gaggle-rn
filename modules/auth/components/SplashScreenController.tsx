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
    "BalooBhai2-Regular": require("../../../assets/fonts/BalooBhai2-Regular.ttf"),
    "BalooBhai2-Medium": require("../../../assets/fonts/BalooBhai2-Medium.ttf"),
    "BalooBhai2-SemiBold": require("../../../assets/fonts/BalooBhai2-SemiBold.ttf"),
    "BalooBhai2-Bold": require("../../../assets/fonts/BalooBhai2-Bold.ttf"),
    "BalooBhai2-ExtraBold": require("../../../assets/fonts/BalooBhai2-ExtraBold.ttf"),
  });

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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
