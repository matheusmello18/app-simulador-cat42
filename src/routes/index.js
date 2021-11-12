import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "routes/home";
import Error404 from "routes/error404";

/*
  <Route path="/Sobre" element={<About />} />
  <Route path="/Servicos/:slang" element={<ProductDetail />} />
*/
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="*" element={<Error404 />}></Route>
  </Routes>
);

export default AppRoutes;