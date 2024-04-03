import { Box } from "@twilio-paste/box";
import { Stack } from "@twilio-paste/core";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";

import homeBanner from "../../assets/page-content/home_banner.png";
import useBearStore from "../hooks/useBearStore";

const Home = () => {
  const products = useBearStore((state) => state.products);
  console.log(products);

  return (
    <Box
      width="100%"
      height="20vh"
      backgroundColor="colorBackgroundPrimaryWeak"
    >
      <Flex
        hAlignContent="between"
        vAlignContent="center"
        marginLeft="space80"
        marginRight="space80"
      >
        <Stack orientation="vertical" spacing="space50">
          <Text
            as="p"
            textAlign={"left"}
            fontSize="fontSize80"
            fontWeight="fontWeightBold"
            verticalAlign="center"
          >
            Member Exclusive
          </Text>
          <Text as="p" textAlign={"left"} fontSize="fontSize40">
            15% off everything + extra $10 off for the first order!
          </Text>
        </Stack>
        <img
          src={homeBanner}
          alt="two people posing"
          draggable={false}
          height="210"
        />
      </Flex>
    </Box>
  );
};

export default Home;
