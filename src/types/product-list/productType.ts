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
