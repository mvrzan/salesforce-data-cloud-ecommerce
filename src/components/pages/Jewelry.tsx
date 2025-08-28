import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Grid, Column } from "@twilio-paste/core/grid";

import Product from "../UI/Product";
import useBearStore from "../hooks/useBearStore";
import jewelryBanner from "../../assets/page-content/jewelry_banner.webp";

interface ProductProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const Jewelry = () => {
  const jewelryProducts = useBearStore((state) => state.jewelryProducts) as ProductProps[];

  return (
    <>
      <Box width="100%" backgroundColor="colorBackgroundStrongest">
        <Flex hAlignContent="between" vAlignContent="center" marginLeft="space80" marginRight="space80">
          <Stack orientation="vertical" spacing="space50">
            <Text
              as="p"
              textAlign="left"
              fontSize="fontSize80"
              fontWeight="fontWeightBold"
              verticalAlign="center"
              color="colorTextInverse"
            >
              Jewelry!
            </Text>
            <Stack orientation="vertical" spacing="space40">
              <Text as="p" textAlign={"left"} fontSize="fontSize40" color="colorTextInverse">
                A fancy necklace or casual earrings?
              </Text>
              <Text as="p" textAlign="left" fontSize="fontSize40" color="colorTextInverse">
                We have got just the thing!
              </Text>
            </Stack>
          </Stack>
          <img src={jewelryBanner} alt="two people posing" draggable={false} height="210" />
        </Flex>
      </Box>
      <Grid marginTop="space60">
        {jewelryProducts?.map((product: ProductProps) => {
          return (
            <Grid gutter="space40" key={product.id}>
              <Column>
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                />
              </Column>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Jewelry;
