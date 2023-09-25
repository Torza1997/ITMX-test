import ProductTable from "@/components/data-table/product-table";
import { UseProductList } from "@/stores/product-list/UseProductList";
import { Column } from "@/types/table/columType";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR from "swr";
import Loading from "@/components/common/loading";
import AddProductModal from "@/components/common/add-product-modal";
import { ModalContext } from "@/components/common/add-product-modal/add-product-modal";
import { ProductType } from "@/types/product-list/productType";
import { deleteProductById } from "@/api/product-list-api/productListApi";
import { isUndefined } from "lodash";
interface ProductManagementPageProps {
  children?: React.ReactNode;
  /* Define your other props here */
}

const ProductManagementPage: FunctionComponent<
  PropsWithChildren<ProductManagementPageProps>
> = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<ProductType | null>(null);
  const { fetchProductList, productList } = UseProductList();
  const { isLoading, mutate } = useSWR(
    "/get/product-list",
    () => fetchProductList(),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
    }
  );

  const deleteProduct = async (id: number | undefined) => {
    if (isUndefined(id)) return;
    const response = await deleteProductById(id);
    if (response) {
      mutate();
    }
  };

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
    },
    {
      id: "action",
      label: "action",
      align: "center",
      renderCell: (row) => {
        return (
          <Stack direction={"row"} spacing={1}>
            <IconButton
              onClick={() => {
                setEditData(row);
                setOpen(true);
              }}
            >
              <EditIcon sx={{ color: "#004C97", width: 20, height: 20 }} />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteProduct(row?.id);
              }}
            >
              <DeleteIcon sx={{ color: "#004C97", width: 20, height: 20 }} />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <Stack alignItems={"flex-end"}>
      <ModalContext.Provider value={{ open, setOpen, editData }}>
        <AddProductModal />
        <IconButton
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          sx={{ width: 30, height: 30, bgcolor: "#004C97", marginBottom: 1 }}
        >
          <AddIcon sx={{ color: "#fff", width: 30, height: 30 }} />
        </IconButton>
        <ProductTable columns={colum} rows={productList} />
      </ModalContext.Provider>
    </Stack>
  );
};

export default ProductManagementPage;
