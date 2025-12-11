import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Controller } from "react-hook-form";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import Input from "@/components/input/Input";
import Text from "@/components/text/Text";
import PillButton from "@/components/buttons/PillButton";
import TextButton from "@/components/buttons/TextButton";
import Image from "@/components/Image";
import IconButton from "@/components/buttons/IconButton";
import CloseIcon from "@/assets/icons/CloseIcon";
import { useForm } from "@/hooks/useForm";
import { UsersModels } from "@/data/users/users.models";
import { UsersQueries } from "@/data/users/users.queries";
import { useOnboarding } from "@/hooks/useOnboarding";
import { showToast } from "@/utils/toast";

const ProfileSetup = () => {
  const router = useRouter();
  const updateProfile = UsersQueries.useUpdateProfile();
  const { setProfileSetup } = useOnboarding();

  const { control, handleSubmit, setValue, watch } = useForm<UsersModels.ProfileSetupInput>({
    zodSchema: UsersModels.profileSetupSchema,
    defaultValues: {
      userName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      children: [
        {
          firstName: "",
          lastName: "",
          birthdate: "",
          gender: "",
          age: "",
          schoolName: "",
        },
      ],
    },
  });

  const children = watch("children") || [];

  const handleAddChild = () => {
    setValue("children", [
      ...children,
      {
        firstName: "",
        lastName: "",
        birthdate: "",
        gender: "",
        age: "",
        schoolName: "",
      },
    ]);
  };

  const updateChild = (index: number, field: keyof UsersModels.Child, value: string) => {
    const updatedChildren = [...children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setValue("children", updatedChildren);
  };

  const handleRemoveChild = (index: number) => {
    setValue("children", children.filter((_, i) => i !== index));
  };

  const onSubmit = (data: UsersModels.ProfileSetupInput) => {
    console.log("data", data);
    updateProfile.mutate(data, {
      onSuccess: async (response) => {
        await setProfileSetup(response.userId);
        showToast({
          variant: "success",
          message: "Profile setup completed!",
        });
        router.replace("/sign-in");
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
        showToast({
          variant: "error",
          message: errorMessage,
        });
      },
    });
  };

  const genderOptions = ["Male", "Female", "Other"];
  const ageOptions = [
    "Age 2",
    "Age 3",
    "Pre-K",
    "Kindergarten",
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "Other",
  ];

  return (
    <ScrollView style={styles.scrollView}>     
      <Box
        flex={1}
        backgroundColor="elevation-background"
        paddingHorizontal="6"
        paddingBottom="8"
      >
         <View style={styles.topCircle} />
        <Box alignItems="center" marginTop="12" marginBottom="8" gap="4">
          <Image
            source={require("@/assets/illustrations/capa_2.svg")}
            style={styles.illustration}
            contentFit="contain"
          />
          <Text variant="title-2-prominent-1" textAlign="center">
            Let's set up your profile
          </Text>
        </Box>

        <Box marginBottom="6">
          <Text variant="title-3-prominent-1" marginBottom="4">
            You and your family
          </Text>
          <Box gap="2">
            <Controller
              control={control}
              name="userName"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  label=""
                  placeholder="Nick Name"
                  value={value}
                  variant="default"
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
          </Box>
        </Box>

        <Box marginBottom="6">
          <Text variant="title-3-prominent-1" marginBottom="2">
            Your address
          </Text>
          <Text
            variant="body-4-default"
            color="text-default-secondary"
            marginBottom="4"
          >
            We use your address to search for activities that are conveniently
            located to your home
          </Text>
          <Box gap="2">
            <Controller
              control={control}
              name="streetAddress"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="Street Address"
                  value={value}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="apartment"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="Apartment, suite, etc. (optional)"
                  value={value}
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
                  value={value}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="state"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="State"
                  value={value}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange, value } }) => (
                <Input
                  label=""
                  placeholder="Zip Code"
                  value={value}
                  variant="default"
                  onChangeText={onChange}
                />
              )}
            />
          </Box>
        </Box>

        <Box marginBottom="6">
          <Text variant="title-3-prominent-1" marginBottom="4">
            Your children
          </Text>

          {children.map((child, index) => (
            <Box key={index} marginBottom="6">
              <Box justifyContent="space-between"
                flexDirection="row"
        alignItems="center" marginBottom="2">
              <Text variant="title-4-prominent-1">
                Child {index + 1}
                </Text>

                {index > 0 &&
                <IconButton size="m" icon={<CloseIcon />} onPress={() => handleRemoveChild(index)} variant="transparent"/>
                }

              </Box>
              <Text
                variant="body-4-default"
                color="text-default-secondary"
                marginBottom="4"
              >
                We use this information to help you search for age-appropriate
                activities
              </Text>
              <Box gap="2">
                <Input
                  label=""
                  placeholder="First Name"
                  value={child.firstName || ""}
                  variant="default"
                  onChangeText={(value) =>
                    updateChild(index, "firstName", value)
                  }
                />
                <Input
                  label=""
                  placeholder="Last Name"
                  value={child.lastName || ""}
                  variant="default"
                  onChangeText={(value) =>
                    updateChild(index, "lastName", value)
                  }
                />
                <Input
                  label=""
                  placeholder="Birthdate"
                  value={child.birthdate || ""}
                  variant="default"
                  onChangeText={(value) =>
                    updateChild(index, "birthdate", value)
                  }
                />

                <Box marginTop="2">
                  <Text variant="title-4-prominent-1" marginBottom="3">
                    Gender
                  </Text>
                  <Box flexDirection="row" gap="2" flexWrap="wrap">
                    {genderOptions.map((gender) => (
                      <PillButton
                        key={gender}
                        label={gender}
                        variant="filled"
                        onPress={() => updateChild(index, "gender", gender)}
                        checked={child.gender === gender}
                      />
                    ))}
                  </Box>
                </Box>

                <Box marginTop="2">
                  <Text variant="title-4-prominent-1" marginBottom="3">
                    Select Age
                  </Text>
                  <Box flexDirection="row" gap="2" flexWrap="wrap">
                    {ageOptions.map((age) => (
                      <PillButton
                        key={age}
                        label={age}
                        variant="outlined"
                        onPress={() => updateChild(index, "age", age)}
                        checked={child.age === age}
                      />
                    ))}
                  </Box>
                </Box>

                <Box marginTop="2">
                  <Text variant="title-4-prominent-1" marginBottom="3">
                    School name
                  </Text>
                  <Input
                    label=""
                    placeholder="Add a school name"
                    value={child.schoolName || ""}
                    variant="default"
                    onChangeText={(value) =>
                      updateChild(index, "schoolName", value)
                    }
                  />
                </Box>
              </Box>
            </Box>
          ))}

          <TextButton
            label={`Add Child ${children.length + 1}`}
            onPress={handleAddChild}
            variant="secondary"
          />
        </Box>

  <Box alignItems="center" justifyContent="center" flexDirection="row" marginBottom="6">
        <Button
           label="DONE"
            onPress={handleSubmit(onSubmit)}
            width="m"
            variant="secondary"
            disabled={updateProfile.isPending}
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
   illustration: {
    width: 50,
    height: 50,
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
