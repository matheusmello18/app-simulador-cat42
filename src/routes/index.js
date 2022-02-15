import React from 'react';
import { useRoutes } from "react-router-dom";

import Home from "routes/home";
import Login from "routes/login";
import Dashboard from "routes/dashboard";
import Error404 from "routes/error404";

/*
  <Route path="/Sobre" element={<About />} />
  <Route path="/Servicos/:slang" element={<ProductDetail />} />
*/
const AppRoutes = () => {
  return useRoutes(
    [
      {path:"/", element: <Home />},
      {path:"/login", element: <Login />},
      {path:"/dashboard", element: <Dashboard />},
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