import React from "react";
import BarApp from "components/atoms/dashboard/BarApp";

import data from "model/builders/fixtures/dashboard-menu.json";
import userData from "model/builders/fixtures/user.json";

export default {
  title: "Components/atoms/dashboard/BarApp",
  component: BarApp,
};

export const usage = (props) => {
  return (
    <BarApp {...props} menuData={data} user={userData.user}></BarApp>
  );
};