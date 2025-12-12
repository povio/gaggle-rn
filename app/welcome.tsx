import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import TextButton from "@/components/buttons/TextButton";
import { WelcomeCarousel } from "@/components/WelcomeCarousel";

const Welcome = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserCreated = () => {
      if (Platform.OS === "web" && typeof localStorage !== "undefined") {
        const userCreated = localStorage.getItem("user_created");
        if (userCreated) {
          router.replace("/create-password");
        }
      }
    };

    checkUserCreated();
  }, [router]);

  const handleSignUpWithCode = () => {
    router.push("/enter-email");
  };

  const handleJoinWaitlist = () => {
    router.push("/enter-email");
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
          label="Sign up using invitation code"
          onPress={handleSignUpWithCode}
          width="l"
          size="large"
          textVariant="variant-11"
          variant="primary"
        />

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
