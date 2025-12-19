import { type ExternalPathString, type RelativePathString, useRouter } from "expo-router";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";

import Box from "../Box";
import IconButton from "../buttons/IconButton";

interface GoBackProps {
  url?: RelativePathString | ExternalPathString;
  left?: number;
  top?: number;
}

export const GoBack = ({ url, left, top }: GoBackProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (url) {
      router.push(url);
    } else {
      try {
        router.back();
      } catch {
        router.push("/");
      }
    }
  };

  return (
    <Box
      justifyContent="center"
      alignContent="center"
      backgroundColor="elevation-background"
      width={38}
      height={38}
      borderRadius="full"
      position={"absolute"}
      left={left || 15}
      top={top || 25}
      zIndex={10}
    >
      <IconButton
        icon={<ArrowLeftIcon />}
        onPress={handleBack}
        variant="transparent"
      />
    </Box>
  );
};
