import React from "react";

import Box from "../Box";
import Button from "../buttons/Button";
import Checkbox from "../buttons/Checkbox";
import Image from "../Image";
import Input from "../input/Input";
import Text from "../text/Text";

export const TextOnlyModalContent = ({
  title,
  text,
  primaryButtonText,
  onPrimaryButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
}: {
  title: string;
  text: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonText: string;
  onSecondaryButtonPress: () => void;
}) => {
  return (
    <Box
      gap="4"
      paddingLeft="8"
      paddingBottom="8"
      paddingRight="8"
    >
      <Text variant="title-4-prominent-1">{title}</Text>
      <Text variant="body-3-default">{text}</Text>
      <Box gap="4">
        <Button
          variant="secondary"
          label={primaryButtonText}
          onPress={onPrimaryButtonPress}
          width="fit"
        />
        <Button
          variant="outlined"
          label={secondaryButtonText}
          onPress={onSecondaryButtonPress}
          width="fit"
        />
      </Box>
    </Box>
  );
};

export const TextImageModalContent = ({
  title,
  text,
  imageUrl,
  primaryButtonText,
  onPrimaryButtonPress,
  secondaryButtonText,
  onSecondaryButtonPress,
}: {
  title: string;
  text: string;
  imageUrl: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  secondaryButtonText: string;
  onSecondaryButtonPress: () => void;
}) => {
  return (
    <Box
      gap="4"
      paddingLeft="8"
      paddingBottom="8"
      paddingRight="8"
    >
      <Box maxHeight={240}>
        <Image
          borderRadius="sm"
          width="100%"
          height="100%"
          source={imageUrl}
          contentFit="fill"
        />
      </Box>
      <Text variant="title-4-prominent-1">{title}</Text>
      <Text variant="body-3-default">{text}</Text>
      <Box gap="4">
        <Button
          variant="secondary"
          label={primaryButtonText}
          onPress={onPrimaryButtonPress}
          width="fit"
        />
        <Button
          variant="outlined"
          label={secondaryButtonText}
          onPress={onSecondaryButtonPress}
          width="fit"
        />
      </Box>
    </Box>
  );
};

export const InputModalContent = ({
  title,
  text,
  primaryButtonText,
  onPrimaryButtonPress,
  checkboxLabel,
  onCheckboxChange,
  checkboxValue,
}: {
  title: string;
  text: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
  checkboxLabel: string;
  onCheckboxChange: () => void;
  checkboxValue: boolean;
}) => {
  return (
    <Box
      paddingLeft="8"
      paddingBottom="8"
      paddingRight="8"
    >
      <Box gap="4">
        <Text variant="title-4-prominent-1">{title}</Text>
        <Text variant="body-3-default">{text}</Text>
      </Box>
      <Box
        gap="8"
        mt="4"
      >
        <Input
          variant="filled"
          label="Email"
          onChangeText={() => null}
          value="john.doe@email.com"
          placeholder=""
        />
        <Box
          flexDirection="row"
          alignItems="center"
          gap="2"
        >
          <Checkbox
            checked={checkboxValue}
            onChange={onCheckboxChange}
          />
          <Text variant="label-1-default">{checkboxLabel}</Text>
        </Box>
        <Box gap="4">
          <Button
            variant="secondary"
            label={primaryButtonText}
            onPress={onPrimaryButtonPress}
            width="fit"
          />
        </Box>
      </Box>
    </Box>
  );
};

export const ImageOkayModalContent = ({
  title,
  text,
  imageUrl,
  primaryButtonText,
  onPrimaryButtonPress,
}: {
  title: string;
  text: string;
  imageUrl: string;
  primaryButtonText: string;
  onPrimaryButtonPress: () => void;
}) => {
  return (
    <Box
      paddingLeft="8"
      paddingBottom="8"
      paddingRight="8"
      gap="4"
    >
      <Text
        variant="display-3-default"
        textAlign="center"
      >
        {title}
      </Text>
      <Box maxHeight={240}>
        <Image
          borderRadius="sm"
          width="100%"
          height="100%"
          source={imageUrl}
          contentFit="fill"
        />
      </Box>
      <Text
        variant="body-3-default"
        textAlign="center"
      >
        {text}
      </Text>
      <Box alignItems="center">
        <Button
          variant="secondary"
          label={primaryButtonText}
          onPress={onPrimaryButtonPress}
          width="l"
        />
      </Box>
    </Box>
  );
};
