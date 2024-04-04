import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Truncate } from "@twilio-paste/core/truncate";
import { Separator } from "@twilio-paste/core/separator";

interface ProductProps {
  image: string;
  price: number;
  title: string;
}

const Product = ({ image, price, title }: ProductProps) => {
  return (
    <Box
      borderRadius="borderRadius30"
      boxShadow="shadow"
      margin="space40"
      width="500px"
      height="500px"
    >
      <Flex vAlignContent="center" hAlignContent="center">
        <Box marginTop="space40" marginBottom="space40">
          <img
            src={image}
            alt="two people posing"
            draggable={false}
            height="210"
          />
        </Box>
      </Flex>
      <Separator orientation="horizontal" verticalSpacing="space30" />
      <Stack orientation="vertical" spacing="space200">
        <Text
          as="h1"
          fontSize="fontSize40"
          fontWeight="fontWeightBold"
          textAlign="center"
          margin="space40"
        >
          <Truncate title="product title">{title}</Truncate>
        </Text>
        <Text
          as="h1"
          fontSize="fontSize70"
          fontWeight="fontWeightBold"
          textAlign="center"
          color="colorTextLink"
        >
          ${price}
        </Text>
      </Stack>
      <Flex vAlignContent="center" hAlignContent="center" marginTop="space60">
        <Stack orientation="horizontal" spacing="space80">
          <Button variant="primary">Add to Cart</Button>
          <Button variant="secondary">View Details</Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Product;
