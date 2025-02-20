type Price = {
  value: number;
  symbol: string;
  isDefault: number;
};

type Guarantee = {
  start: string;
  end: string;
};

export type ProductProps = {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: number;
  orderTitle: string;
  date: string;
};

export type OrderProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  products: ProductProps[];
};

export type User = {
  email: string;
  createdAt: string;
  name: string;
};
