import StarIcon from "@/assets/icons/StarIcon";

import Box from "../Box";

interface ReviewStarsProps {
  color: string;
  width: number;
  height: number;
}

export const ReviewStars = ({ color, width, height }: ReviewStarsProps) => {
  return (
    <Box
      flexDirection={"row"}
      alignItems={"center"}
      gap="1"
      marginTop={"2"}
    >
      <StarIcon
        color={color}
        width={width}
        height={height}
      />
      <StarIcon
        color={color}
        width={width}
        height={height}
      />
      <StarIcon
        color={color}
        width={width}
        height={height}
      />
      <StarIcon
        color={color}
        width={width}
        height={height}
      />
      <StarIcon
        color={color}
        width={width}
        height={height}
      />
    </Box>
  );
};
