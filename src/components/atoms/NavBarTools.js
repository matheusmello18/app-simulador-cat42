import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, AppBar, Toolbar, Container, IconButton, Fab, Zoom, Drawer, Box, Link, MenuItem } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from "react-router-dom";

import { NavBarToolsType } from "model";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#fff",
    color: "#000"
  },
  image: {
    width: "100px", height: "auto"
  },
  toolbar: {
    paddingLeft: "0",
    paddingRight: "0",
    '@media (min-width: 600px)': {
      minHeight: "105px",
    },
  },
  btnScrollTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.btnScrollTop}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const NavBarTools = (props) => {
  const classes = useStyles();
  const { navBarToolsData } = props;

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 990
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    const handleGoSection = async (id) => {
      const sleep = async (ms) => await new Promise(resolve => setTimeout(resolve, ms))

      handleDrawerClose();
      
      await sleep(100);

      const anchor = document.querySelector(id);

      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
    }
    return (
      <>
        <Box flexGrow="1" display="flex" flexWrap="nowrap" id="mobileViewImageTrue">
          {navBarToolsData.images.map((item) => (
            <Box key={item.id}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image} className={classes.image} alt={item.alt} />
              </a>
            </Box>
          ))}
        </Box>
        <Box display="flex" flexWrap="nowrap" id="mobileViewTrue">
          <IconButton
            {...{
              edge: "start",
              color: "inherit",
              "aria-label": "menu",
              "aria-haspopup": "true",
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            {...{
              anchor: "top",
              open: drawerOpen,
              onClose: handleDrawerClose,
            }}
          >
            {navBarToolsData.menus.map((item) => (
              <Box key={item.id}>
                <Link
                  {...{
                    component: RouterLink,
                    to: item.link,
                    color: "inherit",
                    style: { textDecoration: "none" },
                    onClick: () => {handleGoSection(item.link)},
                  }}
                >
                  <MenuItem>{item.menu}</MenuItem>
                </Link>
              </Box>
            ))}
          </Drawer>
        </Box>
      </>
    );
  }

  const displayDesktop = () => {
    const doClick = (id) => {
      const anchor = document.querySelector(id);
      
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    return (
      <>
        <Box flexGrow="1" display="flex" flexWrap="nowrap" id="mobileViewImageFalse">
          {navBarToolsData.images.map((item) => (
            <Box key={item.id}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item.image} className={classes.image} alt={item.alt} />
              </a>
            </Box>
          ))}
        </Box>
  
        <Box display="flex" flexWrap="nowrap" id="mobileViewFalse">
          {navBarToolsData.menus.map((item) => (
            <Box key={item.id}>
              <Button onClick={()=>{ doClick(item.link) }} style={{fontWeight:"600", fontSize:"0.94rem" }}>{item.menu}</Button>
            </Box>
          ))}
        </Box>
      </>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Container fixed>
            <Toolbar id="back-to-top-anchor" className={classes.toolbar}>
              
              {mobileView ? displayMobile() : displayDesktop()}
            
            </Toolbar>
          </Container>
        </AppBar>
      </div>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
};

NavBarTools.defaultProps = {
  navBarToolsData: {},
};

NavBarTools.propTypes = {
  navBarToolsData: NavBarToolsType,
};

export default NavBarTools;
