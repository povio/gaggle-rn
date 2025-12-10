import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { clamp, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box, { AnimatedBox } from "../Box";
import Text from "../text/Text";

const KNOB_WIDTH = 24;
const TOOLTIP_OFFSET = 12;

export interface SliderProps {
  min: number;
  max: number;
  title: string;
  onValueChange: (value: number) => void;
  unit?: string;
  disabled?: boolean;
}

const Slider = ({ title, min, max, unit, onValueChange, disabled }: SliderProps) => {
  const theme = useTheme<Theme>();
  const isPressed = useSharedValue(false);
  const thumbX = useSharedValue(0);
  const prevThumbX = useSharedValue(0);
  const sliderWidth = useSharedValue(0);

  const [selectedValue, setSelectedValue] = useState(0);

  const handleChange = (value: number) => {
    onValueChange(value);
    setSelectedValue(value);
  };

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
      prevThumbX.value = thumbX.value;
    })
    .onUpdate((e) => {
      if (disabled) return;
      thumbX.value = clamp(e.translationX + prevThumbX.value, 0, sliderWidth.value - KNOB_WIDTH);
      const normalizedValue = Math.round((thumbX.value / (sliderWidth.value - KNOB_WIDTH)) * (max - min) + min);
      runOnJS(handleChange)(normalizedValue);
    })
    .onEnd(() => {
      isPressed.value = false;
    });

  const knobStyle = useAnimatedStyle(() => {
    const getKnobBackgroundColor = (isPressed: boolean) => {
      if (disabled) {
        return theme.colors["interactive-primary-disabled"];
      }
      return isPressed ? theme.colors["interactive-primary-pressed"] : theme.colors["interactive-primary-idle"];
    };

    return {
      backgroundColor: getKnobBackgroundColor(isPressed.value),
      transform: [{ translateX: thumbX.value }],
    };
  });

  const trackStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(sliderWidth.value, {
        duration: 100,
      }),
      marginTop: -2,
    };
  });

  const trackOverlayStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(thumbX.value + KNOB_WIDTH / 2, {
        duration: 5,
      }),
      marginTop: -2,
    };
  });

  const tooltipStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isPressed.value ? 1 : 0),
    };
  });

  return (
    <Box
      alignItems="flex-start"
      flexDirection="column"
      gap="1"
    >
      <Text
        variant="label-2-prominent-1"
        color="text-default-primary"
      >
        {title}
      </Text>
      <Box
        flexDirection="row"
        alignItems="center"
        gap="3"
      >
        <Text
          variant="label-2-default"
          color="text-default-tertiary"
        >
          {min}
          {unit}
        </Text>
        <Box
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            sliderWidth.value = width;
          }}
          flex={1}
        >
          <AnimatedBox
            backgroundColor="elevation-outline-1"
            borderRadius="xs"
            height={4}
            style={trackStyle}
          />
          <AnimatedBox
            backgroundColor="interactive-primary-idle"
            borderRadius="xs"
            height={4}
            style={trackOverlayStyle}
            position="absolute"
          />
          <GestureDetector gesture={gesture}>
            <Box position="relative">
              <AnimatedBox style={tooltipStyle}>
                <AnimatedBox
                  position="absolute"
                  bottom={KNOB_WIDTH}
                  paddingVertical="2"
                  width={KNOB_WIDTH + TOOLTIP_OFFSET * 2}
                  borderRadius="sm"
                  backgroundColor="interactive-secondary-idle"
                  left={thumbX.value - TOOLTIP_OFFSET}
                  alignItems="center"
                >
                  <Text
                    variant="body-4-prominent-1"
                    color="text-inverted-tertiary"
                  >
                    {`${selectedValue}${unit}`}
                  </Text>
                </AnimatedBox>
                <AnimatedBox
                  backgroundColor="interactive-secondary-idle"
                  height={13}
                  width={13}
                  position="absolute"
                  bottom={20}
                  left={thumbX.value + KNOB_WIDTH / 4}
                  style={{
                    transform: [{ rotate: "45deg" }],
                  }}
                />
              </AnimatedBox>
              <AnimatedBox
                position="absolute"
                height={KNOB_WIDTH}
                width={KNOB_WIDTH}
                borderRadius="full"
                backgroundColor="interactive-primary-on"
                style={[
                  {
                    marginTop: -14,
                  },
                  knobStyle,
                ]}
              />
            </Box>
          </GestureDetector>
        </Box>
        <Text
          variant="label-2-default"
          color="text-default-tertiary"
        >
          {max}
          {unit}
        </Text>
      </Box>
    </Box>
  );
};

export default Slider;
