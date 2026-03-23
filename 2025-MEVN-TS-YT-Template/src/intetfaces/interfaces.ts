export type Product = {

  _id: string,
  name: string,
  description: string,
  imageURL: string,
  price: number,
  stock: number,
  discount: boolean,
  discountPct: number,
  isHidden: boolean,
  _createdBy: string
}
export type NewProduct = Omit<Product, '_id'> & {
  _createdBy?: string
}
// export type NewProduct = Omit<Product, '_id'> & Partial<Pick<Product, '_createdBy'>>; // Omit _id and make _createdBy optional

// export type newProduct = {
//   name: string,
//   description: string,
//   imageURL: string,
//   price: number,
//   stock: number,
//   discount: boolean,
//   discountPct: number,
//   isHidden: boolean,
//   _createdBy: string
// }

export type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  registerDate: string
}

export type CartItem = {
  _id: string,
  name: string,
  price: number,
  quantity: number,
  imageURL: string
}