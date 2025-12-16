import { useTheme } from "@shopify/restyle";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import React, { type ReactElement, type ReactNode, useState } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Pressable from "../Pressable";
import Text from "../text/Text";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface AccordionProps {
  trigger: string;
  helperText?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion = ({ trigger, helperText, children, defaultOpen = false, onToggle }: AccordionProps) => {
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
        <Box
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          paddingRight={"3"}
          paddingLeft={"5"}
          paddingVertical={"3"}
          borderColor={"text-disabled"}
          borderRadius={"m"}
          borderWidth={1}
        >
          <Text
            flexGrow={1}
            variant={"variant-11"}
          >
            {trigger}
          </Text>
          <Box
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"3"}
          >
            {helperText && (
              <Text
                variant={"variant-11"}
                color="text-disabled"
              >
                {helperText}
              </Text>
            )}
            <Box
              backgroundColor={"main-theme-active"}
              width={23}
              height={23}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              flexGrow={0}
              borderRadius={"full"}
            >
              {isOpen ? <ChevronUp width={16} /> : <ChevronDown width={16} />}
            </Box>
          </Box>
        </Box>
      </Pressable>

      {isOpen && children}
    </Box>
  );
};

export default Accordion;
