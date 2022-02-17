import React from "react";
import PropTypes from "prop-types";

import { NavBarTools, NavBar, FooterMain, FormForget } from "components";
import { homeType } from "model";

const Forget = ({homeData}) => {
  return (
    <>
      <NavBar navBarData={homeData.navBarData}></NavBar>
      <NavBarTools navBarToolsData={homeData.navBarToolsData} />
        <FormForget></FormForget>
      <FooterMain footData={homeData.footData}></FooterMain>
    </>
  )
};

Forget.defaultProps = {
  homeData: {},
}

Forget.propTypes = {
  homeData: homeType.isRequired,
}

export default Forget;