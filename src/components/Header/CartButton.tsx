import { TiShoppingCart } from "react-icons/ti";
import { Button } from "@twilio-paste/core/button";

const CartButton = () => {
  return (
    <Button variant="primary_icon" size="reset">
      <TiShoppingCart size="40" />
    </Button>
  );
};

export default CartButton;
