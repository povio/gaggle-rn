import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

import CheckIcon from "@/assets/icons/CheckIcon";
import GaggleLogoIcon from "@/assets/icons/GaggleLogoIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Text from "@/components/text/Text";

const ReviewSubmitted = () => {
  const router = useRouter();

  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      backgroundColor="elevation-background"
    >
      <Box
        flex={1}
        paddingHorizontal="6"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <GaggleLogoIcon
            width={80}
            height={80}
          />
          <Box
            justifyContent="center"
            alignItems="center"
            backgroundColor="pill-outlined-border"
            width={53}
            height={53}
            borderRadius="full"
            position="absolute"
            right={0}
            top={25}
          >
            <CheckIcon style={styles.checkIcon} />
          </Box>
        </Box>

        <Box
          marginTop="8"
          marginBottom="6"
          alignItems="center"
        >
          <Text
            variant="variant-6-prominent"
            textAlign="center"
            marginBottom="4"
          >
            Your review has been submitted!
          </Text>
        </Box>

        <Box
          flexDirection={"column"}
          gap={"2"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button
            label="KEEP EXPLORING"
            onPress={() => router.push("/")}
            width="l"
            textVariant="variant-2-prominent"
            variant="secondary"
          />
          <Button
            label="Back"
            onPress={() => router.back()}
            width="l"
            textVariant="variant-8"
            variant="text"
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    color: "#ffffff",
    width: 26,
    height: 26,
  },
});

export default ReviewSubmitted;
