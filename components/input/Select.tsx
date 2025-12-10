import { useTheme } from "@shopify/restyle";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import ArrowDropDownIcon from "@/assets/icons/ArrowDownIcon";
import CloseIcon from "@/assets/icons/CloseIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import type { InputVariant, SelectType } from "@/types";
import { getInputInputColor } from "@/utils/inputs";
import type { Theme, ThemeColor } from "@/utils/theme/restyleTheme";

import Box from "../Box";
import Drawer from "../modals/Drawer";
import Pressable from "../Pressable";
import Text from "../text/Text";
import Input from "./Input";
import ListItem from "./ListItem";

export interface SelectProps {
  variant?: InputVariant;
  type?: SelectType;
  label: string;
  onSelect: (value: string | string[]) => void;
  selectedValue: string;
  items: {
    label: string;
    sublabel?: string;
    value: string;
  }[];
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryActionPress?: () => void;
  onSecondaryActionPress?: () => void;
  filterable?: boolean;
}

const Select = ({
  variant = "outlined",
  type = "single",
  label,
  disabled,
  error,
  selectedValue,
  items,
  onSelect,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryActionPress,
  onSecondaryActionPress,
  filterable,
}: SelectProps) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const theme = useTheme<Theme>();
  const pressed = false;
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (!drawerVisible) {
      setFilterValue("");
    }
  }, [drawerVisible]);

  const getInputColor = useCallback(
    (active: boolean): ThemeColor => getInputInputColor(theme, variant, disabled, active, error),
    [theme, variant, disabled, error],
  );

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleSingleSelect = (value: string) => {
    onSelect(value);
    setTimeout(() => {
      handleCloseDrawer();
    }, 200);
  };

  const handleMultipleSelect = (value: string) => {
    if (!Array.isArray(selectedValue)) {
      return;
    }
    const exists = selectedValue.includes(value);
    if (exists) {
      onSelect(selectedValue.filter((item) => item !== value));
    } else {
      // oxlint-disable-next-line no-misused-spread
      onSelect([...selectedValue, value]);
    }
  };

  const inputColor = getInputColor(pressed);
  const parsedInputColor = theme.colors[inputColor];

  const SelectSingleItem = ({ item }: { item: { label: string; value: string; sublabel?: string } }) => {
    const isSelected = selectedValue === item.value;
    return (
      <ListItem
        variant="single"
        selected={isSelected}
        label={item.label}
        sublabel={item.sublabel}
        onPress={() => handleSingleSelect(item.value)}
      />
    );
  };

  const SelectMultipleItem = ({ item }: { item: { label: string; value: string; sublabel?: string } }) => {
    const singleIsSelected = selectedValue.includes(item.value);
    return (
      <ListItem
        variant="multiple"
        selected={singleIsSelected}
        label={item.label}
        sublabel={item.sublabel}
        onPress={() => {
          handleMultipleSelect(item.value);
        }}
      />
    );
  };

  const parsedSelectedValue =
    type === "multiple" && Array.isArray(selectedValue) ? selectedValue.join(", ") : selectedValue;

  const handleRenderItem = ({
    item,
  }: {
    item: {
      type: "normal" | "search";
      label: string;
      sublabel?: string;
      value: string;
    };
  }) => {
    if (item.type === "search") {
      return (
        <Box
          backgroundColor="elevation-surface-1"
          px="4"
        >
          <Input
            label=""
            onChangeText={(text) => setFilterValue(text)}
            value={filterValue}
            placeholder="Search"
            mb="0"
            leftElement={<SearchIcon color={theme.colors["interactive-icon-idle"]} />}
          />
        </Box>
      );
    }
    return type === "single" ? <SelectSingleItem item={item} /> : <SelectMultipleItem item={item} />;
  };

  // oxlint-disable-next-line no-unsafe-type-assertion
  const parsedItems = [
    ...(filterable
      ? [
          {
            type: "search",
            label: "",
            value: "",
          },
        ]
      : []),
    ...items.filter((item) => item.label.toLowerCase().includes(filterValue.toLowerCase())),
  ] as {
    type: "normal" | "search";
    label: string;
    sublabel?: string | undefined;
    value: string;
  }[];

  return (
    <>
      <Pressable
        onPress={handleOpenDrawer}
        pointerEvents="box-only"
      >
        <Input
          label={label}
          placeholder="Select an option"
          value={parsedSelectedValue}
          onChangeText={() => null}
          rightElement={<ArrowDropDownIcon color={parsedInputColor} />}
        />
      </Pressable>
      <Drawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        primaryActionLabel={primaryActionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onPrimaryActionPress={onPrimaryActionPress}
        onSecondaryActionPress={onSecondaryActionPress}
      >
        <FlatList
          data={parsedItems}
          renderItem={handleRenderItem}
          ListHeaderComponent={
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              paddingHorizontal="4"
              paddingVertical={filterable ? "0" : "2"}
            >
              <Text variant="label-2-prominent-1">{label}</Text>
              <Pressable
                onPress={handleCloseDrawer}
                p="1"
              >
                <Box
                  alignItems="center"
                  justifyContent="center"
                >
                  <CloseIcon color={theme.colors["interactive-icon-idle"]} />
                </Box>
              </Pressable>
            </Box>
          }
          stickyHeaderIndices={filterable ? [1] : []}
          keyExtractor={(item) => item.value}
          contentContainerStyle={{
            paddingBottom: theme.spacing["list-bottom"],
          }}
        />
      </Drawer>
    </>
  );
};

export default Select;
