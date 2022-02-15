import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

const ValidaAutenticacao = ({children}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn){
      navigate("/login", {replace: true});
    }
  }, [isLoggedIn, navigate]);

  return children;
};

ValidaAutenticacao.propTypes = {
  children: PropTypes.node
}

export default ValidaAutenticacao;