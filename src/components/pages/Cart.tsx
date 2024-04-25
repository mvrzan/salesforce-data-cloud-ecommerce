import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBearStore from "../hooks/useBearStore";

import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Heading } from "@twilio-paste/core/heading";
import { useUID } from "@twilio-paste/core/dist/uid-library";

import CartItem from "../UI/CartItem";
import CheckoutModal from "../UI/CheckoutModal";
import EmptyCart from "../UI/EmptyCart";
import { Product } from "../../utils/types";

declare const window: Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SalesforceInteractions: any;
  };

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemId = useUID();
  const navigate = useNavigate();
  const { clearCart } = useBearStore();
  const cart = useBearStore((state) => state.cart);

  const clearCartHandler = () => {
    clearCart();
    navigate("/home");

    window.SalesforceInteractions.setLoggingLevel(5);

    // Send to Salesforce Data Cloud
    // User removed all the items form the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: "Cart Clear",
        eventType: "cartCleared",
      },
    });
  };

  const checkoutModalHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <Box margin="space80">
      <Heading as="h1" variant="heading10">
        Review your shopping cart
      </Heading>

      {cart?.length === 0 && <EmptyCart />}
      {cart?.map((product: Product) => {
        return <CartItem key={itemId + Math.random()} product={product} />;
      })}
      {cart?.length > 0 && (
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
            <Button variant="primary" onClick={checkoutModalHandler}>
              Checkout
            </Button>
          </Stack>
        </Flex>
      )}
      {isModalOpen && <CheckoutModal setIsModalOpen={setIsModalOpen} />}
    </Box>
  );
};

export default Cart;
