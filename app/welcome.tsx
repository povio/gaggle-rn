import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";

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

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      justifyContent="space-between"
      paddingHorizontal="6"
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
        gap="4"
      >
        <Button
          label="Sign up using invitation code"
          onPress={handleSignUpWithCode}
          width="l"
          variant="primary"
        />

         <Box alignItems="center" justifyContent="center" width="100%" flexDirection="row">
          <TextButton
            label="JOIN OUR WAITLIST"
            onPress={handleJoinWaitlist}
            variant="secondary"
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
