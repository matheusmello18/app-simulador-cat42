import React from "react";

import FormForget from "components/pages/Forget"
import data from "model/builders/fixtures/home.json";

const Forget = () => {
  return (
    <FormForget homeData={data}></FormForget>
  )
};

export default Forget;