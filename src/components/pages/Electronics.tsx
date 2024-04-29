import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Grid, Column } from "@twilio-paste/core/grid";

import Product from "../UI/Product";
import useBearStore from "../hooks/useBearStore";
import electronicsBanner1 from "../../assets/page-content/electronics_banner1.webp";

interface ProductProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const Electronics = () => {
  const electronicsProducts = useBearStore(
    (state) => state.electronicsProducts
  ) as ProductProps[];

  return (
    <>
      <Box width="100%" backgroundColor="colorBackgroundPrimaryWeak">
        <Flex
          hAlignContent="between"
          vAlignContent="center"
          marginLeft="space80"
          marginRight="space80"
        >
          <img
            src={electronicsBanner1}
            alt="two people posing"
            draggable={false}
            height="210"
          />
          <Stack orientation="vertical" spacing="space50">
            <Text
              as="p"
              textAlign="left"
              fontSize="fontSize80"
              fontWeight="fontWeightBold"
              verticalAlign="center"
            >
              The latest tech has landed!
            </Text>
            <Text as="p" textAlign="left" fontSize="fontSize40">
              Do not miss out!
            </Text>
          </Stack>
        </Flex>
      </Box>
      <Grid marginTop="space60">
        {electronicsProducts?.map((product: ProductProps) => {
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

export default Electronics;
