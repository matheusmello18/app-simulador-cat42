import React from 'react';
import HomePage from "components/pages/Home";

import data from "model/builders/fixtures/home.json";

const Home = () => {
  return (
    <HomePage homeData={data}></HomePage>
  )
}

export default Home;