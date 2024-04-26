import { Box } from "@twilio-paste/box";
import { Text } from "@twilio-paste/core/text";
import { Button } from "@twilio-paste/core/button";
import { Column, Grid } from "@twilio-paste/core/grid";

import { Product } from "../../utils/types";
import useBearStore from "../hooks/useBearStore";
import { readFromLocalStorage } from "../../utils/localStorageUtil";

declare const window: Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SalesforceInteractions: any;
  };

interface CartItemProps {
  product: Product;
}

const CartItem = ({ product }: CartItemProps) => {
  const { removeItemFromCart } = useBearStore();

  const removeItemHandler = () => {
    removeItemFromCart(product);

    const userLoggedIn = JSON.parse(
      readFromLocalStorage("isAuthenticated") as string
    );

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "identity",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user removed an item from the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CartInteractionName
            .RemoveFromCart,
          lineItem: {
            catalogObjectType: "Product",
            catalogObjectId: product.id.toString(),
            quantity: product.quantity,
            price: product.price,
            currency: "USD",
            attributes: {
              title: product.title,
              description: product.description,
              rating: product.rating.rate,
              image: product.image,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user removed an item from the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CartInteractionName.RemoveFromCart,
        lineItem: {
          catalogObjectType: "Product",
          catalogObjectId: product.id.toString(),
          quantity: product.quantity,
          price: product.price,
          currency: "USD",
          attributes: {
            title: product.title,
            description: product.description,
            rating: product.rating.rate,
            image: product.image,
          },
        },
      },
    });
  };

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
          <Box
            alignItems="center"
            justifyContent="start"
            marginLeft="space80"
            display="flex"
            height="100%"
          >
            <img
              src={product.image}
              alt="two people posing"
              draggable={false}
              height="100"
            />
          </Box>
        </Column>
        <Column>
          <Box
            alignItems="center"
            justifyContent="start"
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
              fontSize="fontSize40"
              fontWeight="fontWeightBold"
              textAlign="center"
              margin="space40"
            >
              Quantity: {product.quantity}
            </Text>
          </Box>
        </Column>
        <Column>
          <Box
            alignItems="center"
            justifyContent="end"
            display="flex"
            height="100%"
            marginRight="space80"
          >
            <Button variant="destructive" onClick={removeItemHandler}>
              Remove
            </Button>
          </Box>
        </Column>
      </Grid>
    </Box>
  );
};

export default CartItem;
