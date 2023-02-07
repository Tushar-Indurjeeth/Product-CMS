import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { getProducts } from '../../utils/productQueries';
import { ProductType } from '../../types/ProductType';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('posts', getProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Title', width: 400 },
  { field: 'col2', headerName: 'Category', width: 150 },
  { field: 'col3', headerName: 'Description', width: 270 },
  { field: 'col4', headerName: 'Price($)', width: 70 },
];

const Populate = (product: ProductType, rows: any[]) => {
  rows.push({
    id: product._id,
    col1: product.title,
    col2: product.category,
    col3: product.description,
    col4: product.price,
  });
};

export default function Products() {
  const { data } = useQuery('products', getProducts);
  const router = useRouter();

  const rows: GridColDef[] = [];

  const handleClick = (e: GridRowParams) => {
    router.push(`cms/product/${e.id}`);
  };

  data?.map((product) => Populate(product, rows));

  return (
    <div style={{ height: 450, width: '100%', cursor: 'pointer' }}>
      <DataGrid
        onRowClick={handleClick}
        disableSelectionOnClick
        checkboxSelection={true}
        rows={rows}
        columns={columns}
      />
    </div>
  );
}
