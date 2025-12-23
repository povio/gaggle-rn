import StarIcon from "@/assets/icons/StarIcon";
import Text from "@/components/text/Text";

import Box from "../Box";

interface ReviewStarsProps {
  color: string;
  width: number;
  height: number;
  rating: number;
  count?: number;
}

export const ReviewStars = ({ color, width, height, rating = 2, count }: ReviewStarsProps) => {
  // Round rating: < 0.5 rounds down, >= 0.5 rounds up
  const filledStars = Math.round(rating);
  const totalStars = 5;

  return (
    <Box
      flexDirection={"row"}
      alignItems={"center"}
      gap="1"
      marginTop={"2"}
    >
      {Array.from({ length: totalStars }, (_, index) => (
        <StarIcon
          key={index}
          color={index < filledStars ? color : "#DADADA"}
          width={width}
          height={height}
        />
      ))}
      {count && count > 0 ? (
        <Text
          paddingTop={"1"}
          variant="variant-8"
          color={"text-disabled"}
        >
          ({count})
        </Text>
      ) : null}
    </Box>
  );
};
