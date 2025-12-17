import { useState } from "react";

import Box from "@/components/Box";
import Calendar from "@/components/input/Calendar";
import { type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

export const DateFilter = ({ filterId }: { filterId: SearchFilters }) => {
  const { setFilter, getSelectedFilters } = useFilterStore();
  const filterValue = getSelectedFilters(filterId);
  const [date, setDate] = useState<Date>((filterValue as Date) || new Date());

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setFilter(filterId, newDate);
    }
  };

  return (
    <Box
      flexDirection={"row"}
      justifyContent={"center"}
      width={"100%"}
      alignItems={"center"}
      gap="2"
    >
      <Calendar
        date={date}
        setDate={handleDateChange}
        label=""
        showControls={false}
      />
    </Box>
  );
};
