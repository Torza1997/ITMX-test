import React, { FunctionComponent, PropsWithChildren } from "react";
import useSWR from "swr";
import { UseProductList } from "@/stores/product-list/UseProductList";
import { Box, Grid } from "@mui/material";
import ProductCard from "@/components/common/product-card";
interface ProductPageProps {
  children?: React.ReactNode;
  /* Define your other props here */
}

const ProductPage: FunctionComponent<
  PropsWithChildren<ProductPageProps>
> = () => {
  const { fetchProductList, productList } = UseProductList();
  const { isLoading } = useSWR("/get/product-list", () => fetchProductList(), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
  });

  if (isLoading) return <>loading...</>;

  return (
    <Box>
      <Grid container spacing={1}>
        {productList.map((product) => {
          return (
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              key={`${product?.productName}${product?.id}`}
            >
              <Box display={"flex"} justifyContent={"center"}>
                <ProductCard data={product} />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ProductPage;
