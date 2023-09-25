import ProductTable from "@/components/data-table/product-table";
import { UseProductList } from "@/stores/product-list/UseProductList";
import { Column } from "@/types/table/columType";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { FunctionComponent, PropsWithChildren } from "react";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";
import Loading from "@/components/common/loading";
interface ProductManagementPageProps {
  children?: React.ReactNode;
  /* Define your other props here */
}
const colum: Column[] = [
  { id: "id", label: "id" },
  {
    id: "productImage",
    label: "รูปสินค้า",
    renderCell: (row) => {
      return (
        <Box
          component="div"
          sx={{
            width: 100,
            height: 100,
            backgroundImage: `url(${row?.productImage ?? ""})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: 5,
            zIndex: 0,
          }}
        ></Box>
      );
    },
  },
  {
    id: "productName",
    label: "ชื่อสินค้า",
    maxWidth: 200,
    renderCell: (row) => {
      return (
        <Box>
          <Typography fontSize={25} noWrap>
            {row?.productName}
          </Typography>
        </Box>
      );
    },
  },
  {
    id: "productDetail",
    label: "ละเอียดสินค้า",
    maxWidth: 400,
    renderCell: (row) => {
      return (
        <Box>
          <Typography fontSize={25} noWrap>
            {row?.productDetail}
          </Typography>
        </Box>
      );
    },
  },
  { id: "productDescription", label: "description", minWidth: 200 },
  {
    id: "productPrice",
    label: "ราคาสินค้า",
    minWidth: 200,
  },
  {
    id: "star",
    label: "star",
    minWidth: 100,
    renderCell: (row) => {
      return (
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ width: "fit-content" }}
        >
          <StarIcon sx={{ color: "#ffc400", width: 20 }} />
          <Typography fontSize={25}>{row?.star}</Typography>
        </Stack>
      );
    },
  },
  {
    id: "reviewer",
    label: "reviewer",
    minWidth: 200,
  },
  {
    id: "action",
    label: "action",
    minWidth: 100,
    align: "center",
    renderCell: () => {
      return (
        <Stack direction={"row"} spacing={1}>
          <IconButton>
            <EditIcon sx={{ color: "#004C97", width: 20, height: 20 }} />
          </IconButton>
          <IconButton>
            <DeleteIcon sx={{ color: "#004C97", width: 20, height: 20 }} />
          </IconButton>
        </Stack>
      );
    },
  },
];

const ProductManagementPage: FunctionComponent<
  PropsWithChildren<ProductManagementPageProps>
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
    <div>
      <h1>จัดการสินค้า</h1>
      <ProductTable columns={colum} rows={productList} />
    </div>
  );
};

export default ProductManagementPage;
