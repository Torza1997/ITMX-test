export type ProductType = {
  id: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productDescription: string;
  productDetail: string;
  star: number;
  reviewer: number;
  calories: number;
};

export type ProductResponse = {
  data: ProductType[];
};

export type FormProductData = {
  productName: string;
  productDetail: string;
  productDescription: string;
  productPrice: string | number;
  productImage: any;
};
export type RequestData = {
  productName: string;
  productDetail: string;
  productDescription: string;
  productPrice: string | number;
  productImage: any;
  star: number;
  reviewer: number;
  calories: number;
};
