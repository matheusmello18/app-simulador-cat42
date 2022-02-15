import React from "react";
import { NavBarTools, NavBar, FooterMain, FormLogin } from "components";
import { homeType } from "model";

const Login = ({homeData}) => {
  
  return (
    <>
      <NavBar navBarData={homeData.navBarData}></NavBar>
      <NavBarTools navBarToolsData={homeData.navBarToolsData} />
        <FormLogin></FormLogin>
      <FooterMain footData={homeData.footData}></FooterMain>
    </>
  )
};

Login.defaultProps = {
  homeData: {},
};

Login.propTypes = {
  homeData: homeType.isRequired,
}

export default Login;
