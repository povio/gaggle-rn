import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import z from "zod";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import { useForm } from "@/hooks/useForm";

export const MockTempSchema = z.object({
  subject: z.string(),
  text: z.string(),
});

export type MockTemp = z.infer<typeof MockTempSchema>;

const TechnicalSupport = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MockTemp>({
    zodSchema: MockTempSchema,
    mode: "onChange",
  });

  const handleBack = () => {
    router.push("/profile-settings");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      paddingHorizontal="6"
    >
      <Box
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom="6"
        marginTop={"10"}
        position={"relative"}
      >
        <Box
          justifyContent="center"
          alignContent="center"
          backgroundColor="elevation-background"
          width={38}
          height={38}
          borderRadius="full"
          position={"absolute"}
          left={-5}
          zIndex={10}
        >
          <IconButton
            icon={<ArrowLeftIcon />}
            onPress={handleBack}
            variant="transparent"
            style={styles.headerIcon}
          />
        </Box>
        <Box
          alignItems="center"
          flexGrow={1}
          gap="4"
        >
          <Text
            variant="variant-6-prominent"
            textAlign="center"
          >
            Technical Support
          </Text>
        </Box>
      </Box>
      <Box
        flexDirection={"column"}
        gap="2"
        justifyContent={"center"}
        alignItems={"center"}
        paddingTop={"6"}
      >
        <Box
          flexDirection="row"
          width="100%"
        >
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <Input
                label=""
                placeholder={"Subject"}
                value={value}
                variant="default"
                onChangeText={onChange}
                error={errors.subject?.message}
                alignSelf="stretch"
              />
            )}
          />
        </Box>
        <Box
          flexDirection="row"
          width="100%"
          marginBottom={"2"}
        >
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <Input
                label=""
                placeholder={"Wtrite your message"}
                value={value}
                variant="default"
                type="textArea"
                onChangeText={onChange}
                error={errors.subject?.message}
                alignSelf="stretch"
                borderRadius="l"
              />
            )}
          />
        </Box>
        <Button
          label="SEND A MESSAGE"
          onPress={() => router.push("/technical-support-finish")}
          variant="secondary"
          textVariant="variant-2-prominent"
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    padding: 0,
    alignSelf: "center",
  },
});

export default TechnicalSupport;
