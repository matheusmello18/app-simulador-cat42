import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import { Container, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaPhone, FaMailBulk } from 'react-icons/fa';
import { NavBarType } from "model";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  head: {
    backgroundColor: "#2b74a9",
    height: "38px",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
  toolbar: {
    paddingLeft: "0",
    paddingRight: "0",
    height: "38px",
    '@media (min-width: 0px)': {
      minHeight: "38px",
    },

    '@media (min-width: 600px)': {
      minHeight: "38px",
    }
  },
  title: {
    flexGrow: 1,
    paddingLeft: "0",
  },
  marginIcone: {
    margin: theme.spacing(1),
    "&:last-child": {
      marginRight:"0",
    }
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const { navBarData } = props;

  const [show, showState] = useState({
    mobileView: false,
  });

  const { mobileView } = show;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 990
        ? showState((prevState) => ({ ...prevState, mobileView: true }))
        : showState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.head}>
          <Container fixed>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <span>
                {navBarData.email ? 
                  <> 
                    <FaMailBulk className={classes.marginRight} /> 
                    {navBarData.email}
                  </> : null}
                </span>

                <span>
                  {navBarData.telefone ? 
                  <> 
                    <FaPhone className={`${classes.marginLeft} ${classes.marginRight}`} /> 
                    {navBarData.telefone}
                  </> : null}
                </span>
              </div>

              <div>
                <IconButton target="_blank" href={navBarData.facebook} aria-label="delete" className={classes.marginIcone}>
                  <FaFacebookF color="#fff" fontSize="small" />
                </IconButton>
                <IconButton target="_blank" href={navBarData.linkedin} aria-label="delete" className={classes.marginIcone}>
                  <FaLinkedinIn color="#fff" fontSize="small" />
                </IconButton>
                <IconButton target="_blank" href={navBarData.instagram} aria-label="delete" className={classes.marginIcone}>
                  <FaInstagram color="#fff" fontSize="small" />
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
  };


  return (
    <>
      {mobileView ? null : displayDesktop()}
    </>
  );
}

NavBar.defaultProps = {
  navBarData: {},
};

NavBar.propTypes = {
  navBarData: NavBarType,
}

export default NavBar;
