import React from "react";
import {withStyles} from "@material-ui/core/styles";
import { purple } from '@material-ui/core/colors';

import Button from "components/atoms/Button";

export default {
  title: "Components/Atoms/Button",
  component: Button,
}

export const usage = (props) => (
  <Button {...props} >Texto</Button>
);

export const buttonText = (props) => (
  <div>
    <p>Botões de Texto</p>
    <Button {...props}>Default</Button>
    <Button {...props} color="primary">Primary</Button>
    <Button {...props} color="secondary">Secondary</Button>
    <Button {...props} color="warning" >Secondary</Button>
    <Button {...props} disabled>Disabled</Button>
  </div>
);

export const buttonContidos = (props) => (
  <div>
    <p>Botões Contidos</p>
    <Button {...props} variant="contained">Default</Button>
    <Button {...props} variant="contained" color="primary">Primary</Button>
    <Button {...props} variant="contained" color="secondary">Secondary</Button>
    <Button {...props} variant="contained" color="warning" >Secondary</Button>
    <Button {...props} variant="contained" disabled>Disabled</Button>
  </div>
);

export const buttonDelineados = (props) => (
  <div>
    <p>Botões Delineados</p>
    <Button {...props} variant="outlined">Default</Button>
    <Button {...props} variant="outlined" color="primary">Primary</Button>
    <Button {...props} variant="outlined" color="secondary">Secondary</Button>
    <Button {...props} variant="outlined" color="warning">Secondary</Button>
    <Button {...props} variant="outlined" disabled>Disabled</Button>
    
  </div>
);

export const buttonSize = (props) => (
  <div>
    <p>Tamanhos</p>
    <Button {...props} variant="contained" size="small" color="primary">Default</Button>
    <Button {...props} variant="contained" size="medium" color="primary">Default</Button>
    <Button {...props} variant="contained" size="large" color="primary">Default</Button>
  </div>
);


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

export const buttonCustumize = (props) => (
  <div>
    <p>Botões Customizado</p>
    <ColorButton {...props} variant="outlined" color="primary">Default</ColorButton>
  </div>
);
