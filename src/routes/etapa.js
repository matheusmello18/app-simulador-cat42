//import React from "react";
import React, {useEffect, useState} from "react";

import FormEtapa from "components/pages/dashboard/Etapa";
import {useEtapas} from "hooks/useEtapas";


const Etapa = () => {
  let [etapas, setEtapas] = useState([]);

  
  useEffect(() => {
    const BuscaEtapa = async () => {
      var data = await useEtapas("7", "01/01/2021");
      setEtapas(data);
    }
    
    BuscaEtapa();
  }, [])

  

  return (<FormEtapa dataEtapas={etapas} />)
};

Etapa.defaultProps = {}

Etapa.propTypes = {}

export default Etapa;