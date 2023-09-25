import React, { FunctionComponent, PropsWithChildren } from "react";
import useSWR from "swr";
import { UseProductList } from "@/stores/product-list/UseProductList";
import { Grid } from "@mui/material";
import ProductCard from "@/components/common/product-card";
import Loading from "@/components/common/loading";
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

  if (isLoading) return <Loading />;

  return (
    <Grid container spacing={1}>
      {productList.map((product) => {
        return (
          <Grid
            sx={{ minWidth: "fit-content" }}
            item
            xs={12}
            md={4}
            lg={3}
            key={`${product?.productName}${product?.id}`}
          >
            <ProductCard data={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductPage;
