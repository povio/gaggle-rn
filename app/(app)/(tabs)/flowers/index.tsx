import Box from "@/components/Box";
import { FlowersList } from "@/modules/flowers/components/FlowersList";

const FlowersListScreen = () => {
  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
    >
      <FlowersList />
    </Box>
  );
};

export default FlowersListScreen;
