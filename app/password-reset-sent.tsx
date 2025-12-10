import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Image from "@/components/Image";
import Text from "@/components/text/Text";

const PasswordResentSent = () => {
  const router = useRouter();

  const handleGotIt = () => {
    router.push("/");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      paddingHorizontal="6"
      justifyContent="center"
      alignItems="center"
    >
      <View style={styles.illustrationContainer}>
        <View style={styles.circle} />
        <Image
          source={require("@/assets/illustrations/flock_envelope_open.svg")}
          style={styles.illustration}
          contentFit="contain"
        />
      </View>

      <Box
        marginTop="8"
        marginBottom="6"
        alignItems="center"
      >
        <Text
          variant="title-1-prominent-1"
          textAlign="center"
          marginBottom="4"
        >
          We’ve sent you the reset link
        </Text>

      </Box>

      <Box
        marginTop="8"
        width="100%"
      >
        <Button
          label="RESET PASSWORD"
          onPress={handleGotIt}
          width="l"
          variant="primary"
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  illustrationContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
  circle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F5C344",
    zIndex: -1,
  },
  illustration: {
    width: 120,
    height: 120,
  },
});

export default PasswordResentSent;
