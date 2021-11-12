import React from "react";

import CadastroCliente from "components/molecules/CadastroCliente";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Molecules/CadastroCliente",
  component: CadastroCliente,
}

export const usage = (props) => (
  <CadastroCliente {...props} sectionData={data.sectionsDatas[3]}></CadastroCliente>
);
