import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Text from "@/components/text/Text";
import Image from "@/components/Image";

const WaitlistInput = () => {
  const router = useRouter();

  const handleGotIt = () => {
    router.replace("/");
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
        gap="6"
      >
<Image
            source={require("@/assets/illustrations/flock_checklist_1.svg")}
            style={styles.illustration}
            contentFit="contain"
          />

        <Box
          gap="8"
          alignItems="center"
          paddingHorizontal="4"
        >
          <Text
            variant="display-3-prominent-1"
            textAlign="center"
          >
            You've been added{"\n"}to the waitlist.
          </Text>

          <Text
            variant="label-1-default"
            textAlign="center"
            color="text-default-secondary"
          >
            We will get in touch when a spot{"\n"}becomes available
          </Text>

          <Button
          label="GOT IT"
          onPress={handleGotIt}
          width="l"
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
    zIndex: -1
  },
  yellowCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#F5C344",
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: 140,
    height: 140,
  },
});

export default WaitlistInput;
