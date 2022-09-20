export type ProductDataType = {
  id: string;
  product: string;
  image: string;
  images: string[];
  brand: string[];
  type: string;
  bestseller: boolean;
  isNew: boolean;
  price: number;
  rating: number;
  availability: boolean;
};

export type KeyboardsDataType = {
  id: string;
  product: string;
  image: string;
  images: string[];
  brand: string[];
  type: string;
  bestseller: boolean;
  isNew: boolean;
  price: number;
  rating: number;
  availability: boolean;
}[];

export type CartType = {
  cart: {
    numberOfItems: number;
    cartItems: {
      id: string;
      name: string;
      image: string;
      price: number;
      quantity: number;
    }[];
  };
};

export type CatalogDataType = {
  catalog: { catalogData: KeyboardsDataType; selectedCategory: string };
};
