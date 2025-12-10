import { useQuery } from "@tanstack/react-query";

import { FlowersApi } from "./flowers.api";

export const flowersQueryKeys = {
  all: ["flowers"] as const,
  list: () => [...flowersQueryKeys.all, "list"] as const,
} as const;

export const useFlowersList = () => {
  return useQuery({
    queryKey: flowersQueryKeys.list(),
    queryFn: () => FlowersApi.list(),
  });
};
