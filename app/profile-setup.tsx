import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

import CloseIcon from "@/assets/icons/CloseIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import PillButton from "@/components/buttons/PillButton";
import TextButton from "@/components/buttons/TextButton";
import Image from "@/components/Image";
import Input from "@/components/input/Input";
import Select from "@/components/input/Select";
import Text from "@/components/text/Text";
import { useForm } from "@/hooks/useForm";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useUserStore } from "@/modules/user/userStore";
import { UserApi } from "@/openapi/user/user.api";
import { UserModels } from "@/openapi/user/user.models";
import { UserQueries } from "@/openapi/user/user.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

const ProfileSetup = () => {
  const router = useRouter();
  const updateSettingsMutation = UserQueries.useUpdateMySettings();
  const { setProfileSetup } = useOnboarding();
  const { setSettings } = useUserStore();
  const [stateValue, setStateValue] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isValid, errors },
  } = useForm<UserModels.UpdateUserSettingsRequestDTO>({
    zodSchema: UserModels.UpdateUserSettingsRequestDTOSchema,
    mode: "all",
    defaultValues: {
      nickname: "",
      address1: undefined,
      address2: undefined,
      city: undefined,
      state: UserModels.StateEnum.AK,
      zip: undefined,
      notificationEnabled: true,
      children: null,
      // children: [
      //   {
      //     nickname: "",
      //     birthdate: "",
      //     gender: null,
      //     grade: null,
      //     schoolName: "",
      //   },
      // ],
    },
  });

  const children = watch("children") || [];

  const handleAddChild = () => {
    setValue("children", [
      ...children,
      {
        nickname: "",
        birthdate: "",
        gender: null,
        grade: null,
        schoolName: "",
      },
    ]);
  };

  const handleSelectState = (value: string) => {
    setStateValue(value);
  };

  const updateChild = (index: number, field: keyof UserModels.ChildDTO, value: string) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setValue("children", updatedChildren);
  };

  const handleRemoveChild = (index: number) => {
    setValue(
      "children",
      children.filter((_, i) => i !== index),
    );
  };

  const onSubmit = (data: UserModels.UpdateUserSettingsRequestDTO) => {
    updateSettingsMutation.mutate(
      { data },
      {
        onSuccess: async () => {
          await setProfileSetup("completed");

          try {
            const settingsData = await UserApi.getMySettings();
            setSettings(settingsData);
          } catch (error) {
            console.error("Failed to fetch settings after update:", error);
          }

          showToast({
            variant: "success",
            message: "Profile setup completed!",
          });
          router.replace("/(app)/(tabs)");
        },
        onError: (error) => {
          const errorMessage = RestUtils.extractServerErrorMessage(error);
          showToast({
            variant: "error",
            message: errorMessage || "Failed to create profile",
          });
        },
      },
    );
  };

  const genderOptions = Object.values(UserModels.GenderEnum).map((value) => ({
    id: value,
    label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  const ageOptions = Object.values(UserModels.GradeEnum).map((value) => ({
    id: value,
    label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  const stateOptions = Object.values(UserModels.StateEnum).map((value) => ({
    value: value,
    label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  }));

  return (
    <ScrollView style={styles.scrollView}>
      <Box
        flex={1}
        backgroundColor="elevation-background"
        paddingHorizontal="6"
        paddingBottom="8"
      >
        <View style={styles.topCircle} />
        <Box
          alignItems="center"
          marginTop="12"
          marginBottom="8"
          gap="4"
        >
          <Image
            source={require("@/assets/illustrations/capa_2.svg")}
            style={styles.illustration}
            contentFit="contain"
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Let's set up your profile
          </Text>
        </Box>

        <Box marginBottom="6">
          <Text
            variant="variant-13-prominent"
            marginBottom="4"
          >
            You and your family <Text style={styles.required}>*</Text>
          </Text>
          <Box gap="2">
            <Controller
              control={control}
              name="nickname"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  label=""
                  placeholder="Nick Name"
                  value={value || ""}
                  variant="default"
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
          </Box>
        </Box>

        <Box marginBottom="6">
          <Text
            variant="variant-13-prominent"
            marginBottom="2"
          >
            Your address
          </Text>
          <Text
            color="text-disabled"
            marginBottom="4"
          >
            We use your address to search for activities that are conveniently located to your home
          </Text>
          <Box gap="2">
            <Controller
              control={control}
              name="address1"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="Street Address"
                  value={value || ""}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="address2"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="Apartment, suite, etc. (optional)"
                  value={value || ""}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="City"
                  value={value || ""}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
            <Select
              variant={"outlined"}
              type={"single"}
              label=""
              placeholder={"State"}
              selectedValue={stateValue}
              items={stateOptions}
              onSelect={handleSelectState}
              style={styles.select}
            />
            <Controller
              control={control}
              name="zip"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="Zip Code"
                  value={value || ""}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
          </Box>
        </Box>

        <Box marginBottom="6">
          <Text
            variant="variant-13-prominent"
            marginBottom="4"
          >
            Your children
          </Text>

          {children.map((child, index) => (
            <Box
              key={index}
              marginBottom="6"
            >
              <Box
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center"
                marginBottom="2"
              >
                <Text variant="variant-11">Child {index + 1}</Text>

                {index < 100 && (
                  <IconButton
                    size="m"
                    icon={<CloseIcon />}
                    onPress={() => handleRemoveChild(index)}
                    variant="transparent"
                  />
                )}
              </Box>
              <Text
                color="text-disabled"
                marginBottom="4"
              >
                We use this information to help you search for age-appropriate activities
              </Text>
              <Box gap="2">
                <Input
                  label=""
                  placeholder="Nickname"
                  value={child.nickname || ""}
                  variant="default"
                  onChangeText={(value) => updateChild(index, "nickname", value)}
                />
                <Input
                  label=""
                  placeholder="Birthdate"
                  value={child.birthdate || ""}
                  variant="default"
                  onChangeText={(value) => updateChild(index, "birthdate", value)}
                />

                <Box marginTop="2">
                  <Text
                    variant="variant-11"
                    marginBottom="3"
                  >
                    Gender
                  </Text>
                  <Box
                    flexDirection="row"
                    gap="2"
                    flexWrap="wrap"
                  >
                    {genderOptions.map((gender) => (
                      <PillButton
                        key={gender.id}
                        label={gender.label}
                        variant="filled"
                        onPress={() => updateChild(index, "gender", gender.id)}
                        checked={child.gender === gender.id}
                      />
                    ))}
                  </Box>
                </Box>

                <Box marginTop="2">
                  <Text
                    variant="variant-11"
                    marginBottom="3"
                  >
                    Select Grade
                  </Text>
                  <Box
                    flexDirection="row"
                    gap="2"
                    flexWrap="wrap"
                  >
                    {ageOptions.map((grade) => (
                      <PillButton
                        key={grade.id}
                        label={grade.label}
                        variant="outlined"
                        onPress={() => updateChild(index, "grade", grade.id)}
                        checked={child.grade === grade.id}
                      />
                    ))}
                  </Box>
                </Box>

                <Box marginTop="2">
                  <Text
                    variant="variant-11"
                    marginBottom="3"
                  >
                    School name
                  </Text>
                  <Input
                    label=""
                    placeholder="Add a school name"
                    value={child.schoolName || ""}
                    variant="default"
                    onChangeText={(value) => updateChild(index, "schoolName", value)}
                  />
                </Box>
              </Box>
            </Box>
          ))}

          <TextButton
            label={`Add Child ${children.length + 1}`}
            onPress={handleAddChild}
            variant="secondary"
            textVariant="variant-11"
          />
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          marginBottom="6"
        >
          <Button
            label="DONE"
            onPress={handleSubmit(onSubmit)}
            width="m"
            textVariant="variant-2-prominent"
            variant="secondary"
            disabled={updateSettingsMutation.isPending}
          />
        </Box>
      </Box>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f9fafbff",
  },
  select: {
    marginBottom: 8,
  },
  illustration: {
    width: 50,
    height: 50,
  },
  textBtn: {
    textDecorationLine: "underline",
  },
  required: {
    color: "#d43f2bff",
    fontSize: 18,
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

export default ProfileSetup;
