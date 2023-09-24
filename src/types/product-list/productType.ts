export type ProductType = {
  id: number;
  productName: string;
  productImage: string;
  productPrice: number;
};

export type ProductResponse = {
  data: ProductType[];
};
