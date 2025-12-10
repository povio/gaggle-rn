import Box from "@/components/Box";
import Image from "@/components/Image";
import Tooltip from "@/components/messages/Tooltip";
import Text from "@/components/text/Text";
import Counter from "@/modules/auth/components/Counter";

export default function Home() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      gap="2"
      backgroundColor="elevation-background"
    >
      <Box
        gap="2"
        mt="2"
      >
        <Text variant="body-4-prominent-2-italic">ENV API URL: {apiUrl}</Text>
        <Image
          width={200}
          height={200}
          source="https://picsum.photos/seed/200/3000/2000"
          contentFit="contain"
        />
      </Box>
      <Counter />
      <Box
        mt="12"
        justifyContent="flex-start"
        alignItems="flex-start"
        width="100%"
        px="6"
      >
        <Tooltip
          position="top"
          text="Lorem ipsum text, this is our custom tooltip."
        >
          <Box
            justifyContent="center"
            alignItems="center"
          >
            <Text>Tooltip example</Text>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
