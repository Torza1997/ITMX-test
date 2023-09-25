import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { createContext, useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Grid, TextField, Typography } from "@mui/material";
import {
  createProduct,
  updateProductById,
} from "@/api/product-list-api/productListApi";
import {
  FormProductData,
  ProductType,
  RequestData,
} from "@/types/product-list/productType";
import { toBase64 } from "@/utils/toBase64";
import { useSWRConfig } from "swr";
import { isNull, isUndefined } from "lodash";

export type modalType = {
  open: boolean;
  editData: ProductType | null;
  setOpen: (c: boolean) => void;
};

export const ModalContext = createContext<modalType>({
  open: false, // set a default value
  editData: null,
  setOpen: () => {},
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AddProductModal = () => {
  const { mutate } = useSWRConfig();
  const { open, setOpen, editData } = useContext(ModalContext);

  const handleClose = () => {
    setOpen(false);
  };

  const defaultValues = {
    productDescription: "",
    productDetail: "",
    productImage: "",
    productName: "",
    productPrice: "",
  };

  const { register, handleSubmit, resetField } = useForm<FormProductData>({
    defaultValues,
  });

  useEffect(() => {
    resetField("productDescription", {
      defaultValue: editData?.productDescription ?? "",
    });
    resetField("productDetail", {
      defaultValue: editData?.productDetail ?? "",
    });
    resetField("productName", {
      defaultValue: editData?.productName ?? "",
    });
    resetField("productPrice", {
      defaultValue: editData?.productPrice ?? "",
    });
  }, [editData, resetField]);

  const onSubmit: SubmitHandler<FormProductData> = async (data) => {
    try {
      const getBase64 = isUndefined(data.productImage[0])
        ? editData?.productImage ?? null
        : await toBase64(data.productImage[0]);
      const newDataFormat: RequestData = {
        productDescription: data?.productDescription,
        productDetail: data?.productDetail,
        productImage: getBase64,
        productName: data?.productName,
        productPrice: +data?.productPrice,
        star: 4,
        reviewer: 10,
        calories: 1000,
      };

      const response = isNull(editData)
        ? await createProduct(newDataFormat)
        : updateProductById(editData?.id, newDataFormat);
      if (response) {
        mutate("/get/product-list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {isNull(editData) ? "เพิ่มสินค้า" : "อัพเดทสินค้า"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon sx={{ width: 30, height: 30 }} />
          </IconButton>
          <DialogContent dividers>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  id="productName"
                  {...register("productName")}
                  label="ชื่อสินค้า"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  id="productDetail"
                  {...register("productDetail")}
                  label="ละเอียดสินค้า"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  id="productDescription"
                  {...register("productDescription")}
                  label="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  id="productPrice"
                  {...register("productPrice")}
                  label="ราคาสินค้า"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    input: {
                      fontSize: 20,
                      fontFamily: "DB Heavent",
                      height: 40,
                    },
                  }}
                  type="file"
                  size="small"
                  fullWidth
                  id="productImage"
                  {...register("productImage")}
                />
              </Grid>
              {isNull(editData) ? (
                <></>
              ) : (
                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <Typography my={2}>รูปเก่า</Typography>
                  <Box
                    component="div"
                    sx={{
                      position: "relative",
                      width: 200,
                      height: 150,
                      backgroundImage: `url(${editData?.productImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      borderRadius: 5,
                      zIndex: 1,
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
                    }}
                  ></Box>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#2dfd7d",
                minWidth: 100,
                height: 40,
                borderRadius: 5,
              }}
              autoFocus
              onClick={handleClose}
            >
              {isNull(editData) ? "เพิ่ม" : "อัพเดท"}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
};

export default AddProductModal;
