import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

const ValidaConvidado = ({children}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn){
      navigate("/dashboard", {replace: true});
    }
  }, [isLoggedIn, navigate]);

  return children;
};

ValidaConvidado.propTypes = {
  children: PropTypes.node
};

export default ValidaConvidado;