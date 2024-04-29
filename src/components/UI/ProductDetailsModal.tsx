import {
  Modal,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
} from "@twilio-paste/core/modal";
import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Flex } from "@twilio-paste/core/flex";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { useUID } from "@twilio-paste/core/uid-library";
import { Paragraph } from "@twilio-paste/core/paragraph";
import { Separator } from "@twilio-paste/core/separator";
import { Meter, MeterLabel } from "@twilio-paste/core/meter";

import useBearStore from "../hooks/useBearStore";
import useSalesforceInteractions from "../hooks/useSalesforceInteractions";

interface ProductDetailsModalProps {
  setIsModalOpen: (value: boolean) => void;
  image: string;
  price: number;
  title: string;
  description: string;
  id: number;
  rating: { rate: number; count: number };
}

const ProductDetailsModal = ({
  setIsModalOpen,
  image,
  price,
  title,
  description,
  rating,
  id,
}: ProductDetailsModalProps) => {
  const modalHeadingID = useUID();
  const meterID = useUID();
  const addToCart = useBearStore((state) => state.addToCart);
  const { addToCartHook } = useSalesforceInteractions();

  const handleAddToCart = () => {
    const product = {
      id,
      image,
      price,
      title,
      description,
      rating,
    };

    addToCart(product);
    setIsModalOpen(false);
    addToCartHook(product);
  };

  return (
    <Modal
      isOpen
      onDismiss={() => {
        setIsModalOpen(false);
      }}
      size="default"
      ariaLabelledby="product-details-modal"
    >
      <ModalHeader>
        <ModalHeading id={modalHeadingID}>{title}</ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Flex vAlignContent="center" hAlignContent="center" margin="space40">
          <img src={image} alt="product image" height="200" />
        </Flex>
        <Separator orientation="horizontal" verticalSpacing="space100" />
        <Paragraph>{description}</Paragraph>
        <Flex vAlignContent="center" hAlignContent="between" margin="space40">
          <Box maxWidth="size30" width="size100">
            <MeterLabel htmlFor={meterID} valueLabel="5 Stars">
              Rating
            </MeterLabel>
            <Meter id={meterID} value={rating.rate} minValue={0} maxValue={5} />
          </Box>
          <Text
            as="h1"
            fontSize="fontSize70"
            fontWeight="fontWeightBold"
            textAlign="center"
            color="colorTextLink"
          >
            ${price}
          </Text>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <Stack orientation="horizontal" spacing="space60">
            <Button variant="destructive" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </Stack>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default ProductDetailsModal;
