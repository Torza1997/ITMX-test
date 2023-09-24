import { isMockUp } from "@/constants/api/config";
import { endpoint } from "@/constants/api/endpoint";
import { httpClient } from "@/libs/http/axios";
import { ProductResponse } from "@/types/product-list/productType";

export const getProductList = async (): Promise<ProductResponse> => {
  try {
    if (isMockUp) {
      return httpClient.get(endpoint.GET_PRODUCT_MOCK_UP);
    }
    return httpClient.get(endpoint.GET_PRODUCT);
  } catch (err) {
    console.error("Error: Cannot get product list");
    throw err;
  }
};
