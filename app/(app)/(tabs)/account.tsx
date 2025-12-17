import { useRouter } from "expo-router";
import { Text } from "react-native";

import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import { STORAGE_KEYS } from "@/constants/storage";
import { UsersQueries } from "@/data/users";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import { setStorageItemAsync } from "@/utils/secureStore";

const AccountPage = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { data: currentUser } = UsersQueries.useGetCurrentUser();

  const handleLogout = async () => {
    // Store email before logging out
    if (currentUser?.email) {
      await setStorageItemAsync(STORAGE_KEYS.LAST_SIGNED_IN_EMAIL, currentUser.email);
    }

    logout();
    router.replace("/welcome");
  };

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
      p="4"
      pt="2"
    >
      <Text style={{ fontSize: 15 }}>Account page</Text>
      <Button
        label="Logout"
        onPress={handleLogout}
      />
    </Box>
  );
};

export default AccountPage;
