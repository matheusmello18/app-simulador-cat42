import React from "react";
import Forget from "components/pages/Forget";

import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/pages/Forget",
  component: Forget,
};

export const usage = (props) => {
  return (
    <Forget {...props} homeData={data}></Forget>
  );
};