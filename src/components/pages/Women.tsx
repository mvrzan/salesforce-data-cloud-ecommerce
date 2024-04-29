import { Box } from "@twilio-paste/box";
import { Stack } from "@twilio-paste/core";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Grid, Column } from "@twilio-paste/core/grid";

import Product from "../UI/Product";
import useBearStore from "../hooks/useBearStore";
import womenBanner1 from "../../assets/page-content/women_banner1.webp";
import womenBanner2 from "../../assets/page-content/women_banner2.webp";

interface ProductProps {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

const Women = () => {
  const womenProducts = useBearStore(
    (state) => state.womenProducts
  ) as ProductProps[];

  return (
    <>
      <Box width="100%" backgroundColor="colorBackgroundBrandHighlightWeakest">
        <Flex
          hAlignContent="between"
          vAlignContent="center"
          marginLeft="space80"
          marginRight="space80"
        >
          <img
            src={womenBanner1}
            alt="two people posing"
            draggable={false}
            height="210"
          />
          <Stack orientation="vertical" spacing="space50">
            <Text
              as="p"
              textAlign="center"
              fontSize="fontSize80"
              fontWeight="fontWeightBold"
              verticalAlign="center"
            >
              Fancy a night out? Chilling by the beach?
            </Text>
            <Text as="p" textAlign="center" fontSize="fontSize40">
              Stylish - anytime, anywhere
            </Text>
          </Stack>
          <img
            src={womenBanner2}
            alt="two people posing"
            draggable={false}
            height="210"
          />
        </Flex>
      </Box>
      <Grid marginTop="space60">
        {womenProducts?.map((product: ProductProps) => {
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

export default Women;
