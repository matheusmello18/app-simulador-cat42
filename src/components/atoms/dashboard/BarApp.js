import * as React from 'react';

import {AppBar, Box, Toolbar, Typography, IconButton, MenuItem, Menu} from '@mui/material'; /*Switch, FormControlLabel, FormGroup, */
import {Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, ListSubheader, Avatar} from '@mui/material';
import {Link as RouterLink, Outlet} from "react-router-dom";

import stringSimilarity from 'string-similarity'

import { menusType } from "model";

import * as icons from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';

import useAuth from "hooks/useAuth";

export default function BarApp({menuData, user}) {

  function criaIcons(word) {
    const iconsNames = Object.keys(icons)

    var matches = stringSimilarity.findBestMatch(word, iconsNames)
    const bestMathch = matches.bestMatch.target
    const Icon = icons[bestMathch]
    return Icon
  }

  const { logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchor = 'left';

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    await logout();
  }

  let Icones;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user.NM_COMPLETO}
            </Typography>
            
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Minha conta
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <Typography variant="h6" gutterBottom component="div" mt={2} align="center">
            Menu Prinicpal
          </Typography>

          <Divider />

          {menuData.menus.map((menu, index) => {
            if (!menu.disabled){
              return (
                <React.Fragment key={index}>
                  <List dense={true}>
                    <ListSubheader component="div" inset>
                      {menu.titulo}
                    </ListSubheader>
                    {menu.submenus.map((obj, index2) => {
                      Icones = criaIcons(obj.icone);
                      if (!obj.disabled){
                        return (
                          <ListItem button key={index2} component={RouterLink} to={obj.to}>
                            <ListItemIcon>
                              <Icones color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={obj.text} />
                          </ListItem>
                        )
                      } else {
                        return (<React.Fragment key={index2}></React.Fragment>)
                      }
                    })}
                  </List>
                  
                  <Divider key={index} />    
                </React.Fragment>
              );
            } else {
              return (<React.Fragment key={index}></React.Fragment>)
            }
          })}
          
        </Box>
      </Drawer>
        
      <Box sx={{backgroundColor:'#e3f2fd', maxHeight: '1200px', height: '800px'}}>
        <Outlet />
      </Box>
    </>
  );
}

BarApp.defaultProps = {
  menuData: {}
}

BarApp.propTypes = {
  menuData: menusType.isRequired
}