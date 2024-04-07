import { useNavigate } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { useUID } from "@twilio-paste/core/dist/uid-library";

import CartItem from "../UI/CartItem";
import { Product } from "../../utils/types";
import useBearStore from "../hooks/useBearStore";

const Cart = () => {
  const itemId = useUID();
  const navigate = useNavigate();
  const { clearCart } = useBearStore();
  const cart = useBearStore((state) => state.cart);

  const clearCartHandler = () => {
    clearCart();
    navigate("/home");
  };

  return (
    <Box margin="space80">
      <Heading as="h1" variant="heading10">
        Review your shopping cart
      </Heading>
      {cart?.map((product: Product) => {
        return <CartItem key={itemId + Math.random()} product={product} />;
      })}

      <Flex hAlignContent="between">
        <Button variant="destructive" onClick={clearCartHandler}>
          Clear shopping cart
        </Button>
        <Stack orientation="horizontal" spacing="space40">
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/home");
            }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log("cart", cart);
            }}
          >
            Checkout
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Cart;
