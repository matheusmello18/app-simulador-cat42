import React from "react";

import SobreNos from "components/molecules/SobreNos";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Molecules/SobreNos",
  component: SobreNos,
}

export const usage = (props) => (
  <SobreNos {...props} sectionData={data.sectionsDatas[2]}></SobreNos>
);
