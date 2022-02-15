import React from 'react';
import LoginPage from "components/pages/Login";

import data from "model/builders/fixtures/home.json";

const Login = () => {
  return (
    <LoginPage homeData={data}></LoginPage>
  )
}

export default Login;