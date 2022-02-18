import React from "react";

import { NavBarTools, NavBar, FooterMain, FormRecovery } from "components";
import { homeType } from "model";

const Recovery = ({homeData}) => {
  return (
    <>
      <NavBar navBarData={homeData.navBarData}></NavBar>
      <NavBarTools navBarToolsData={homeData.navBarToolsData} />
        <FormRecovery></FormRecovery>
      <FooterMain footData={homeData.footData}></FooterMain>
    </>
  );
};

Recovery.defaultProps = {
  homeData: {},
}

Recovery.propTypes = {
  homeData: homeType.isRequired,
}

export default Recovery;