import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import TextButton from "@/components/buttons/TextButton";
import { WelcomeCarousel } from "@/components/WelcomeCarousel";
import { STORAGE_KEYS } from "@/constants/storage";
import { getStorageItemAsync } from "@/utils/secureStore";

const Welcome = () => {
  const router = useRouter();
  const [lastEmail, setLastEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkUserCreated = () => {
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        const userCreated = localStorage.getItem("user_created");
        if (userCreated) {
          router.replace("/create-password");
        }
      }
    };

    const loadLastEmail = async () => {
      const email = await getStorageItemAsync(STORAGE_KEYS.LAST_SIGNED_IN_EMAIL);
      setLastEmail(email);
    };

    checkUserCreated();
    loadLastEmail();
  }, [router]);

  const handleSignUpWithCode = () => {
    router.push("/enter-email?mode=onboarding");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleJoinWaitlist = () => {
    router.push("/enter-email?mode=waitlist");
  };

  const continueAsGuest = () => {};

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      justifyContent="space-between"
    >
      <View style={styles.topCircle} />

      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="4"
      >
        <WelcomeCarousel />
      </Box>

      <Box
        paddingBottom="8"
        paddingHorizontal="12"
        gap="4"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          label={lastEmail ? "Sign In" : "Sign up using invitation code"}
          onPress={lastEmail ? handleSignIn : handleSignUpWithCode}
          width="l"
          size="large"
          textVariant="variant-11"
          variant="primary"
        />

        {!lastEmail && (
          <Box
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <TextButton
              label="JOIN OUR WAITLIST"
              onPress={handleJoinWaitlist}
              variant="secondary"
              width="100%"
            />
          </Box>
        )}

        <Box
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <TextButton
            label="Continue as Guest"
            onPress={continueAsGuest}
            variant="secondary"
            width="100%"
          />
        </Box>
      </Box>

      <View style={styles.bottomCircle} />
    </Box>
  );
};

const styles = StyleSheet.create({
  topCircle: {
    position: "absolute",
    top: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
  },
  textBtn: {
    width: "100%",
  },
  bottomCircle: {
    position: "absolute",
    bottom: -150,
    right: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
    zIndex: -1,
  },
});

export default Welcome;
