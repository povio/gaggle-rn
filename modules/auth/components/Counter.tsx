import React from "react";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Text from "@/components/text/Text";

import { useCounterStore } from "../stores/userStore";

const Counter = () => {
  const { count, decrement, increment } = useCounterStore();

  return (
    <Box gap="3">
      <Text variant="body-4-prominent-1">Counter</Text>
      <Box>
        <Text>Zustand count: {count}</Text>
        <Box
          flexDirection="row"
          marginVertical="4"
          gap="4"
        >
          <Button
            variant="primary"
            label="Decrement"
            onPress={() => decrement()}
            disabled={count === 0}
          />
          <Button
            variant="primary"
            label="Increment"
            onPress={() => increment()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Counter;
