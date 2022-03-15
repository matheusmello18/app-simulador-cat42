//import React from "react";
import React, {useEffect, useState} from "react";
//import { Typography } from '@mui/material';

import FormEtapa from "components/pages/dashboard/Etapa";

import {useEtapas} from "hooks/useEtapas";
import useAuth from 'hooks/useAuth';

const Etapa = () => {
  const { user } = useAuth();
  var [etapas, setEtapas] = useState([]);
  
  const BuscaEtapa = async (usuario) => {
    var data = await useEtapas(usuario.ID_EMPRESA, usuario.ID_USUARIO, usuario.DT_PERIODO);
    setEtapas(data);
  }

  useEffect(() => {
    BuscaEtapa(user);
  }, [user]);

  return (<FormEtapa dataEtapas={etapas} user={user} setEtapas={setEtapas} />);
};

Etapa.defaultProps = {}

Etapa.propTypes = {}

export default Etapa;