import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { createProduct } from '../../../utils/productQueries';
import { CreateProductType } from '../../../types/ProductType';
import { Wrapper } from '../../../styles/create.styles';
import { useRouter } from 'next/router';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function Create() {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const initialValues: CreateProductType = {
    category: '',
    description: '',
    image: '',
    price: 0,
    title: '',
  };

  const [values, setValues] = useState<CreateProductType>(initialValues);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const { mutate } = useMutation(createProduct, {
    onSuccess: () => {
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product Created!',
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

  const CreateProduct = (e: any) => {
    e.preventDefault();
    mutate(values);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
      onSubmit={CreateProduct}
    >
      <Wrapper>
        <h1>Create Product</h1>
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
          <Button type="submit" variant="contained">
            Create product
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
