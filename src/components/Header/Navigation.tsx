import { Heading } from "@twilio-paste/core/heading";
import { Flex } from "@twilio-paste/core/flex";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

import UserButton from "./UserButton";
import CartButton from "./CartButton";

const Navigation = () => {
  return (
    <Flex padding="space120" hAlignContent="between">
      <Button variant="link">
        <Heading as="h1" variant="heading10">
          Data Cloud Shopping
        </Heading>
      </Button>

      <Stack orientation="horizontal" spacing="space60">
        <UserButton />
        <CartButton />
      </Stack>
    </Flex>
  );
};

export default Navigation;
