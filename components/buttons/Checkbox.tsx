import { useTheme } from "@shopify/restyle";
import React, { useCallback, useState } from "react";
import { Pressable as BasePressable } from "react-native";

import CheckIcon from "@/assets/icons/CheckIcon";
import IndeterminateIcon from "@/assets/icons/IndeterminateIcon";
import type { Theme, ThemeColor } from "@/utils/theme/restyleTheme";

import Box from "../Box";

export interface CheckboxProps {
  checked?: boolean | "indeterminate";
  disabled?: boolean;
  onChange: () => void;
}

const Checkbox = ({ checked, onChange, disabled, ...rest }: CheckboxProps) => {
  const theme = useTheme<Theme>();
  const [pressed, setPressed] = useState(false);

  const getBackgroundColor = useCallback(
    (pressed: boolean): ThemeColor => {
      if (disabled) return "interactive-icon-disabled";
      if (pressed) return "interactive-icon-pressed";
      return checked ? "interactive-icon-idle-2" : "interactive-icon-idle";
    },
    [theme, checked, disabled],
  );

  const backgroundColor = getBackgroundColor(pressed);
  const textColor = "interactive-primary-on";
  const calculatedTextColor = theme.colors["interactive-primary-on"];

  return (
    <BasePressable
      onPress={onChange}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={disabled}
      {...rest}
    >
      <Box
        borderRadius="s"
        width={20}
        height={20}
        alignItems="center"
        justifyContent="center"
        backgroundColor={backgroundColor}
      >
        <Box
          width={checked ? 0 : 16}
          height={checked ? 0 : 16}
          backgroundColor={textColor}
          borderRadius="xs"
        />
        {checked === true && <CheckIcon color={calculatedTextColor} />}
        {checked === "indeterminate" && <IndeterminateIcon color={calculatedTextColor} />}
      </Box>
    </BasePressable>
  );
};

export default Checkbox;
