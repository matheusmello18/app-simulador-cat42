import React from "react";

import MenuEtapa from "components/atoms/dashboard/Etapa"
import { allEtapaType } from "model";

const Etapa = ({dataEtapas}) => {
  return (<MenuEtapa dataEtapas={dataEtapas} />)
};

Etapa.defaultProps = {
  dataEtapas: {}
}

Etapa.propTypes = {
  dataEtapas: allEtapaType.isRequired
}

export default Etapa;