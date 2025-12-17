import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import TextButton from "../buttons/TextButton";
import Text from "../text/Text";
import ListItem from "./ListItem";

export interface TimePickerProps {
  time: Date | undefined;
  setTime: (newTime: Date | undefined) => void;
  label: string;
  showControls?: boolean;
}

const TimePicker = ({ time, setTime, label, showControls = true }: TimePickerProps) => {
  const theme = useTheme<Theme>();
  const [hoursText, setHoursText] = useState(time ? String(time.getHours() % 12 || 12) : "12");
  const [minutesText, setMinutesText] = useState(time ? String(time.getMinutes()).padStart(2, "0") : "00");
  const [isPM, setIsPM] = useState(time ? time.getHours() >= 12 : false);

  const updateTime = (hoursStr: string, minutesStr: string, pm: boolean) => {
    const hours = parseInt(hoursStr) || 0;
    const minutes = parseInt(minutesStr) || 0;

    if (hours >= 1 && hours <= 12 && minutes >= 0 && minutes <= 59) {
      const date = new Date();
      const hour24 = pm ? (hours % 12) + 12 : hours % 12;
      date.setHours(hour24, minutes, 0, 0);
      setTime(date);
    }
  };

  const handleHoursChange = (value: string) => {
    // Allow empty or numeric input only
    if (value === "" || /^\d{0,2}$/.test(value)) {
      setHoursText(value);
      if (value !== "") {
        updateTime(value, minutesText, isPM);
      }
    }
  };

  const handleMinutesChange = (value: string) => {
    // Allow empty or numeric input only
    if (value === "" || /^\d{0,2}$/.test(value)) {
      setMinutesText(value);
      if (value !== "") {
        updateTime(hoursText, value, isPM);
      }
    }
  };

  const toggleAMPM = () => {
    const newPM = !isPM;
    setIsPM(newPM);
    updateTime(hoursText, minutesText, newPM);
  };

  const handleNowPress = () => {
    const now = new Date();
    setHoursText(String(now.getHours() % 12 || 12));
    setMinutesText(String(now.getMinutes()).padStart(2, "0"));
    setIsPM(now.getHours() >= 12);
    setTime(now);
  };

  const handleClearPress = () => {
    setTime(undefined);
  };

  return (
    <Box width={"100%"}>
      {label && (
        <Box
          pb="4"
          paddingHorizontal="2"
        >
          <Text
            variant="variant-1"
            color="text-default-primary"
          >
            {label}
          </Text>
        </Box>
      )}
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="2"
      >
        <TextInput
          value={hoursText}
          onChangeText={handleHoursChange}
          keyboardType="number-pad"
          maxLength={2}
          style={{
            fontSize: 48,
            fontFamily: theme.textVariants["variant-16"].fontFamily,
            color: theme.colors["button-text-color"],
            textAlign: "center",
            width: 100,
          }}
        />
        <Text
          variant="variant-16"
          color="button-text-color"
        >
          :
        </Text>
        <TextInput
          value={minutesText}
          onChangeText={handleMinutesChange}
          keyboardType="number-pad"
          maxLength={2}
          style={{
            fontSize: 48,
            fontFamily: theme.textVariants["variant-16"].fontFamily,
            color: theme.colors["button-text-color"],
            textAlign: "center",
            width: 100,
          }}
        />
        <TouchableOpacity onPress={toggleAMPM}>
          <Text
            variant="variant-5-prominent"
            color="button-text-color"
          >
            {isPM ? "PM" : "AM"}
          </Text>
        </TouchableOpacity>
      </Box>
      {showControls && (
        <ListItem
          label=""
          variant="action"
          mt="8"
          leftElement={
            <TextButton
              label="Now"
              variant="primary"
              onPress={handleNowPress}
            />
          }
          rightElement={
            <TextButton
              label="Clear"
              variant="secondary"
              onPress={handleClearPress}
            />
          }
        />
      )}
    </Box>
  );
};

export default TimePicker;
