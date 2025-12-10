import { useTheme } from "@shopify/restyle";
import React, { type ReactElement, cloneElement, useCallback, useState } from "react";
import type { PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";

import type { FABVariant } from "@/types";
import type { Theme, ThemeColor } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Pressable from "../Pressable";

const BORDER_WIDTH = 1;

export interface FABProps extends PressableProps {
  onPress: () => void;
  icon: ReactElement<SvgProps>;
  variant: FABVariant;
  disabled?: boolean;
}

const FAB = ({ variant = "primary", icon, disabled, ...rest }: FABProps) => {
  const theme = useTheme<Theme>();
  const [pressed, setPressed] = useState(false);

  const getBackgroundColor = useCallback(
    (pressed: boolean): ThemeColor => {
      if (!theme?.iconButtonVariants[variant]) {
        return "transparent";
      }
      const { backgroundColor, backgroundColorPressed, backgroundColorDisabled } = theme.iconButtonVariants[variant];

      if (disabled) return backgroundColorDisabled;
      if (pressed) return backgroundColorPressed;
      return backgroundColor;
    },
    [theme, variant, disabled],
  );
  const getBorderColor = useCallback(
    (pressed: boolean): ThemeColor => {
      if (!theme?.iconButtonVariants[variant]) {
        return "transparent";
      }
      const { borderColor, borderColorPressed, borderColorDisabled } = theme.iconButtonVariants[variant];

      if (disabled) return borderColorDisabled;
      if (pressed) return borderColorPressed;
      return borderColor;
    },
    [theme, disabled, variant],
  );

  const getLabelColor = useCallback(
    (pressed: boolean): ThemeColor => {
      if (!theme?.iconButtonVariants[variant]) {
        return "transparent";
      }
      const { color, colorPressed, colorDisabled } = theme.iconButtonVariants[variant];

      if (disabled) return colorDisabled;
      if (pressed) return colorPressed;
      return color;
    },
    [theme, disabled, variant],
  );

  const borderColor = getBorderColor(pressed);
  const backgroundColor = getBackgroundColor(pressed);
  const color = getLabelColor(pressed);
  const parsableColor = theme.colors[color];

  return (
    <Pressable
      position="absolute"
      margin="6"
      bottom={0}
      right={0}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={BORDER_WIDTH}
      disabled={disabled}
      borderRadius="full"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      padding="height-height-l"
      flexDirection="row"
      style={{ ...theme.shadows["shadow-2"] }}
      {...rest}
    >
      <Box
        width={24}
        height={24}
      >
        {cloneElement(icon, {
          color: parsableColor,
        })}
      </Box>
    </Pressable>
  );
};

export default FAB;
