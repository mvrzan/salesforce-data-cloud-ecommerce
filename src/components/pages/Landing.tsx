import { useNavigate } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

import landingModel1 from "../../assets/page-content/landing_page1.webp";
import landingModel2 from "../../assets/page-content/landing_page2.png";

const Landing = () => {
  const navigate = useNavigate();

  const buttonClicked = () => {
    navigate("/home");
  };

  return (
    <>
      <Box width="100%" height="50vh" backgroundColor="colorBackgroundPrimaryWeak">
        <Flex hAlignContent="between">
          <img src={landingModel2} alt="black t-shirt" draggable={false} height="800" />
          <img src={landingModel1} alt="brown jacket" draggable={false} height="800" />
        </Flex>
      </Box>
      <Box marginTop="space120">
        <Flex vertical hAlignContent="center">
          <Stack orientation="vertical" spacing="space50">
            <Text as="p" textAlign="center" fontSize="fontSize60">
              HOT DEALS
            </Text>
            <Text as="h2" textAlign="center" fontWeight="fontWeightExtrabold" fontSize="fontSize100">
              SALES UP TO 50%
            </Text>
          </Stack>
          <Box marginTop="space70">
            <Button variant="primary" onClick={buttonClicked}>
              SHOP NOW
            </Button>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Landing;
