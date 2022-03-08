import React from "react";

import MenuEtapa from "components/atoms/dashboard/Etapa"
import { allEtapaType, userType } from "model";

const Etapa = ({dataEtapas, user}) => {
  return (<MenuEtapa dataEtapas={dataEtapas} user={user} />)
};

Etapa.defaultProps = {
  dataEtapas: {},
  user: {}
}

Etapa.propTypes = {
  dataEtapas: allEtapaType.isRequired,
  user: userType.isRequired
}

export default Etapa;