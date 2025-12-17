import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "@/constants/storage";

export type OnboardingStep = "welcome" | "create-password" | "profile-setup" | "sign-in";

export const useOnboarding = () => {
  const setEmailVerified = async (email: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.EMAIL_VERIFIED, "true");
    await AsyncStorage.setItem(STORAGE_KEYS.WAITLIST_EMAIL, email);
  };

  const clearEmailVerified = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.EMAIL_VERIFIED);
    await AsyncStorage.removeItem(STORAGE_KEYS.WAITLIST_EMAIL);
  };

  const setUserCreated = async (email: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_CREATED, email);
    await clearEmailVerified();
  };

  const clearUserCreated = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_CREATED);
  };

  const setProfileSetup = async (userId: string) => {
    await AsyncStorage.setItem(STORAGE_KEYS.PROFILE_SETUP, userId);
    await clearUserCreated();
  };

  const clearProfileSetup = async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.PROFILE_SETUP);
  };

  const getWaitlistEmail = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(STORAGE_KEYS.WAITLIST_EMAIL);
  };

  const getUserCreated = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_CREATED);
  };

  const getOnboardingStep = async (): Promise<OnboardingStep> => {
    const emailVerified = await AsyncStorage.getItem(STORAGE_KEYS.EMAIL_VERIFIED);
    const waitlistEmail = await AsyncStorage.getItem(STORAGE_KEYS.WAITLIST_EMAIL);
    const userCreated = await AsyncStorage.getItem(STORAGE_KEYS.USER_CREATED);
    const profileSetup = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE_SETUP);

    if (profileSetup) {
      return "sign-in";
    }

    if (userCreated) {
      return "profile-setup";
    }

    if (emailVerified && waitlistEmail) {
      return "create-password";
    }

    return "welcome";
  };

  const clearAllOnboarding = async () => {
    await clearEmailVerified();
    await clearUserCreated();
    await clearProfileSetup();
  };

  return {
    setEmailVerified,
    clearEmailVerified,
    setUserCreated,
    clearUserCreated,
    setProfileSetup,
    clearProfileSetup,
    getWaitlistEmail,
    getUserCreated,
    getOnboardingStep,
    clearAllOnboarding,
  };
};
