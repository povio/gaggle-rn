import { useTheme } from "@shopify/restyle";
import React from "react";
import type { TextStyle } from "react-native";
import DateTimePicker, { type DateType, useDefaultStyles } from "react-native-ui-datepicker";

import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import TextButton from "../buttons/TextButton";
import Text from "../text/Text";
import ListItem from "./ListItem";

export interface CalendarProps {
  date: Date | undefined;
  setDate: (newDate: Date | undefined) => void;
  label: string;
}

const Calendar = ({ date, setDate, label, ...rest }: CalendarProps & Partial<typeof DateTimePicker>) => {
  const theme = useTheme<Theme>();
  const defaultStyles = useDefaultStyles();

  const handleChange = (change: { date: DateType }) => {
    if (change?.date) {
      // oxlint-disable-next-line no-unsafe-type-assertion
      setDate(new Date(change.date as string));
    }
  };

  const handleTodayPress = () => {
    setDate(new Date());
  };

  const handleClearPress = () => {
    setDate(undefined);
  };

  return (
    <Box p="4">
      <Box
        pb="4"
        paddingHorizontal="2"
      >
        <Text
          variant="label-2-prominent-1"
          color="text-default-primary"
        >
          {label}
        </Text>
      </Box>
      <DateTimePicker
        mode="single"
        date={date}
        onChange={handleChange}
        showOutsideDays
        styles={{
          ...defaultStyles,
          selected: {
            ...defaultStyles.selected,
            backgroundColor: theme.colors["interactive-primary-idle"],
          },
          day: {
            ...defaultStyles.day,
            borderRadius: theme.borderRadii["rounding-button-rounding"],
          },
          day_cell: {
            ...defaultStyles.day_cell,
            padding: theme.spacing["2"],
          },
          day_label: {
            ...defaultStyles.day_label,
            fontSize: theme.textVariants["label-2-default"].fontSize,
            fontFamily: theme.textVariants["label-2-default"].fontFamily,
            color: theme.colors["interactive-text-on-bg"],
          } as TextStyle,
          weekday_label: {
            ...defaultStyles.weekday_label,
            fontSize: theme.textVariants["label-2-default"].fontSize,
            fontFamily: theme.textVariants["label-2-default"].fontFamily,
            color: theme.colors["interactive-primary-idle"],
          } as TextStyle,
          weekdays: {
            ...defaultStyles.weekdays,
            borderBottomWidth: 0,
            borderTopWidth: 1,
          },
          month: {
            ...defaultStyles.month,
            backgroundColor: theme.colors["transparent"],
            borderWidth: 1,
            borderColor: theme.colors["elevation-outline-1"],
            margin: theme.spacing["2"],
          },
          header: {
            marginRight: theme.spacing["2"],
            backgroundColor: theme.colors["interactive-tertiary-idle"],
          },
        }}
        {...rest}
      />
      <ListItem
        label=""
        variant="action"
        mt="8"
        leftElement={
          <TextButton
            label="Today"
            variant="primary"
            onPress={handleTodayPress}
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
    </Box>
  );
};

export default Calendar;
