import { useTheme } from "@shopify/restyle";
import React, { type ReactElement, cloneElement, useCallback, useState } from "react";
import { ActivityIndicator, type PressableProps } from "react-native";
import type { SvgProps } from "react-native-svg";

import type { IconButtonSize, IconButtonVariant } from "@/types";
import type { Theme, ThemeColor } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Pressable from "../Pressable";

const BORDER_WIDTH = 1;

export interface IconButtonProps extends PressableProps {
  onPress: () => void;
  icon: ReactElement<SvgProps>;
  variant: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
  disabled?: boolean;
}

const IconButton = ({ variant = "primary", size = "m", icon, disabled, loading, ...rest }: IconButtonProps) => {
  const theme = useTheme<Theme>();
  const [pressed, setPressed] = useState(false);

  const buttonSize = theme.iconButtonSizes[size];

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

  const getHitbox = useCallback((): number => {
    return size === "s" ? theme.spacing["hitbox-hitbox-s"] : 0;
  }, [theme, size]);

  const borderColor = getBorderColor(pressed);
  const backgroundColor = getBackgroundColor(pressed);
  const color = getLabelColor(pressed);
  const parsableColor = theme.colors[color];
  const hitSlop = getHitbox();

  // We always apply the border and thus need to subtract the border width from the padding
  const calculatedButtonSize =
    // @ts-ignore
    parseInt(theme.spacing[buttonSize], 10) - BORDER_WIDTH;

  return (
    <Pressable
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={BORDER_WIDTH}
      disabled={disabled}
      borderRadius="rounding-button-rounding"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      // oxlint-disable-next-line no-unsafe-type-assertion
      padding={buttonSize as any}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      alignSelf="flex-start"
      hitSlop={{ bottom: hitSlop, top: hitSlop, left: hitSlop, right: hitSlop }}
      style={{
        padding: calculatedButtonSize,
      }}
      {...rest}
    >
      {loading && (
        <Box
          width={24}
          height={24}
          alignItems="center"
          justifyContent="center"
        >
          <ActivityIndicator
            color={parsableColor}
            size="small"
          />
        </Box>
      )}
      {icon && !loading && (
        <Box
          width={24}
          height={24}
        >
          {cloneElement(icon, {
            color: parsableColor,
          })}
        </Box>
      )}
    </Pressable>
  );
};

export default IconButton;
