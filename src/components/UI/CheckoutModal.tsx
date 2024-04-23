import useBearStore from "../hooks/useBearStore";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalHeading,
  ModalFooterActions,
} from "@twilio-paste/core/modal";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { useUID } from "@twilio-paste/core/uid-library";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";

interface CheckoutModalProps {
  setIsModalOpen: (value: boolean) => void;
}

const CheckoutModal = ({ setIsModalOpen }: CheckoutModalProps) => {
  const modalHeadingID = useUID();
  const navigate = useNavigate();
  const { clearCart } = useBearStore();

  const okayButtonHandler = () => {
    clearCart();
    navigate("/home");
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen
      onDismiss={() => {
        setIsModalOpen(false);
      }}
      size="default"
      ariaLabelledby="checkout-modal"
    >
      <ModalHeader>
        <Stack orientation="vertical" spacing="space20">
          <ModalHeading id={modalHeadingID}>
            You have successfully
            <Text
              as="span"
              fontSize="fontSize70"
              color="colorTextDecorative40"
              fontWeight="fontWeightBold"
            >
              {" "}
              checked out!
            </Text>
          </ModalHeading>
          <Paragraph>Don't worry, you can still shop more!</Paragraph>
        </Stack>
      </ModalHeader>
      <ModalBody>
        <Stack orientation="vertical" spacing="space40">
          <Separator orientation="horizontal" verticalSpacing="space10" />
        </Stack>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Button variant="primary" onClick={okayButtonHandler}>
            Okay
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default CheckoutModal;
