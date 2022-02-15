import React from "react";

import Login from "components/pages/Login";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/pages/Login",
  component: Login,
}

export const usage = (props) => (
  <Login {...props} homeData={data}></Login>
);
