import { useState } from "react";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { FilterList, type SearchFilters, useFilterStore } from "@/modules/search/stores/filterStore";

import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Drawer from "../modals/Drawer";
import Text from "../text/Text";
import { FilterBuilder } from "./filters/FilterBuilder";

interface SearchFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
  filters: SearchFilters[];
}

export const SearchFilterDrawer = ({ isOpen, onClose, onCallback, filters }: SearchFilterDrawerProps) => {
  const { clearAllFilters, clearFilter } = useFilterStore();
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

  const handleClearAllFilters = () => {
    clearAllFilters();
    onCallback();
  };

  const selectedFilterData = selectedFilter ? FilterList.find((f) => f.id === selectedFilter) : null;
  const IconComponent = selectedFilterData?.iconComponent;

  return (
    <Box alignItems="center">
      <Drawer
        visible={isOpen}
        onClose={handleClose}
      >
        <Box
          gap="4"
          paddingLeft="8"
          paddingBottom="8"
          paddingRight="8"
        >
          {selectedFilter && handleBackToList ? (
            <Box
              flexDirection="row"
              alignItems="center"
              gap="2"
            >
              <IconButton
                icon={
                  <ArrowLeftIcon
                    width={20}
                    height={20}
                  />
                }
                onPress={handleBackToList}
                size="xs"
                variant="transparent"
                iconColor="text-primary"
              />
              {IconComponent && (
                <Box
                  width={20}
                  height={20}
                >
                  <IconComponent />
                </Box>
              )}
              <Box
                gap={"8"}
                flexDirection={"row"}
              >
                <Text variant="variant-13-prominent">{selectedFilterData?.label || null}</Text>
                <Button
                  variant="text"
                  textVariant="variant-8"
                  label="Clear"
                  onPress={() => clearFilter(selectedFilter)}
                  width="fit"
                />
              </Box>
            </Box>
          ) : (
            <Box
              flexDirection={"row"}
              gap={"8"}
            >
              <Text variant="variant-13-prominent">General Filter</Text>
              <Button
                variant="text"
                textVariant="variant-8"
                label="Clear All"
                onPress={handleClearAllFilters}
                width="fit"
              />
            </Box>
          )}
          <FilterBuilder
            list={filters}
            onFilterSelect={handleFilterSelect}
            selectedFilter={selectedFilter}
            onBackToList={handleBackToList}
          />
          <Box
            gap="2"
            marginTop={"4"}
          >
            <Button
              variant="secondary"
              textVariant="variant-2-prominent"
              label="SEARCH"
              onPress={onCallback}
              width="fit"
            />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
