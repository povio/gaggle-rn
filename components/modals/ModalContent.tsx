import type React from "react";

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
      <Text variant="variant-10-prominent">{title}</Text>
      <Text variant="variant-7">{text}</Text>
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
      <Text variant="variant-10-prominent">{title}</Text>
      <Text variant="variant-7">{text}</Text>
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
        <Text variant="variant-10-prominent">{title}</Text>
        <Text variant="variant-7">{text}</Text>
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
            id="id"
          />
          <Text variant="variant-10-prominent">{checkboxLabel}</Text>
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
  icon,
  primaryButtonText,
  onPrimaryButtonPress,
}: {
  title: string;
  text: string;
  icon: React.ReactNode;
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
      <Box
        width={48}
        height={48}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"full"}
        alignSelf={"center"}
        marginBottom={"8"}
      >
        {icon}
      </Box>
      <Text
        variant="variant-6-prominent"
        textAlign="center"
      >
        {title}
      </Text>
      <Text textAlign="center">{text}</Text>
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

export const IconTextModalContent = ({
  title,
  text,
  icon,
  btnIcon,
  primaryButtonText,
  onPrimaryButtonPress,
}: {
  title: string;
  text?: string;
  btnIcon?: React.ReactNode;
  icon: React.ReactNode;
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
      <Box
        width={48}
        height={48}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"full"}
        backgroundColor="main-theme-active"
        alignSelf={"center"}
      >
        {icon}
      </Box>
      <Text
        variant="variant-11"
        textAlign="center"
      >
        {title}
      </Text>
      {text && (
        <Text
          variant="variant-5-prominent"
          textAlign="center"
        >
          {text}
        </Text>
      )}
      <Box alignItems="center">
        <Button
          variant="secondary"
          leftElement={btnIcon}
          textVariant="variant-2-prominent"
          label={primaryButtonText}
          onPress={onPrimaryButtonPress}
          width="l"
        />
      </Box>
    </Box>
  );
};
