import { useTheme } from "@shopify/restyle";
import React, { type ReactElement, type ReactNode, useState } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Pressable from "../Pressable";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionProps {
  trigger: ReactElement;
  children: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion = ({ trigger, children, defaultOpen = false, onToggle }: AccordionProps) => {
  const theme = useTheme<Theme>();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  const hitSlop = theme.spacing["hitbox-hitbox-m"];

  return (
    <Box
      backgroundColor="elevation-background"
      borderRadius="m"
      overflow="hidden"
      width={"100%"}
      gap="4"
      flexDirection={"column"}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        hitSlop={{ bottom: hitSlop, top: hitSlop, left: hitSlop, right: hitSlop }}
        opacity={pressed ? 0.7 : 1}
        width={"100%"}
      >
        {trigger}
      </Pressable>

      {isOpen && children}
    </Box>
  );
};

export default Accordion;
