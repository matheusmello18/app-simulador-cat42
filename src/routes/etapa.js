//import React from "react";
import React, {useEffect, useState} from "react";

import FormEtapa from "components/pages/dashboard/Etapa";

import {useEtapas} from "hooks/useEtapas";
import useAuth from 'hooks/useAuth';

const Etapa = () => {
  let [etapas, setEtapas] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    const BuscaEtapa = async () => {
      var data = await useEtapas(user.ID_EMPRESA, user.ID_USUARIO, user.DT_PERIODO);
      setEtapas(data);
    }
    
    BuscaEtapa();
  }, [user])

  return (<FormEtapa dataEtapas={etapas} user={user} />)
};

Etapa.defaultProps = {}

Etapa.propTypes = {}

export default Etapa;