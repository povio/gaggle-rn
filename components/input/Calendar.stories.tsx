import { useTheme } from "@shopify/restyle";
import React, { useState } from "react";

import CalendarIcon from "@/assets/icons/CalendarIcon";
import type { Theme } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import DrawerComponent from "../modals/Drawer";
import CalendarComponent from "./Calendar";
import Input from "./Input";

const meta = {
  title: "Input Fields/Calendar",
  component: Box,
  decorators: [],
};

export default meta;

const getDateFormat = (date: Date | undefined) => {
  if (!date) {
    return "";
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const WrappedCalendar = () => {
  const theme = useTheme<Theme>();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date("2021-01-01"));

  const handleSetDate = (newDate: Date | undefined) => {
    setCalendarDate(newDate);
    setCalendarVisible(false);
  };

  const formattedDate = getDateFormat(calendarDate);

  return (
    <Box p="4">
      <Input
        placeholder="dd/mm/yyyy"
        label="When is your event?"
        rightElement={<CalendarIcon color={theme.colors["text-default-secondary"]} />}
        value={formattedDate}
        onChangeText={() => null}
        onPress={() => setCalendarVisible(true)}
      />
      <DrawerComponent
        visible={calendarVisible}
        onClose={() => setCalendarVisible(false)}
      >
        <CalendarComponent
          label="When is your event?"
          date={calendarDate}
          setDate={handleSetDate}
        />
      </DrawerComponent>
    </Box>
  );
};

export const Calendar = {
  render: () => {
    return <WrappedCalendar />;
  },
};
