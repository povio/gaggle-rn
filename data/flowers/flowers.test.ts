import { renderHook, waitFor } from "@testing-library/react-native";
import { AxiosError } from "axios";
import nock from "nock";

import { flowrspotApiUrl } from "../../constants/flowrspot";
import { testFlowerApiResponse } from "../../testing/fixtures";
import { TestQueryProvider, testQueryClient } from "../../testing/utils";
import { flowersListDtoModel } from "./flowers.models";
import { useFlowersList } from "./flowers.queries";

describe("flowers api", () => {
  afterEach(() => {
    // Clear the client after each test run to have a clean state
    testQueryClient.clear();
  });

  describe("list", () => {
    const scope = nock(flowrspotApiUrl).get("/v1/flowers");

    it("should return the fetched data when API call is successful", async () => {
      scope.reply(200, testFlowerApiResponse);
      const { result } = renderHook(() => useFlowersList(), { wrapper: TestQueryProvider });

      expect(result.current.isFetching).toBe(true);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(flowersListDtoModel.parse(testFlowerApiResponse));
    });

    it("should return error when API call fails", async () => {
      const error = new AxiosError("Request failed with status code 400");
      scope.reply(400, error);
      const { result } = renderHook(() => useFlowersList(), { wrapper: TestQueryProvider });

      expect(result.current.isFetching).toBe(true);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.data).not.toBeDefined();
      expect(result.current.error).toEqual(error);
    });
  });
});
