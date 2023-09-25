import { UseProductList } from "@/stores/product-list/UseProductList";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { isUndefined } from "lodash";
import React, { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AddIcon from "@mui/icons-material/Add";
interface ProductDetailPageProps {
  children?: React.ReactNode;
  /* Define your other props here */
}

const ProductDetailPage: FunctionComponent<
  PropsWithChildren<ProductDetailPageProps>
> = () => {
  const id = useParams()?.id;
  const { getProductById } = UseProductList();

  const data = useMemo(() => {
    if (isUndefined(id)) return [];
    return getProductById(+id);
  }, [id, getProductById])?.[0];

  return (
    <Box>
      <Stack sx={{ borderRadius: 5, minWidth: 300, maxWidth: 700 }}>
        <Box
          component="div"
          sx={{
            position: "relative",
            height: 300,
            backgroundImage: `url(${data?.productImage ?? ""})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: 5,
            zIndex: 0,
          }}
        ></Box>
        <Box
          sx={{
            position: "relative",
            height: "fit-content",
            bgcolor: "#fff",
            borderRadius: 5,
            top: -50,
            zIndex: 1,
            padding: 3,
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
          }}
        >
          <Typography fontWeight={600}>{data?.productName}</Typography>

          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{
              fontSize: 10,
            }}
          >
            <Box display={"flex"} alignItems={"center"}>
              <StarIcon sx={{ color: "#ffc400", width: 20 }} />
              <Typography fontSize={25}>
                {data?.star}
                <span style={{ color: "gray" }}> ({data?.reviewer})</span>
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: "#d3f70b",
                borderRadius: 3,
                paddingX: 1,
                fontSize: 25,
                height: 30,
              }}
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <AccessibilityNewIcon sx={{ color: "#000", width: 20 }} />
              {data?.calories} calories
            </Box>
          </Stack>

          <Box>
            <Typography fontWeight={600}>Detail</Typography>
            <Typography fontSize={25} color={"gray"}>
              {data?.productDetail}
            </Typography>
          </Box>

          <Stack justifyContent={"space-between"} direction={"row"}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                sx={{
                  border: "1px solid #8f8f8f",
                  width: 30,
                  height: 30,
                }}
              >
                <AddIcon
                  sx={{
                    color: "#d3f70b",
                    width: 30,
                    height: 30,
                  }}
                />
              </IconButton>
              {10}
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                sx={{
                  border: "1px solid #8f8f8f",
                  width: 30,
                  height: 30,
                }}
              >
                <AddIcon
                  sx={{
                    color: "#d3f70b",
                    width: 30,
                    height: 30,
                  }}
                />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{
                minWidth: 150,
                height: 40,
                borderRadius: 10,
                bgcolor: "#d3f70b",
                color: "#000",
              }}
            >
              Order for ${data?.productPrice}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetailPage;
