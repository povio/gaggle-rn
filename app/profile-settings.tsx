import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import DocumentIcon from "@/assets/icons/DocumentIcon";
import InfoCircleIcon from "@/assets/icons/InfoCircleIcon";
import ShareIcon from "@/assets/icons/ShareIcon";
import StarEmptyIcon from "@/assets/icons/StarEmptyIcon";
import SupportIcon from "@/assets/icons/SupportIcon";
import Box from "@/components/Box";
import IconButton from "@/components/buttons/IconButton";
import Toggle from "@/components/buttons/Toggle";
import Text from "@/components/text/Text";
import { STORAGE_KEYS } from "@/constants/storage";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { useUserStore } from "@/modules/user/userStore";
import { UserQueries } from "@/openapi/user/user.queries";
import { setStorageItemAsync } from "@/utils/secureStore";

const ProfileSettings = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { clearUser } = useUserStore();
  const { clearAllOnboarding } = useOnboarding();
  const { data: currentUser } = UserQueries.useGet();

  const handleLogout = async () => {
    // Store email before logging out
    if (currentUser?.email) {
      await setStorageItemAsync(STORAGE_KEYS.LAST_SIGNED_IN_EMAIL, currentUser.email);
    }

    // Clear all onboarding data
    await clearAllOnboarding();

    // Clear user store
    clearUser();

    // Logout (clears auth token)
    logout();

    // Navigate to index which will redirect to sign-in
    router.replace("/");
  };

  const handleBack = () => {
    router.push("/profile");
  };

  return (
    <ScrollView style={styles.scrollView}>
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
              Settings
            </Text>
          </Box>
        </Box>

        <Box
          paddingVertical={"7"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection={"row"}
          width={"100%"}
        >
          <Text
            variant="variant-17-prominent"
            textAlign="center"
          >
            Notifications
          </Text>
          <Toggle
            id="notifications"
            onChange={() => {}}
            checked={true}
          />
        </Box>
      </Box>
      <Box
        width={"100%"}
        height={1}
        backgroundColor={"text-disabled"}
      />
      <Box
        flexDirection={"column"}
        gap={"6"}
        backgroundColor="elevation-background"
        paddingTop="9"
        paddingHorizontal="9"
        width={"100%"}
      >
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={() => router.push("/technical-support")}
        >
          <SupportIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Technical Support
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={() => router.push("/privacy-policy")}
        >
          <DocumentIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Privacy Policy
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={() => router.push("/terms-of-use")}
        >
          <DocumentIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Terms of use
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={() => router.push("/share-app")}
        >
          <ShareIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Share app
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={() => router.push("/rate-us")}
        >
          <StarEmptyIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Leave a review
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={() => router.push("/about")}
        >
          <InfoCircleIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            About
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width={"100%"}
          alignItems={"center"}
          gap="2"
          onTouchEnd={handleLogout}
        >
          <InfoCircleIcon
            color="#b1b1b1"
            width={24}
            height={24}
          />
          <Text
            variant="variant-11"
            textAlign="center"
          >
            Logout
          </Text>
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
  textBtn: {
    textDecorationLine: "underline",
  },
  headerIcon: {
    padding: 0,
    alignSelf: "center",
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

export default ProfileSettings;
