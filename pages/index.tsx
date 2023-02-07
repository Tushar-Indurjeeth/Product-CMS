import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

import { getProducts } from '../utils/productQueries';
import { ProductType } from '../types/ProductType';
import { StyledButton, Wrapper } from '../styles/index.styles';

import { Drawer } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';

import { Cart } from '../components/Cart/Cart';
import { Item } from '../components/Item/Item';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('posts', getProducts);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as ProductType[]);

  const { data } = useQuery('products', getProducts);

  const getTotalItems = (items: ProductType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: ProductType) => {
    setCartItems((prev) => {
      //Previous state
      //If item already in cart
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // Clicked for the 1st time
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as ProductType[])
    );
  };

  return (
    <div className="container">
      <Head>
        <title>Online Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color="error">
            <AddShoppingCartIcon fontSize="large" />
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item._id.toString()} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
}
