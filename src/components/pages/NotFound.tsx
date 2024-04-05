import { useNavigate } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      padding="space80"
      width="100%"
      height="100%"
      position="absolute"
      backgroundColor="colorBackgroundPrimaryWeakest"
    >
      <Flex
        vertical
        vAlignContent="center"
        hAlignContent="center"
        height="100%"
        maxHeight="100%"
      >
        <Stack orientation="vertical" spacing="space60">
          <Flex vAlignContent="center" hAlignContent="center">
            <Text
              as="h1"
              fontSize="fontSize110"
              fontWeight="fontWeightExtrabold"
              color="colorTextLink"
            >
              404 - Not Found
            </Text>
          </Flex>
          <Text as="p" fontSize="fontSize40">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Text>
          <Flex vAlignContent="center" hAlignContent="center">
            <Button variant="primary" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default NotFound;
