import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import Box from "@/components/Box";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import PillButton from "@/components/buttons/PillButton";
import Image from "@/components/Image";
import { ActivityPreviews } from "@/components/shared/ActivityPreview";
import { ProgramCard } from "@/components/shared/ProgramCard";
import Text from "@/components/text/Text";
import { useProgramFavorite } from "@/hooks/useProgramFavorite";
import { ProviderQueries } from "@/openapi/provider/provider.queries";
import { RestUtils } from "@/utils/rest/rest.utils";
import { showToast } from "@/utils/toast";

export default function ProviderDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const providerId = id || "";

  const { data: providerData } = ProviderQueries.useGetDetails(
    {
      providerId,
    },
    { enabled: !!providerId },
  );

  const { data: providerFollowing } = ProviderQueries.useListFollowedIds();
  const isFollowing = providerFollowing?.items.includes(providerId);

  const { toggleFavorite, favoritedProgramsList } = useProgramFavorite();

  const { data: providerPrograms } = ProviderQueries.useListPrograms(
    {
      providerId,
      limit: 20,
      page: 1,
    },
    { enabled: !!providerId },
  );

  const followMutation = ProviderQueries.useFollow();
  const unFollowMutation = ProviderQueries.useUnfollow();

  const handleBack = () => {
    router.push("/(app)/(tabs)");
  };

  const handleFallowProvider = () => {
    const mutation = isFollowing ? unFollowMutation : followMutation;

    mutation.mutate(
      { providerId },
      {
        onSuccess: async () => {
          showToast({
            variant: "success",
            message: isFollowing ? "Provider unfollowed" : "Provider followed.",
          });
        },
        onError: (error) => {
          const errorMessage = RestUtils.extractServerErrorMessage(error);
          showToast({
            variant: "error",
            message: errorMessage || "Failed to follow provider",
          });
        },
      },
    );
  };

  if (!providerPrograms) {
    return null;
  }

  return (
    <Box
      flex={1}
      backgroundColor="elevation-background"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require("@/assets/backgrounds/elipse_top_1.svg")}
          style={styles.topElipsis}
          contentFit="contain"
        />
        <View style={styles.header}>
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginTop="10"
            gap="4"
          >
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-start"
              position="relative"
              paddingHorizontal="5"
              width="100%"
              height={140}
            >
              <Box
                justifyContent="center"
                alignContent="center"
                backgroundColor="elevation-background"
                width={38}
                height={38}
                borderRadius="full"
                style={styles.iconContainer}
              >
                <IconButton
                  icon={<ArrowLeftIcon />}
                  onPress={handleBack}
                  variant="transparent"
                  style={styles.headerIcon}
                />
              </Box>
              <Box
                alignSelf="flex-end"
                style={styles.providerImageBg}
                borderRadius="full"
                overflow="hidden"
              >
                <Image
                  source={require("@/assets/illustrations/camp.svg")}
                  style={styles.providerImage}
                  contentFit="contain"
                />
              </Box>
              <Box
                justifyContent="center"
                alignContent="center"
                width={38}
                height={38}
                visible
              />
            </Box>
            <Text
              variant="variant-5-prominent"
              textAlign="center"
            >
              {providerData?.name}
            </Text>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap="2"
            >
              <PillButton
                label="Kids"
                onPress={() => {}}
                variant="primary"
                textVariant="variant-11"
              />
              <PillButton
                label="School"
                onPress={() => {}}
                variant="primary"
                textVariant="variant-11"
              />
              <PillButton
                label="Sport"
                onPress={() => {}}
                variant="primary"
                textVariant="variant-11"
              />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap="2"
              paddingTop="3"
            >
              <Box
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2"
              >
                <Text
                  variant="variant-14"
                  textAlign="center"
                >
                  {providerData?.locations.length}
                </Text>
                <Text textAlign="center">Places</Text>
              </Box>
              <Box
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2"
              >
                <Text
                  variant="variant-14"
                  textAlign="center"
                >
                  {providerData?.followCount}
                </Text>
                <Text textAlign="center">Followed</Text>
              </Box>
            </Box>
            <Button
              label={isFollowing ? "Unfollow" : "Follow"}
              onPress={handleFallowProvider}
              width="l"
              textVariant="variant-2-prominent"
              variant={isFollowing ? "outlined" : "secondary"}
            />
          </Box>
        </View>
        <Box
          paddingHorizontal="5"
          paddingTop="4"
          paddingBottom="4"
          gap="2"
        >
          <Box
            flexDirection={"column"}
            gap="2"
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Our Take
            </Text>
            <Text
              variant="variant-7"
              textAlign="left"
            >
              {providerData?.ourTake}
            </Text>
          </Box>
          <Box
            flexDirection={"column"}
            gap="2"
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Parents also like
            </Text>
            <Text
              variant="variant-7"
              textAlign="left"
            >
              {providerData?.parentsLike}
            </Text>
          </Box>
          <Box>
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Parents also choose:
            </Text>
            <ActivityPreviews />
          </Box>
          <Box
            flexDirection={"column"}
            gap={"2"}
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Locations
            </Text>
            <Box
              flexDirection={"row"}
              gap={"1"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              {providerData?.locations?.map((location) => (
                <Text
                  variant="variant-7"
                  textAlign="left"
                  color="interactive-tertiary-on"
                >
                  {location.name}
                </Text>
              ))}
            </Box>
          </Box>
          <Box
            flexDirection={"column"}
            width={"100%"}
            paddingBottom={"4"}
            gap="4"
          >
            <Text
              variant="variant-6-prominent"
              textAlign="left"
            >
              Services
            </Text>
            {providerPrograms && providerPrograms?.items?.length > 0 ? (
              providerPrograms?.items?.map((card) => {
                const isFav = favoritedProgramsList?.find((id) => id === card.programId);
                return (
                  <ProgramCard
                    isFavored={isFav !== undefined}
                    data={card}
                    key={card.programId}
                    callback={() => toggleFavorite({ programId: card.programId })}
                  />
                );
              })
            ) : (
              <Text textAlign="left">This provider has no services</Text>
            )}
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "relative",
    zIndex: 1,
  },
  topElipsis: {
    position: "absolute",
    top: -10,
    left: 0,
    width: "100%",
    height: 150,
  },
  iconContainer: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px 3px",
  },
  headerIcon: {
    padding: 0,
    alignSelf: "center",
  },
  providerImage: {
    width: 113,
    height: 113,
  },
  providerImageBg: {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 11px 20px 11px",
  },
  scrollContent: {
    flexGrow: 1,
  },
  iconButton: {
    minHeight: 66,
    width: 66,
    boxShadow: "0px 3px 9px 9px rgba(0,0,0,0.1)",
  },
});
