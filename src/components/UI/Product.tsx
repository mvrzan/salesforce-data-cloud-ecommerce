import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Button } from "@twilio-paste/core/button";
import { Truncate } from "@twilio-paste/core/truncate";
import { Separator } from "@twilio-paste/core/separator";

import useBearStore from "../hooks/useBearStore";
import ProductDetailsModal from "./ProductDetailsModal";
import { readFromLocalStorage } from "../../utils/localStorageUtil";

declare const window: Window &
  typeof globalThis & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SalesforceInteractions: any;
  };

interface ProductProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
  rating: { rate: number; count: number };
}

const Product = ({
  image,
  price,
  title,
  description,
  rating,
  id,
}: ProductProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToCart = useBearStore((state) => state.addToCart);
  const location = useLocation();

  const currentPath = location.pathname.substring(1);

  const handleViewDetails = () => {
    setIsModalOpen(!isModalOpen);
    const userLoggedIn = JSON.parse(
      readFromLocalStorage("isAuthenticated") as string
    );

    if (userLoggedIn) {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      const attributes = {
        eventType: "contactPointEmail",
        firstName: user.firstName,
        lastName: user.lastName,
        isAnonymous: "1",
        email: user.email,
        phoneNumber: user.phoneNumber,
      };

      // Send to Salesforce Data Cloud that a known user viewed a product
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CatalogObjectInteractionName
            .ViewCatalogObject,
          catalogObject: {
            type: "Product",
            id: id.toString(),
            attributes: {
              name: title,
              category: currentPath,
              price,
              rating: rating.rate,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user viewed a product
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CatalogObjectInteractionName
          .ViewCatalogObject,
        catalogObject: {
          type: "Product",
          id: id.toString(),
          attributes: {
            name: title,
            category: currentPath,
            price,
            rating: rating.rate,
          },
        },
      },
    });
  };

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

      // Send to Salesforce Data Cloud that a known user added a product to the cart
      window.SalesforceInteractions.sendEvent({
        interaction: {
          name: window.SalesforceInteractions.CartInteractionName.AddToCart,
          lineItem: {
            catalogObjectType: "Product",
            catalogObjectId: id.toString(),
            quantity: 1,
            price: price,
            currency: "USD",
            attributes: {
              title,
              description,
              rating: rating.rate,
              image,
            },
          },
        },
        user: {
          attributes,
        },
      });

      return;
    }

    // Send to Salesforce Data Cloud that an unknown user added a product to the cart
    window.SalesforceInteractions.sendEvent({
      interaction: {
        name: window.SalesforceInteractions.CartInteractionName.AddToCart,
        lineItem: {
          catalogObjectType: "Product",
          catalogObjectId: id.toString(),
          quantity: 1,
          price: price,
          currency: "USD",
          attributes: {
            title,
            description,
            rating: rating.rate,
            image,
          },
        },
      },
    });
  };

  return (
    <>
      {isModalOpen && (
        <ProductDetailsModal
          setIsModalOpen={setIsModalOpen}
          image={image}
          price={price}
          title={title}
          description={description}
          rating={rating}
          id={id}
        />
      )}
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
            <Button
              element="BUTTON_STATIC_POSITION"
              variant="secondary"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            <Button
              element="BUTTON_STATIC_POSITION"
              variant="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Product;
