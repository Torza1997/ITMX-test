import { Box, Button, Stack, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { ProductType } from "@/types/product-list/productType";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  children?: React.ReactNode;
  data: ProductType;
  /* Define your other props here */
}

const ProductCard = ({ data }: PropsWithChildren<ProductCardProps>) => {
  const navigator = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="div"
        sx={{
          position: "relative",
          width: 200,
          height: 150,
          backgroundImage: `url(${data?.productImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: 5,
          zIndex: 1,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
      ></Box>
      <Box
        sx={{
          bgcolor: "white",
          width: 250,
          minHeight: 200,
          top: -60,
          paddingTop: "60px",
          position: "relative",
          borderRadius: 5,
          zIndex: 0,
          paddingBottom: 2,
          paddingX: 3,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography noWrap>{data?.productName}</Typography>
            <Typography
              noWrap
              sx={{
                color: "#8f8f8f",
                fontSize: 20,
                lineHeight: 0.5,
              }}
            >
              {data?.productDescription}
            </Typography>
          </Box>

          <Stack direction={"row"} alignItems={"center"}>
            <StarIcon sx={{ color: "#ffc400", width: 20 }} />
            <Typography fontSize={20}>
              {data?.star}
              <span style={{ color: "gray" }}> ({data?.reviewer})</span>
            </Typography>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box
              sx={{
                width: "fit-content",
                paddingX: 1,
                borderRadius: 5,
                fontSize: 20,
              }}
              bgcolor={"#2dfd7d"}
            >
              ${data?.productPrice}
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                navigator(`/product-detail/${data?.id}`);
              }}
              sx={{
                height: 30,
                borderRadius: 3,
                bgcolor: "#5222c3",
              }}
            >
              detail
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductCard;
