import React from "react";
import { PropTypes } from "prop-types";
import {default as MButton} from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import { deepOrange } from '@material-ui/core/colors';
import { alpha } from '@material-ui/core/styles';

const ButtonWarningText = withStyles((theme) => ({
  root: {
    color: deepOrange[500],
    '&:hover': {
      backgroundColor: (0, alpha)(deepOrange[500], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
}))(MButton);

const ButtonWarninOutlined = withStyles((theme) => ({
  root: {
    color: deepOrange[500],
    border: "1px solid ".concat((0, alpha)(deepOrange[500], 0.5)),
    '&:hover': {
      border: "1px solid ".concat(deepOrange[500]),
      backgroundColor: (0, alpha)(deepOrange[500], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
}))(MButton);

const ButtonWarning = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    '&:hover': {
      backgroundColor: deepOrange[700],
    },
  },
}))(MButton);

const Button = (props) => {
  if (props.color === ButtonColors.warning){
    if (props.variant === ButtonVariants.outlined)
      return <ButtonWarninOutlined {...props} />
    else if (props.variant === ButtonVariants.contained)
      return <ButtonWarning {...props} />
    else
      return <ButtonWarningText {...props} />
  } else {
    return <MButton {...props} />
  }
};

export const ButtonColors = {
  default: "default",
  primary: "primary",
  secondary: "secondary",
  warning: "warning",
};

export const ButtonVariants = {
  text: "text",
  outlined: "outlined",
  contained: "contained"
};

export const ButtonSize = {
  small: "small",
  medium: "medium",
  large: "large"
};

Button.defaultProps = {
  color: "default",
  size: "small",
  variant: "text"
};

Button.propTypes = {
  color: PropTypes.oneOf(Object.values(ButtonColors)),
  size: PropTypes.oneOf(Object.values(ButtonSize)),
  variant: PropTypes.oneOf(Object.values(ButtonVariants))
};

export default Button;
