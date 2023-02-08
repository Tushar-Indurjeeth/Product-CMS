import { CreateProductType, ProductType } from '../types/ProductType';

export const getProducts = async (): Promise<ProductType[]> =>
  await (await fetch('http://localhost:3000/api/product/')).json();

export const getProduct = async (id: string): Promise<ProductType> =>
  await (await fetch(`http://localhost:3000/api/product/${id}`)).json();

export const createProduct = async (product: CreateProductType): Promise<any> =>
  await fetch('http://localhost:3000/api/product/', {
    body: JSON.stringify(product),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  })
    .then((response) => response.json)
    .catch((err) => console.error(err));

type UpdateProductProps = {
  product: CreateProductType;
  id: string;
};

export const updateProduct = async ({
  product,
  id,
}: UpdateProductProps): Promise<any> =>
  await fetch(`http://localhost:3000/api/product/${id}`, {
    body: JSON.stringify(product),
    headers: { 'content-type': 'application/json' },
    method: 'PUT',
  })
    .then((response) => response.json)
    .catch((err) => console.error(err));
