import Box from "../Box";
import Drawer, { type DrawerProps } from "../modals/Drawer";
import { FilterModalContent } from "../modals/ModalContent";
import { FilterBuilder, type SearchFilters } from "./filters/list";

interface SearchFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCallback: () => void;
  filters: SearchFilters[];
}

export const SearchFilterDrawer = ({ isOpen, onClose, onCallback, filters }: SearchFilterDrawerProps) => {
  return (
    <Box alignItems="center">
      <Drawer
        visible={isOpen}
        onClose={onClose}
      >
        <FilterModalContent
          title="General Filter"
          filters={<FilterBuilder list={filters} />}
          primaryButtonText="SEARCH"
          onPrimaryButtonPress={onCallback}
        />
      </Drawer>
    </Box>
  );
};
