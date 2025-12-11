import { useTheme } from "@shopify/restyle";
import React, { useCallback, useState } from "react";

import CloseIcon from "@/assets/icons/CloseIcon";
import type { PillButtonVariant } from "@/types";
import type { Theme, ThemeColor } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Pressable from "../Pressable";
import Text from "../text/Text";

export interface PillButtonProps {
  variant?: PillButtonVariant;
  checked?: boolean;
  label: string;
  dismissable?: boolean;
  onPress: () => void;
  disabled?: boolean;
  textVariant?: keyof Theme["textVariants"];
}

const PillButton = ({
  variant = "primary",
  checked,
  label,
  dismissable,
  onPress,
  disabled,
  textVariant = "variant-12",
  ...rest
}: PillButtonProps) => {
  const theme = useTheme<Theme>();
  const [pressed, setPressed] = useState(false);

  const getBackgroundColor = useCallback(
    (pressed: boolean): ThemeColor => {
      if (!theme?.pillVariants[variant]) {
        return "transparent";
      }
      const pillVariant = theme.pillVariants[variant];
      const { backgroundColor, backgroundColorPressed, backgroundColorDisabled } = pillVariant;
      const backgroundColorToggled = (pillVariant as any)?.backgroundColorToggled;

      if (disabled) return backgroundColorDisabled;
      if (checked && backgroundColorToggled) return backgroundColorToggled;
      if (pressed) return backgroundColorPressed;
      return backgroundColor;
    },
    [theme, variant, disabled, checked],
  );

  const getLabelColor = useCallback(
    (pressed: boolean): ThemeColor => {
      if (!theme?.pillVariants[variant]) {
        return "transparent";
      }
      const { color, colorPressed, colorDisabled } = theme.pillVariants[variant];

      if (disabled) return colorDisabled;
      if (pressed) return colorPressed;
      return color;
    },
    [theme, disabled, variant],
  );

  const getBorderColor = useCallback((): ThemeColor => {
    if (!theme?.pillVariants[variant]) {
      return "transparent";
    }
    const { borderColor, borderColorPressed, borderColorDisabled, borderColorDisabledToggled } =
      theme.pillVariants[variant];
    const borderColorToggled = (theme.pillVariants[variant] as any)?.borderColorToggled;

    if (checked && !disabled && borderColorToggled) return borderColorToggled;
    if (checked && !disabled) return borderColorPressed;
    if (checked && disabled) return borderColorDisabledToggled;
    if (!checked && disabled) return borderColorDisabled;

    return borderColor;
  }, [theme, disabled, checked, variant]);

  const backgroundColor = getBackgroundColor(pressed);
  const labelColor = getLabelColor(pressed);
  const borderColor = getBorderColor();
  const hitSlop = theme.spacing["hitbox-hitbox-xs"];

  return (
    <Pressable
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={1}
      disabled={disabled}
      borderRadius="m"
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      paddingVertical="1"
      paddingHorizontal="1-5"
      flexDirection="row"
      gap="interior-icon-to-label-spacing"
      alignSelf="flex-start"
      hitSlop={{ bottom: hitSlop, top: hitSlop, left: hitSlop, right: hitSlop }}
      {...rest}
    >
      <Text
        variant={textVariant}
        color={labelColor}
      >
        {label}
      </Text>
      {dismissable && (
        <Box
          justifyContent="center"
          alignItems="center"
        >
          <CloseIcon color={theme.colors[labelColor]} />
        </Box>
      )}
    </Pressable>
  );
};

export default PillButton;
