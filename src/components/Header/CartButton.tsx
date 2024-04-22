import { useNavigate } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Badge } from "@twilio-paste/core/badge";
import useBearStore from "../hooks/useBearStore";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";

import { TiShoppingCart } from "react-icons/ti";

const CartButton = () => {
  const navigate = useNavigate();
  const numberOfItemsInCart = useBearStore(
    (state) => state.numberOfItemsInCart
  );

  return (
    <Button
      variant="primary_icon"
      size="reset"
      onClick={() => {
        navigate("/cart");
      }}
    >
      <Stack orientation="horizontal" spacing="space40">
        <TiShoppingCart size="40" />

        <Box display="flex" width="30px">
          <Badge as="span" variant="neutral_counter">
            {numberOfItemsInCart >= 99 ? "99+" : numberOfItemsInCart}
          </Badge>
        </Box>
      </Stack>
    </Button>
  );
};

export default CartButton;
