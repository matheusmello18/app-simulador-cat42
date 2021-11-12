import React from "react";
import { Paper, Grid } from "@material-ui/core";

import Section from "components/atoms/Section";

export default {
  title: "Components/Atoms/Section",
  component: Section,
}

export const usage = (props) => (
  <Section {...props} id="#home" texto="Como funciona nosso serviço">
  </Section>
);

export const withChildren = (props) => {
  return (
    <Section {...props} id="#home" texto="Como funciona nosso serviço">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
            <Paper style={{
            padding: "16px",
            textAlign: 'center',
            color: "#000"
          }}>Children - 1</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{
            padding: "16px",
            textAlign: 'center',
            color: "#000"
          }}>Children - 2</Paper>
        </Grid>
      </Grid>
    </Section>
  );
};
