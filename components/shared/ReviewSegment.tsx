import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Text from "@/components/text/Text";

import { ReviewStars } from "./ReviewStars";

interface ReviewSegmentProps {
  rating: number;
  count: number;
  id: string;
}

export default function ReviewSegment({ rating, count, id }: ReviewSegmentProps) {
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
        rating={rating}
        count={count}
      />
      <Button
        variant="text"
        onPress={() => router.push(`/review/list/${id}`)}
        label="Check reviews"
        width="s"
        style={styles.reviewBtn}
      />
      <Button
        variant="outlined"
        textVariant="variant-2-prominent"
        onPress={() => router.push(`/review/${id}`)}
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
