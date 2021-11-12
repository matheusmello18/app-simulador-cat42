import React from "react";

import NavBarTools from "components/atoms/NavBarTools";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Atoms/NavBarTools",
  component: NavBarTools,
}

export const usage = (props) => (
  <NavBarTools navBarToolsData={data.navBarToolsData}></NavBarTools>
);
