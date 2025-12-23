import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/input/Input";
import { LoginNudgeModal } from "@/components/modals/LoginNudgeModal";
import Text from "@/components/text/Text";
import { useForm } from "@/hooks/useForm";
import { useUserStore } from "@/modules/user/userStore";
import { FeedbackModels } from "@/openapi/feedback/feedback.models";
import { FeedbackQueries } from "@/openapi/feedback/feedback.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

const RateUs = () => {
  const router = useRouter();
  const submitFeedbackMutation = FeedbackQueries.useSubmitApp();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { user } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FeedbackModels.SubmitAppFeedbackRequestDTO>({
    zodSchema: FeedbackModels.SubmitAppFeedbackRequestDTOSchema,
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const handleBack = () => {
    router.push("/profile-settings");
  };

  const onSubmit = (data: FeedbackModels.SubmitAppFeedbackRequestDTO) => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }

    submitFeedbackMutation.mutate(
      { data },
      {
        onSuccess: () => {
          showToast({
            variant: "success",
            message: "Thank you for your feedback!",
          });
          router.push("/rate-us-finish");
        },
        onError: (error) => {
          const errorMessage = RestUtils.extractServerErrorMessage(error);
          showToast({
            variant: "error",
            message: errorMessage || "Failed to submit feedback",
          });
        },
      },
    );
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
            Rate Us
          </Text>
        </Box>
      </Box>
      <Box
        flexDirection={"column"}
        gap="10"
        justifyContent={"flex-start"}
        alignItems={"center"}
        paddingTop={"6"}
      >
        <Box width={200}>
          <Text
            variant="variant-8"
            textAlign="center"
            color={"text-disabled"}
          >
            We really appreciate your feedback!
          </Text>
        </Box>

        <Box
          flexDirection={"column"}
          gap="4"
          alignItems={"center"}
          width={"100%"}
        >
          <Controller
            control={control}
            name="content"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                type="textArea"
                placeholder="Leave your feedback"
                label=""
                value={value}
                onChangeText={onChange}
                padding={"2"}
                borderRadius={"2xl"}
                backgroundColor={"elevation-background"}
                error={error?.message}
              />
            )}
          />
          <Button
            label="SUBMIT"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            style={styles.button}
            textVariant="variant-2-prominent"
            disabled={!isValid || submitFeedbackMutation.isPending}
          />
        </Box>
        <Button
          label="Rate us on the Apple App Store"
          onPress={() => {}}
          variant="text"
          textVariant="variant-11"
        />
      </Box>

      <LoginNudgeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    padding: 0,
    alignSelf: "center",
  },
  button: {
    maxWidth: 210,
  },
  topCircle: {
    position: "absolute",
    top: -150,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#F5C344",
    zIndex: -1,
  },
});

export default RateUs;
