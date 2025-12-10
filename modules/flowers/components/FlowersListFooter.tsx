import { Link } from "expo-router";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";

export const FlowersListFooter = () => {
  return (
    <Box
      paddingHorizontal="2"
      paddingVertical="4"
    >
      <Link
        href="/(app)/create"
        asChild
      >
        <Button label="Add new Flower" />
      </Link>
    </Box>
  );
};
