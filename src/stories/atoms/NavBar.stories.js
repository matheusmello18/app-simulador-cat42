import React from "react";

import NavBar from "components/atoms/NavBar";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Atoms/NavBar",
  component: NavBar,
}

export const usege = (props) => (
  <NavBar navBarData={data.navBarData} {...props}></NavBar>
);
