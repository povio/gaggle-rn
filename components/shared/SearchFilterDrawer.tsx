import { useState } from "react";

import { FilterList, type SearchFilters } from "@/modules/search/stores/filterStore";

import Box from "../Box";
import Drawer, { type DrawerProps } from "../modals/Drawer";
import { FilterModalContent } from "../modals/ModalContent";
import { FilterBuilder } from "./filters/FilterBuilder";

interface SearchFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
  filters: SearchFilters[];
}

export const SearchFilterDrawer = ({ isOpen, onClose, onCallback, filters }: SearchFilterDrawerProps) => {
  const [selectedFilter, setSelectedFilter] = useState<SearchFilters | null>(null);

  const handleFilterSelect = (filterId: SearchFilters) => {
    setSelectedFilter(filterId);
  };

  const handleBackToList = () => {
    setSelectedFilter(null);
  };

  const handleClose = () => {
    setSelectedFilter(null);
    onClose();
  };

  const selectedFilterData = selectedFilter ? FilterList.find((f) => f.id === selectedFilter) : null;
  const IconComponent = selectedFilterData?.iconComponent;

  return (
    <Box alignItems="center">
      <Drawer
        visible={isOpen}
        onClose={handleClose}
      >
        <FilterModalContent
          title="General Filter"
          filters={
            <FilterBuilder
              list={filters}
              onFilterSelect={handleFilterSelect}
              selectedFilter={selectedFilter}
              onBackToList={handleBackToList}
            />
          }
          primaryButtonText="SEARCH"
          onPrimaryButtonPress={onCallback}
          selectedFilter={selectedFilterData?.label || null}
          selectedFilterIcon={IconComponent ? <IconComponent /> : null}
          onBackToList={handleBackToList}
        />
      </Drawer>
    </Box>
  );
};
