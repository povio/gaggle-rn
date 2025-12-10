import { useTheme } from "@shopify/restyle";

import { withPadding } from "@/utils/storybook";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import SkeletonComponent from "../skeletons/Skeleton";

const meta = {
  title: "Other/Skeleton",
  component: Box,
  decorators: [withPadding()],
};

export default meta;

export const Skeleton = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme<Theme>();

    if (!theme) {
      return null;
    }

    return (
      <Box
        gap="4"
        alignItems="center"
      >
        <Box>
          <SkeletonComponent
            borderRadius="full"
            width={100}
            height={100}
          />
        </Box>
        <SkeletonComponent
          width="100%"
          height={24}
        />
        <Box
          flexDirection="row"
          gap="4"
        >
          <SkeletonComponent
            flex={1}
            height={24}
          />
          <SkeletonComponent
            flex={1}
            height={24}
          />
          <SkeletonComponent
            flex={1}
            height={24}
          />
        </Box>
        <SkeletonComponent
          width="100%"
          height={50}
        />
        <SkeletonComponent
          width="100%"
          height={50}
        />
      </Box>
    );
  },
};
