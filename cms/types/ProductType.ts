import { ObjectId } from 'mongodb';

export type ProductType = {
  _id: ObjectId;
  id?: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type CreateProductType = {
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
};
