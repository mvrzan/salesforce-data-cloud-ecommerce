import { useNavigate } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/text";
import { Flex } from "@twilio-paste/core/flex";
import { Button } from "@twilio-paste/core/button";

import Sections from "./Sections";
import UserButton from "./UserButton";
import CartButton from "./CartButton";

const Navigation = () => {
  const navigate = useNavigate();

  const landingClicked = () => {
    navigate("/");
  };

  return (
    <Box backgroundColor="colorBackground" position="sticky" top={0}>
      <Flex padding="space120" hAlignContent="between" vAlignContent="center">
        <Button variant="link">
          <Text
            as="h1"
            fontSize="fontSize90"
            fontWeight="fontWeightSemibold"
            color="colorTextLink"
            onClick={landingClicked}
          >
            Data Cloud Shopping
          </Text>
        </Button>
        <Sections />
        <Flex vAlignContent="center" hAlignContent="center">
          <UserButton />
          <CartButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
