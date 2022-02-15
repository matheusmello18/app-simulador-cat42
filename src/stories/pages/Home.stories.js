import React from "react";

import Home from "components/pages/Home";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/pages/Home",
  component: Home,
}

export const usage = (props) => (
  <Home {...props} homeData={data}></Home>
);
