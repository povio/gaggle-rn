import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import CheckIcon from "@/assets/icons/CheckIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Image from "@/components/Image";
import Text from "@/components/text/Text";

const Bookings = () => {
  const router = useRouter();
  const [isNotified, setIsNotified] = useState<boolean>(false);

  const handleNotifyMe = () => {
    if (!isNotified) {
      setIsNotified(true);
      return;
    }

    router.push("./");
  };

  return (
    <Box
      flex={1}
      justifyContent="flex-start"
      backgroundColor="elevation-background"
    >
      <Text
        variant="variant-6-prominent"
        textAlign="center"
        paddingTop="10"
      >
        Booking
      </Text>
      <Box
        flex={1}
        paddingHorizontal="6"
        justifyContent="center"
        alignItems="center"
      >
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/illustrations/flock_checklist.svg")}
            style={styles.illustration}
            contentFit="contain"
          />
          {isNotified && (
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
          )}
        </View>

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
            {!isNotified ? "This page is coming soon!" : "Thank you!"}
          </Text>

          <Text
            variant="variant-4"
            textAlign="center"
            color="text-default-secondary"
          >
            {!isNotified ? "Do you want to be notified when it’s ready?" : "We will notify you as soon as possible"}
          </Text>
        </Box>

        <Box>
          <Button
            label={!isNotified ? "Notify me" : "Keep exploring"}
            onPress={handleNotifyMe}
            width="l"
            textVariant="variant-2-prominent"
            variant="secondary"
          />
        </Box>
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
  checkIcon: {
    color: "#ffffff",
    width: 26,
    height: 26,
  },
  illustration: {
    width: 183,
    height: 183,
  },
});

export default Bookings;
