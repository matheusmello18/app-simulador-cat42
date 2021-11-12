import React from "react";

import FooterMain from "components/molecules/FooterMain";

import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Molecules/FooterMain",
  component: FooterMain,
}

export const usage = (props) => (
  <FooterMain {...props} footData={data.footData}></FooterMain>
);
