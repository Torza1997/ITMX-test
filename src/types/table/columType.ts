import { ReactNode } from "react";
import { ProductType } from "../product-list/productType";

export interface Column {
  id:
    | "id"
    | "productImage"
    | "productName"
    | "productDescription"
    | "productDetail"
    | "productPrice"
    | "star"
    | "reviewer"
    | "action";
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "center" | "left";
  renderRow?: void;
  renderCell?: (row: ProductType) => ReactNode;
  format?: (value: number) => string;
}
