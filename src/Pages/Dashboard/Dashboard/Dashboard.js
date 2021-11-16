import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from '../../../Hooks/useAuth';
import Button from '@restart/ui/esm/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AppsIcon from '@mui/icons-material/Apps';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import DashboardHome from '../DashboardHome/DashboardHome';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import { Collapse, ListItemButton } from '@mui/material';
import ManageOrder from '../Order/ManageOrder/ManageOrder';
import ViewOrder from '../Order/ViewOrder/ViewOrder';
import ManageProduct from '../Product/ManageProduct/ManageProduct';
import AddProduct from '../Product/AddProduct/AddProduct';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReorderIcon from '@mui/icons-material/Reorder';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Ratings from '../Rating/Ratings';
import ManageRating from '../Rating/manageRating/ManageRating';
import StarIcon from '@mui/icons-material/Star';

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    };

  const [open, setOpen] = React.useState(false);
  const { user, logOut,admin } = useAuth();
  let { path, url } = useRouteMatch();
  const [loadUser, setloadUser] = React.useState({});

  React.useEffect(() => {
    fetch(`https://artisticglow.herokuapp.com/user/${user.email}`)
      .then(res => res.json())
      .then(data => {
      setloadUser(data[0])
      })
  }, [user.email]);
  
  const handleClick = () => {
    setOpen(!open);
  };

   
    const drawer = (
      
        <div>
            <NavLink to="/"><Button className="w-100 btn-primary pt-3 pb-3 fs-5 border-0">Visit Site</Button></NavLink>
            
            
      {/* <Toolbar /> */}
      
    
            <List>

                <Link to={`${url}`} className="text-decoration-none text-black">
                    <ListItemButton>
                        <ListItemIcon>
                            <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>
          { admin &&  <Link to={`${url}/makeadmin`} className="text-decoration-none text-black">
                    <ListItemButton>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Make Admin" />
                    </ListItemButton>
                </Link>
               }
                
          {
            admin &&  <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ProductionQuantityLimitsIcon />
        </ListItemIcon>
        <ListItemText primary="Product" />
        {open ? <ExpandLess/> : <ExpandMore />}
      </ListItemButton>
        }
          {
            admin && <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
           <Link to={`${url}/manageproduct`} className="text-decoration-none text-black">
                        <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                  
          <BorderAllIcon />
        </ListItemIcon>
            <ListItemText primary="All Product" />
                        </ListItemButton>
                        </Link>
           <Link to={`${url}/addproduct`} className="text-decoration-none text-black">
                        <ListItemButton sx={{ pl: 4 }}>
             <ListItemIcon>
          <ControlPointIcon />
        </ListItemIcon>
            <ListItemText primary="Add Product" />
                        </ListItemButton>
                        </Link>
        </List>
      </Collapse>
      }



          
         {/* <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ReorderIcon />
        </ListItemIcon>
        <ListItemText primary="Order" />
        {open ? <ExpandLess/> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding> */}
              {
              admin && <Link to={`${url}/manageorder`} className="text-decoration-none text-black">
                        <ListItemButton>
             <ListItemIcon>
          <ReorderIcon />
        </ListItemIcon>
            <ListItemText primary="All Order" />
                        </ListItemButton>
                        </Link>  
           }
              {
                !admin &&            <Link to={`${url}/vieworder`} className="text-decoration-none text-black">
                        <ListItemButton>
                <ListItemIcon>
                
       
         <ReorderIcon />
        </ListItemIcon>
            <ListItemText primary="My Order" />
                        </ListItemButton>
                        </Link>
          }
          
          {
            admin &&
            <Link to={`${url}/managerating`} className="text-decoration-none text-black">
              <ListItemButton>
                <ListItemIcon>
                
       
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Rating" />
              </ListItemButton>
            </Link>
          }
          <Link to={`${url}/rating`} className="text-decoration-none text-black">
                        <ListItemButton>
                <ListItemIcon>
                
       
         <StarIcon />
        </ListItemIcon>
            <ListItemText primary="Rating" />
                        </ListItemButton>
                        </Link>
        {/* </List>
      </Collapse> */}
        
       
      </List>
      <div className="my-3 text-start">
                <img src={user.photoURL || `https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png`} className=" mx-3 img-fluid rounded-circle" height="35px" width="35px" alt="thumb" />
                <div className="mx-3">
  <p className="fs-6 m-0 fw-bold">{user?.displayName}</p>
            <p className="fs-6 m-0">{user?.email}</p>
            <p className="fs-6 m-0 text-capitalize">Role: {loadUser.role || "Customer"}</p>
                </div>
          
            <Button className="btn btn-primary w-100 border-0 rounded-0" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /> Log Out</Button>
            </div>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box sx={{ display: 'flex' }}>
          
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="bg-primary mx-0"
      >
        <Toolbar className="d-flex flex-row justify-content-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' } }}
          >
            <MenuIcon />
                  </IconButton>
               
          <Typography variant="h6" noWrap component="div">
           Dashboard
          </Typography>
          <div className="d-flex flex-row align-items-center" >
            
              <img src={user.photoURL || `https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png`} className=" mx-3 img-fluid rounded-circle" height="35px" width="35px" alt="thumb" />
             <Button className="btn btn-primary w-100 border-0 rounded-0" onClick={logOut}><FontAwesomeIcon icon={faPowerOff} /> Log Out</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,background:'#0D6EFD'},
          }}          
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: '#0D6EFD', border:'0' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Switch>
        <Route exact path={path}>
        <DashboardHome></DashboardHome>
        </Route>
        <Route path={`${path}/makeadmin`}>
          <MakeAdmin></MakeAdmin>
        </Route>
        <Route path={`${path}/manageorder`}>
          <ManageOrder></ManageOrder>
        </Route>
        <Route path={`${path}/vieworder`}>
          <ViewOrder></ViewOrder>
        </Route>
        <Route path={`${path}/manageproduct`}>
          <ManageProduct></ManageProduct>
        </Route>
        <Route path={`${path}/addproduct`}>
<AddProduct></AddProduct>
        </Route>
          <Route path={`${path}/rating`}>
          <Ratings/>
        </Route>
          <Route path={`${path}/managerating`}>
         <ManageRating/>
        </Route>
      </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
