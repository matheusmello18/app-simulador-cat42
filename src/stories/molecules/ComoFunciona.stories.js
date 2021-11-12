import React from "react";

import ComoFunciona from "components/molecules/ComoFunciona";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Molecules/ComoFunciona",
  component: ComoFunciona,
}

export const usage = (props) => (
  <ComoFunciona {...props} sectionData={data.sectionsDatas[1]}></ComoFunciona>
);
