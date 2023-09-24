import { getProductList } from "@/api/product-list-api/productListApi";
import { ProductResponse, ProductType } from "@/types/product-list/productType";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ProductState = {
  productList: ProductType[];
  setProductState: (items: ProductType[]) => void;
  fetchProductList: () => void | Promise<ProductResponse | void>;
};

export const UseProductList = create<ProductState>()(
  devtools(
    persist(
      (set, get) => ({
        productList: [],
        setProductState: (items: ProductType[]) => {
          set({ productList: items });
        },
        fetchProductList: async () => {
          try {
            const resp = await getProductList();
            const state = get();
            state.setProductState(resp?.data ?? []);
          } catch (error) {
            console.log("Error: Couldn't handle fetch product-list list");
            throw error;
          }
        },
      }),
      {
        name: "product-list-storage",
      }
    )
  )
);
