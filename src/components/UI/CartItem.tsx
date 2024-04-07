import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/core/text";
import { Button } from "@twilio-paste/core/button";
import { Column, Grid } from "@twilio-paste/core/grid";

import { Product } from "../../utils/types";

interface CartItemProps {
  product: Product;
}

const CartItem = ({ product }: CartItemProps) => {
  return (
    <Box
      marginTop="space40"
      marginBottom="space40"
      padding="space60"
      boxShadow="shadow"
      borderRadius="borderRadius30"
    >
      <Grid>
        <Column>
          <img
            src={product.image}
            alt="two people posing"
            draggable={false}
            height="100"
          />
        </Column>
        <Column>
          <Box
            alignItems="center"
            justifyContent="end"
            display="flex"
            height="100%"
          >
            <Text
              as="h1"
              fontSize="fontSize40"
              fontWeight="fontWeightBold"
              textAlign="center"
              margin="space40"
            >
              {product.title}
            </Text>
          </Box>
        </Column>
        <Column>
          <Box
            alignItems="center"
            justifyContent="end"
            display="flex"
            height="100%"
          >
            <Text
              as="p"
              fontSize="fontSize60"
              fontWeight="fontWeightBold"
              color="colorTextLink"
              textAlign="center"
              margin="space40"
            >
              ${product.price}
            </Text>
          </Box>
        </Column>
        <Column>
          <Box
            alignItems="center"
            justifyContent="end"
            display="flex"
            height="100%"
          >
            <Text
              as="p"
              fontSize="fontSize30"
              textAlign="center"
              margin="space40"
            >
              Quantity:
            </Text>
          </Box>
        </Column>
        <Column>
          <Box
            alignItems="center"
            justifyContent="end"
            display="flex"
            height="100%"
          >
            <Button variant="destructive">Remove</Button>
          </Box>
        </Column>
      </Grid>
    </Box>
  );
};

export default CartItem;
