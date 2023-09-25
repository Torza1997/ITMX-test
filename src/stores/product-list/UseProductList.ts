import { getProductList } from "@/api/product-list-api/productListApi";
import { ProductResponse, ProductType } from "@/types/product-list/productType";
import { filter, isUndefined } from "lodash";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type ProductState = {
  productList: ProductType[];
  setProductState: (items: ProductType[]) => void;
  fetchProductList: () => void | Promise<ProductResponse | void>;
  getProductById: (id: number | undefined) => void | ProductType[];
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
        getProductById: (id: number | undefined) => {
          const state = get();
          if (isUndefined(id)) return [];
          const getById = filter(state.productList, ["id", id]);
          return getById;
        },
      }),
      {
        name: "product-list-storage",
      }
    )
  )
);
