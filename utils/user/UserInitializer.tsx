import { useEffect } from "react";

import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useUserStore } from "@/modules/user/userStore";
import { UserQueries } from "@/openapi/user/user.queries";

/**
 * UserInitializer - Automatically fetches user data when token exists
 *
 * This component runs after the splash screen and ensures user settings
 * are loaded when the user is authenticated (e.g., after app restart with stored token).
 */
export const UserInitializer = () => {
  const { token } = useAuthStore();
  const { user, settings, setUser, setSettings } = useUserStore();

  // Fetch user data if logged in but user data is missing
  const { data: userData } = UserQueries.useGet({
    enabled: !!token && !user,
  });

  // Fetch settings if logged in but settings are missing
  const { data: settingsData } = UserQueries.useGetMySettings({
    enabled: !!token && !settings,
  });

  // Update store when user data is fetched
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  // Update store when settings are fetched
  useEffect(() => {
    if (settingsData) {
      setSettings(settingsData);
    }
  }, [settingsData, setSettings]);

  return null; // This component renders nothing
};
