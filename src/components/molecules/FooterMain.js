import React from "react";
import { makeStyles } from '@mui/styles';
import { Grid, Container, IconButton } from '@material-ui/core';
import {FaPhone, FaBuilding, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { footType } from "model";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:"#2b74a9",
    color:"#FFFEFE",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const FooterMain = (props) => {
  const classes = useStyles();
  const { footData } = props

  return (
    <div className={classes.root} style={{padding:"36px"}}>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <h4>Quem Somos</h4>
            <p dangerouslySetInnerHTML= {{__html: footData.quemSomos}}></p>
            <h4>Rede sociais</h4>
            <p>
              <IconButton target="_blank" href={footData.facebook} style={{margin:"8px", color:"#fff"}}>
                <FaFacebookF />
              </IconButton>
              |
              <IconButton target="_blank" href={footData.linkedin} style={{margin:"8px", color:"#fff"}}>
                <FaLinkedinIn />
              </IconButton>
              |
              <IconButton target="_blank" href={footData.instagram} style={{margin:"8px", color:"#fff"}}>
                <FaInstagram />
              </IconButton>
            </p>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <h4>Central de Operações</h4>
            <p>
              <span style={{margin:"8px"}}>
                <FaBuilding />
              </span>
              {footData.centralOperacao.endereco}
            </p>
            <p>
              <span style={{margin:"8px"}}>
                <FaPhone />
              </span>
              {footData.centralOperacao.telefones}
            </p>
            <h4>Central Comercial</h4>
            <p>
              <span style={{margin:"8px"}}>
                <FaBuilding />
              </span>
              {footData.centralComercial.endereco}
            </p>
            <p>
              <span style={{margin:"8px"}}>
                <FaPhone />
              </span>
              {footData.centralComercial.telefones}
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>  
  );
};

FooterMain.defaultProps = {
  footData: {}
};

FooterMain.propTypes = {
  footData: footType,
};

export default FooterMain;
