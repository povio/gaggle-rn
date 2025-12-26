import { type ExternalPathString, type RelativePathString, useRouter } from "expo-router";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { useFilterStore } from "@/modules/search/stores/filterStore";

import Box from "../Box";
import IconButton from "../buttons/IconButton";

interface GoBackProps {
  url?: RelativePathString | ExternalPathString;
  left?: number;
  top?: number;
  resetFilter?: boolean;
}

export const GoBack = ({ url, left, top, resetFilter = false }: GoBackProps) => {
  const router = useRouter();
  const { clearAllFilters } = useFilterStore();

  const handleBack = () => {
    if (resetFilter) {
      clearAllFilters();
      if (url) {
        router.replace(url);
      } else {
        router.replace("/(app)/(tabs)");
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
