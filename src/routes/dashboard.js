import React from "react";

import MyDashboard from "components/pages/Dashboard";
import data from "model/builders/fixtures/dashboard-menu.json";

import useAuth from 'hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <MyDashboard menuData={data} user={user} ></MyDashboard>
  );
};

Dashboard.defaultProps = {}

Dashboard.propTypes = {}

export default Dashboard;