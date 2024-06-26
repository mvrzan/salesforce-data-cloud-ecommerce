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
import EmptyCart from "../UI/EmptyCart";
import CheckoutModal from "../UI/CheckoutModal";

import { Product } from "../../utils/types";
import useSalesforceInteractions from "../hooks/useSalesforceInteractions";

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemId = useUID();
  const navigate = useNavigate();
  const { clearCart } = useBearStore();
  const cart = useBearStore((state) => state.cart);
  const { clearCartHook, purchaseHook } = useSalesforceInteractions();

  const clearCartHandler = () => {
    clearCart();
    navigate("/home");
    clearCartHook();
  };

  const checkoutModalHandler = () => {
    setIsModalOpen(true);
    purchaseHook(cart);
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
