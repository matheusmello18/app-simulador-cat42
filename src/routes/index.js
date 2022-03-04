import React from 'react';
import { useRoutes } from "react-router-dom";

import ValidaConvidado from 'utils/route-private/ValidaConvidado';
import ValidaAutenticacao from 'utils/route-private/ValidaAutenticacao';

import Home from "routes/home";
import Login from "routes/login";
import Forget from "routes/forget";
import Recovery from "routes/recovery";
import Dashboard from "routes/dashboard";
import Error404 from "routes/error404";
import Etapa from "routes/etapa";

const AppRoutes = () => {
  return useRoutes(
    [
      {path:"/", element: <Home />},
      {
        path:"/login", 
        element: (
          <ValidaConvidado>
            <Login />
          </ValidaConvidado>
        )
      },
      {
        path:"/dashboard", 
        element: (
          <ValidaAutenticacao>
            <Dashboard />
          </ValidaAutenticacao>
         ),
         children: [
          {
              path: '/dashboard/etapa',
              element: <Etapa />
          }
        ]
      },
      {path:"/forget", element: <Forget />},
      {path:"/recovery/:hash", element: <Recovery />},
      {path:"*", element: <Error404 />},
    ]
  );
  /* <Routes>
    <Route ></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
    <Route path="*" element={<Error404 />}></Route>
  </Routes>*/
};

export default AppRoutes;