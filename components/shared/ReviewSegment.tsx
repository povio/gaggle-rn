import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import StarIcon from "@/assets/icons/StarIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Text from "@/components/text/Text";

import { ReviewStars } from "./ReviewStars";

export default function ReviewSegment() {
  const router = useRouter();

  return (
    <Box>
      <Text
        variant="variant-6-prominent"
        textAlign="left"
      >
        What parents say
      </Text>
      <ReviewStars
        color="#FFD035"
        width={24}
        height={24}
      />
      <Button
        variant="text"
        onPress={() => {}}
        label="Check reviews"
        width="s"
        style={styles.reviewBtn}
      />
      <Button
        variant="outlined"
        textVariant="variant-2-prominent"
        onPress={() => router.push("/review")}
        label="LEAVE A REVIEW"
        width="fit"
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  reviewBtn: {
    alignSelf: "flex-start",
    textDecorationLine: "underline",
    marginTop: 15,
    marginBottom: 20,
  },
});
