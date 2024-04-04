import { Box } from "@twilio-paste/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Stack } from "@twilio-paste/core/stack";
import { Grid, Column } from "@twilio-paste/core/grid";

import useBearStore from "../hooks/useBearStore";

import Product from "../UI/Product";
import menBanner1 from "../../assets/page-content/men_banner1.webp";
import menBanner2 from "../../assets/page-content/men_banner2.webp";

interface ProductProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const Men = () => {
  const products = useBearStore((state) => state.products);
  const filteredMensProducts = products?.filter(
    (product: ProductProps) => product.category === "men's clothing"
  );

  return (
    <>
      <Box width="100%" height="20vh" backgroundColor="colorBackgroundBrand">
        <Flex
          hAlignContent="between"
          vAlignContent="center"
          marginLeft="space80"
          marginRight="space80"
        >
          <img
            src={menBanner1}
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
              color="colorTextInverse"
            >
              Everything you are looking for
            </Text>
            <Text
              as="p"
              textAlign="center"
              fontSize="fontSize40"
              color="colorTextInverse"
            >
              At your fingertips!
            </Text>
          </Stack>
          <img
            src={menBanner2}
            alt="two people posing"
            draggable={false}
            height="210"
          />
        </Flex>
      </Box>
      <Grid marginTop="space60">
        {filteredMensProducts?.map((product: ProductProps) => {
          return (
            <Grid gutter="space40" key={product.id}>
              <Column>
                <Product
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                />
              </Column>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Men;
