import { useTheme } from "@shopify/restyle";

import type { Theme } from "@/utils/theme/restyleTheme";

const useAppTheme = () => {
  return useTheme<Theme>();
};

export default useAppTheme;
