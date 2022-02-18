import React from "react";

import FormRecovery from "components/pages/Recovery"
import data from "model/builders/fixtures/home.json";

const Recovery = () => { 
  return (
    <FormRecovery homeData={data}></FormRecovery>
  );
};

export default Recovery;