import React from "react";
import Recovery from "components/pages/Recovery";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/pages/Recovery",
  component: Recovery,
};

export const usage = (props) => {
  return (
    <Recovery {...props} homeData={data}></Recovery>
  );
};