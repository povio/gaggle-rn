import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/input/Input";
import { ReviewStars } from "@/components/shared/ReviewStars";
import Text from "@/components/text/Text";

const RateUs = () => {
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
        gap="10"
        justifyContent={"flex-start"}
        alignItems={"center"}
        paddingTop={"6"}
      >
        <Box width={200}>
          <Text
            variant="variant-8"
            textAlign="center"
            color={"text-disabled"}
          >
            We really appreciate your feedback!
          </Text>
        </Box>

        <Box
          flexDirection={"column"}
          gap="4"
          alignItems={"center"}
          width={"100%"}
        >
          <Input
            type="textArea"
            placeholder="Leave your feedback"
            label=""
            onChangeText={() => {}}
            padding={"2"}
            borderRadius={"2xl"}
            backgroundColor={"elevation-background"}
          />
          <Button
            label="SUBMIT"
            onPress={() => router.push("/rate-us-finish")}
            variant="primary"
            style={styles.button}
            textVariant="variant-2-prominent"
          />
        </Box>
        <Button
          label="Rate us on the Apple App Store"
          onPress={() => {}}
          variant="text"
          textVariant="variant-11"
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
  button: {
    maxWidth: 210,
  },
  topCircle: {
    position: "absolute",
    top: -150,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
    zIndex: -1,
  },
});

export default RateUs;
