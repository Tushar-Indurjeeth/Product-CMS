import { useState } from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSelectionModel,
} from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MenuIcon from '@mui/icons-material/Menu';

import { useRouter } from 'next/router';
import { deleteProducts } from '../../utils/productQueries';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import { QueryClient, dehydrate, useQuery, useMutation } from 'react-query';
import { GetServerSideProps } from 'next';
import { getProducts } from '../../utils/productQueries';
import { ProductType } from '../../types/ProductType';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('products', getProducts);

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

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://tusharin.com/">
        Tushar Indurjeeth CMS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const cms = () => {
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const { data } = useQuery('products', getProducts);

  const [open, setOpen] = useState<boolean>(true);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { mutate } = useMutation(deleteProducts, {
    onSuccess: () => {
      MySwal.fire('Deleted!', 'Successfully deleted', 'success').then(() => {
        router.push('/cms');
      });
    },

    onError: () => {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete!',
      });
    },
  });

  const DeleteProducts = (e: any) => {
    e.preventDefault();

    if (selectionModel.length < 1) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No products selected!',
      });
    } else {
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          mutate({ ids: selectionModel as string[] });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire('Cancelled', 'NOT deleted!', 'error');
        }
      });
    }
  };

  const rows: GridColDef[] = [];

  data?.map((product: ProductType) => Populate(product, rows));

  const handleClick = (e: GridRowParams) => {
    router.push(`cms/product/${e.id}`);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Product Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="All Products" />
              </ListItemButton>

              <ListItemButton
                onClick={() => router.push(`/cms/product/create/`)}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create New Product" />
              </ListItemButton>

              <ListItemButton onClick={DeleteProducts}>
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText primary="Delete Selected" />
              </ListItemButton>
            </>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Current Products */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{ height: 450, width: '100%', cursor: 'pointer' }}
                  >
                    <DataGrid
                      onRowClick={handleClick}
                      onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                      }}
                      selectionModel={selectionModel}
                      disableSelectionOnClick
                      checkboxSelection
                      rows={rows}
                      columns={columns}
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default cms;
