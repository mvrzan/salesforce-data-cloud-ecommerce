import { Box } from "@twilio-paste/box";
import { Stack } from "@twilio-paste/core";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Grid, Column } from "@twilio-paste/core/grid";

import Product from "../UI/Product";
import useBearStore from "../hooks/useBearStore";
import homeBanner from "../../assets/page-content/home_banner.png";

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
      <Box
        width="100%"
        height="20vh"
        backgroundColor="colorBackgroundPrimaryWeak"
      >
        <Flex
          hAlignContent="between"
          vAlignContent="center"
          marginLeft="space80"
          marginRight="space80"
        >
          <Stack orientation="vertical" spacing="space50">
            <Text
              as="p"
              textAlign={"left"}
              fontSize="fontSize80"
              fontWeight="fontWeightBold"
              verticalAlign="center"
            >
              Member Exclusive
            </Text>
            <Text as="p" textAlign={"left"} fontSize="fontSize40">
              15% off everything + extra $10 off for the first order!
            </Text>
          </Stack>
          <img
            src={homeBanner}
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
