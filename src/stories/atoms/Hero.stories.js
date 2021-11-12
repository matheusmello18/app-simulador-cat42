import React from "react";

import Hero from "components/atoms/Hero";
import data from "model/builders/fixtures/home.json";

export default {
  title: "Components/Atoms/Hero",
  component: Hero,
}

export const usege = () => (
  <Hero sectionData={data.sectionsDatas[0]}></Hero>
);
