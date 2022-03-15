import React from "react";
import PropTypes from "prop-types";

import MenuEtapa from "components/atoms/dashboard/Etapa"
import { allEtapaType, userType } from "model";

const Etapa = ({dataEtapas, user, setEtapas}) => {
  return (<MenuEtapa dataEtapas={dataEtapas} user={user} setEtapas={setEtapas} />)
};

Etapa.defaultProps = {
  dataEtapas: {},
  user: {},
  setEtapas: null
}

Etapa.propTypes = {
  dataEtapas: allEtapaType.isRequired,
  user: userType.isRequired,
  setEtapas: PropTypes.func
}

export default Etapa;