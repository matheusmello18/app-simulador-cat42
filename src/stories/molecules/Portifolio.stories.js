import React from "react";

import Portifolio from "components/molecules/Portifolio";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Molecules/Portifolio",
  component: Portifolio,
}

export const usage = (props) => (
  <Portifolio {...props} sectionData={data.sectionsDatas[4]}></Portifolio>
);
