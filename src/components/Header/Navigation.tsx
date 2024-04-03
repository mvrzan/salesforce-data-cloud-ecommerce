import { Text } from "@twilio-paste/text";
import { Flex } from "@twilio-paste/core/flex";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

import Sections from "./Sections";
import UserButton from "./UserButton";
import CartButton from "./CartButton";

const Navigation = () => {
  return (
    <Flex padding="space120" hAlignContent="between" vAlignContent="center">
      <Button variant="link">
        <Text as="h1" fontSize="fontSize90" fontWeight="fontWeightSemibold">
          Data Cloud Shopping
        </Text>
      </Button>
      <Sections />
      <Stack orientation="horizontal" spacing="space60">
        <UserButton />
        <CartButton />
      </Stack>
    </Flex>
  );
};

export default Navigation;
