export type Product = {

  _id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  stock: number;
  discount: boolean;
  discountPct: number;
  isHidden: boolean;
}

export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  registerDate: string
}