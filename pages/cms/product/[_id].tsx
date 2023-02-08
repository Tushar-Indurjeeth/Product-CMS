import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangeEvent, useState } from 'react';
import { QueryClient, useMutation } from 'react-query';
import {
  createProduct,
  getProduct,
  updateProduct,
} from '../../../utils/productQueries';
import { CreateProductType, ProductType } from '../../../types/ProductType';
import { Wrapper } from '../../../styles/create.styles';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const id = context.params?._id;

  const product = await getProduct(id as string);

  return {
    props: { product },
  };
};

type Props = {
  product: ProductType;
};

export default function Update({ product }: Props) {
  const router = useRouter();

  const MySwal = withReactContent(Swal);

  const initialValues: CreateProductType = {
    category: product.category,
    description: product.description,
    image: product.image,
    price: product.price,
    title: product.title,
  };

  const [values, setValues] = useState<CreateProductType>(initialValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { mutate } = useMutation(updateProduct, {
    onSuccess: () => {
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product Updated!',
      }).then(() => {
        router.push('/cms');
      });
    },

    onError: () => {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update!',
      });
    },
  });

  const UpdateProduct = (e: any) => {
    e.preventDefault();

    if (initialValues === values) {
      MySwal.fire({
        icon: 'error',
        title: 'Values are unchanged',
        text: 'Please change 1 or more values to update the product information',
      });
    } else {
      mutate({ product: values, id: product._id });
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
      onSubmit={UpdateProduct}
    >
      <Wrapper>
        <h1>Update Product</h1>
        <TextField
          required
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={values.title}
          onChange={handleInputChange}
        />

        <TextField
          required
          id="category"
          name="category"
          label="Category"
          value={values.category}
          onChange={handleInputChange}
        />

        <TextField
          required
          id="price"
          name="price"
          label="Price"
          type="number"
          value={values.price}
          onChange={handleInputChange}
        />

        <TextField
          required
          id="description"
          name="description"
          label="Description"
          onChange={handleInputChange}
          value={values.description}
          multiline
          maxRows={4}
        />

        <TextField
          required
          id="image"
          name="image"
          label="Image URL"
          type="string"
          onChange={handleInputChange}
          value={values.image}
        />
        <div>
          <Button type="submit" variant="contained" color="success">
            Update product
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => router.push(`/cms/`)}
          >
            Cancel
          </Button>
        </div>
      </Wrapper>
    </Box>
  );
}
