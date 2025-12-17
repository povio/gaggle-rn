import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Image from "@/components/Image";
import Text from "@/components/text/Text";

const RateUsFinish = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/profile-settings");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      paddingHorizontal="6"
    >
      <Box
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom="6"
        marginTop={"10"}
        position={"relative"}
      >
        <Box
          justifyContent="center"
          alignContent="center"
          backgroundColor="elevation-background"
          width={38}
          height={38}
          borderRadius="full"
          position={"absolute"}
          left={-5}
          zIndex={10}
        >
          <IconButton
            icon={<ArrowLeftIcon />}
            onPress={handleBack}
            variant="transparent"
            style={styles.headerIcon}
          />
        </Box>
        <Box
          alignItems="center"
          flexGrow={1}
          gap="4"
        >
          <Text
            variant="variant-6-prominent"
            textAlign="center"
          >
            Rate Us
          </Text>
        </Box>
      </Box>
      <Box
        flexDirection={"column"}
        gap="6"
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={"6"}
      >
        <Box
          borderRadius="full"
          overflow="hidden"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            source={require("@/assets/illustrations/flock_envelope_open.svg")}
            style={styles.illustration}
            contentFit="contain"
          />
        </Box>
        <Text
          variant="variant-5-prominent"
          textAlign="center"
        >
          Thank You!
        </Text>
        <Text textAlign="center">Your feedback is important for us!</Text>
        <Button
          label="KEEP EXPLORING"
          onPress={() => router.push("/(app)/(tabs)")}
          variant="secondary"
          // style={styles.button}
          textVariant="variant-2-prominent"
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    padding: 0,
    alignSelf: "center",
  },
  illustration: {
    width: 140,
    height: 140,
  },
});

export default RateUsFinish;
