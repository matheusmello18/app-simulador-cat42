import React, {useEffect, useState} from "react";

import MyDashboardChildren from "components/pages/dashboard/DashboardChildren";

import {useEtapas} from "hooks/useEtapas";
import useAuth from 'hooks/useAuth';

const DashboardChildren = () => {
  const { user } = useAuth();
  var [etapas, setEtapas] = useState([]);

  const BuscaEtapa = async (usuario) => {
    var data = await useEtapas(usuario.ID_EMPRESA, usuario.ID_USUARIO, usuario.DT_PERIODO);
    setEtapas(data);
  }

  useEffect(() => {
    BuscaEtapa(user);
  }, [user]);

  return (
    <MyDashboardChildren dataEtapas={etapas} user={user}></MyDashboardChildren>
  );
};

DashboardChildren.defaultProps = {}

DashboardChildren.propTypes = {}

export default DashboardChildren;