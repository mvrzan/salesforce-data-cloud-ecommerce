import { useNavigate } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <Box width="100%" height="50vh" backgroundColor="colorBackgroundPrimaryWeakest" borderRadius="borderRadius40">
      <Flex vertical vAlignContent="center" hAlignContent="center" height="100%">
        <Stack orientation="vertical" spacing="space60">
          <Flex vAlignContent="center" hAlignContent="center">
            <Text as="h1" fontSize="fontSize110" fontWeight="fontWeightExtrabold" color="colorTextLink">
              Your cart is empty! 😢
            </Text>
          </Flex>
          <Text as="p" fontSize="fontSize40">
            Let's change that and add some items to your cart! There are plenty of nice things to choose from!
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

export default EmptyCart;
