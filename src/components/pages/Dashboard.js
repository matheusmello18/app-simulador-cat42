import React from "react";
import {BarApp} from "components";
import { menusType, userType } from "model";

const Dashboard = ({menuData, user}) => {
  
  return (
    <>
      {user !== null &&
        <BarApp menuData={menuData} user={user}></BarApp>}
    </>
  );
};

Dashboard.defaultProps = {
  menuData: {},
  user: {}
}

Dashboard.propTypes = {
  menuData: menusType.isRequired,
  user: userType.isRequired,
}

export default Dashboard; 