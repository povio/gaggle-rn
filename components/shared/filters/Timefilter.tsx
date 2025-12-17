import { useState } from "react";

import Box from "@/components/Box";
import TimePicker from "@/components/input/TimePicker";
import { type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

export const TimeFilter = ({ filterId }: { filterId: SearchFilters }) => {
  const { setFilter, getSelectedFilters } = useFilterStore();
  const filterValue = getSelectedFilters(filterId);
  const [time, setTime] = useState<Date>((filterValue as Date) || new Date());

  const handleTimeChange = (newTime: Date | undefined) => {
    if (newTime) {
      setTime(newTime);
      setFilter(filterId, newTime);
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
      <TimePicker
        time={time}
        setTime={handleTimeChange}
        label=""
        showControls={false}
      />
    </Box>
  );
};
