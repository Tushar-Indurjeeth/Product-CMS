import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Create New Product" />
    </ListItemButton>
  </>
);
