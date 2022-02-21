import React from "react";
import Dashboard from "components/pages/Dashboard";
import data from "model/builders/fixtures/dashboard-menu.json";
import userData from "model/builders/fixtures/user.json";

export default {
  title: "Components/pages/Dashboard",
  component: Dashboard,
};

export const usage = (props) => {
  return (
    <Dashboard {...props} menuData={data} user={userData.user}></Dashboard>
  );
};