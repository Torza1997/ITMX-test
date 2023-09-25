import { isMockUp } from "@/constants/api/config";
import { endpoint } from "@/constants/api/endpoint";
import { httpClient } from "@/libs/http/axios";
import { ProductResponse, RequestData } from "@/types/product-list/productType";

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

export const updateProductById = async (
  id: number | null,
  playLoad: RequestData
): Promise<ProductResponse> => {
  try {
    if (isMockUp) {
      return httpClient.put(`${endpoint.PUT_PRODUCT_MOCK_UP}/${id}`, playLoad);
    }
    return httpClient.put(`${endpoint.PUT_PRODUCT}/${id}`, playLoad);
  } catch (err) {
    console.error("Error: Cannot update product by id");
    throw err;
  }
};

export const deleteProductById = async (
  id: number | null
): Promise<ProductResponse> => {
  try {
    if (isMockUp) {
      return httpClient.delete(`${endpoint.DELETE_PRODUCT}/${id}`);
    }
    return httpClient.delete(`${endpoint.DELETE_PRODUCT_MOCK_UP}/${id}`);
  } catch (err) {
    console.error("Error: Cannot delete product by id");
    throw err;
  }
};

export const createProduct = async (
  playLoad: RequestData
): Promise<unknown> => {
  try {
    if (isMockUp) {
      return httpClient.post(endpoint.POST_PRODUCT_MOCK_UP, playLoad);
    }
    return httpClient.post(endpoint.POST_PRODUCT, playLoad);
  } catch (err) {
    console.error("Error: Cannot get product list");
    throw err;
  }
};
